"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	IconSend,
	IconPlayerStopFilled,
	IconSparkles,
	IconX,
	IconMessageCirclePlus,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./ui/tooltip-wrapper";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import {
	CHAT_MAX_MESSAGES,
	CHAT_MAX_PROMPT_LENGTH,
	type ChatMessage,
} from "@/lib/chat";

interface Message extends ChatMessage {
	timestamp: number;
}

// Markdown rendering is only needed once the panel shows a reply
const ChatMarkdown = dynamic(() => import("./chat-markdown"));

const STORAGE_KEY = "otacon-chat-history";

const isStoredMessage = (value: unknown): value is Message =>
	typeof value === "object" &&
	value !== null &&
	((value as Message).role === "user" ||
		(value as Message).role === "assistant") &&
	typeof (value as Message).content === "string" &&
	// Empty assistant placeholders are never valid history
	(value as Message).content.length > 0;

// Abort reasons: a user "Stop" keeps or restores the exchange, a discard (new chat, unmount) does not
const ABORT_STOP = "stop";
const ABORT_DISCARD = "discard";

function useChatHistory() {
	const [messages, setMessages] = useState<Message[]>([]);
	const hydratedRef = useRef(false);

	// Read localStorage after mount so the server and first client render match
	useEffect(() => {
		try {
			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
			if (Array.isArray(stored)) {
				// eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
				setMessages(stored.filter(isStoredMessage).slice(-CHAT_MAX_MESSAGES));
			}
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
		hydratedRef.current = true;
	}, []);

	useEffect(() => {
		// Skip the initial empty render so it does not wipe stored history before hydration
		if (!hydratedRef.current) return;
		const persisted = messages.filter((message) => message.content);
		if (persisted.length > 0) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, [messages]);

	const addMessage = (message: Message) => {
		setMessages((prev) => [...prev, message].slice(-CHAT_MAX_MESSAGES));
	};

	const updateLastMessage = (content: string) => {
		setMessages((prev) => {
			const last = prev[prev.length - 1];
			if (!last || last.role !== "assistant") return prev;
			return [...prev.slice(0, -1), { ...last, content }];
		});
	};

	const removeEmptyAssistantMessage = () => {
		setMessages((prev) => {
			const last = prev[prev.length - 1];
			return last?.role === "assistant" && !last.content
				? prev.slice(0, -1)
				: prev;
		});
	};

	// Drops the unanswered prompt and its placeholder so a retry does not duplicate it
	const rollbackLastExchange = () => {
		setMessages((prev) => {
			const last = prev[prev.length - 1];
			const previous = prev[prev.length - 2];
			return last?.role === "assistant" && previous?.role === "user"
				? prev.slice(0, -2)
				: prev;
		});
	};

	const clearMessages = () => {
		setMessages([]);
		localStorage.removeItem(STORAGE_KEY);
	};

	return {
		messages,
		addMessage,
		updateLastMessage,
		removeEmptyAssistantMessage,
		rollbackLastExchange,
		clearMessages,
	};
}

export const AIAssistant = () => {
	const t = useTranslations("assistant");
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);
	const {
		messages,
		addMessage,
		updateLastMessage,
		removeEmptyAssistantMessage,
		rollbackLastExchange,
		clearMessages,
	} = useChatHistory();
	const scrollViewportRef = useRef<HTMLDivElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const viewport = scrollViewportRef.current;
		if (viewport) viewport.scrollTop = viewport.scrollHeight;
	}, [messages, isStreaming]);

	useEffect(() => () => abortControllerRef.current?.abort(ABORT_DISCARD), []);

	// A send adds two messages (prompt + reply), so the limit is reached once another pair no longer fits
	const isAtMessageLimit = messages.length + 2 > CHAT_MAX_MESSAGES;

	const closePanel = () => {
		setIsOpen(false);
		// Return focus to the toggle so keyboard users are not dropped at the top of the page
		requestAnimationFrame(() => toggleButtonRef.current?.focus());
	};

	const handleSendMessage = async () => {
		const userPrompt = inputValue.trim();
		if (!userPrompt || isStreaming) return;

		if (userPrompt.length > CHAT_MAX_PROMPT_LENGTH) {
			toast.error(t("tooLong", { max: CHAT_MAX_PROMPT_LENGTH }));
			return;
		}

		if (isAtMessageLimit) {
			toast.error(t("limitReachedToast"));
			return;
		}

		// History sent to the API excludes the new prompt and client-only fields
		const history: ChatMessage[] = messages.map(({ role, content }) => ({
			role,
			content,
		}));

		addMessage({ role: "user", content: userPrompt, timestamp: Date.now() });
		addMessage({ role: "assistant", content: "", timestamp: Date.now() });
		setInputValue("");
		setIsStreaming(true);

		let accumulated = "";
		const controller = new AbortController();
		abortControllerRef.current = controller;

		try {
			const response = await fetch("/api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: userPrompt, messages: history }),
				signal: controller.signal,
			});

			if (!response.ok || !response.body) {
				throw new Error(`Chat request failed with status ${response.status}`);
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			// The API streams newline-delimited JSON; a network chunk can end mid-line
			while (true) {
				const { done, value } = await reader.read();
				buffer += decoder.decode(value, { stream: !done });
				const lines = buffer.split("\n");
				buffer = done ? "" : (lines.pop() ?? "");

				for (const line of lines) {
					if (!line.trim()) continue;
					const data = JSON.parse(line) as { content?: string; error?: string };
					if (data.error) throw new Error(data.error);
					if (data.content) {
						accumulated += data.content;
						updateLastMessage(accumulated);
					}
				}

				if (done) break;
			}

			if (!accumulated) throw new Error("Empty response");
		} catch (error) {
			if (controller.signal.aborted) {
				// "New chat" or unmount: the history is being discarded, nothing to restore
				if (controller.signal.reason === ABORT_DISCARD) return;
				if (accumulated) {
					// Stopped by the user mid-answer: keep whatever was streamed so far
					removeEmptyAssistantMessage();
				} else {
					// Stopped before any text: drop the unanswered prompt so history stays in pairs
					rollbackLastExchange();
					setInputValue(userPrompt);
				}
			} else if (accumulated) {
				// Stream broke mid-answer: keep the partial reply
				toast.error(t("error"));
			} else {
				console.error("Streaming error:", error);
				toast.error(t("error"));
				rollbackLastExchange();
				setInputValue(userPrompt);
			}
		} finally {
			setIsStreaming(false);
			abortControllerRef.current = null;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
			e.preventDefault();
			handleSendMessage();
		}

		if (e.key === "Escape") {
			e.preventDefault();
			closePanel();
		}
	};

	return (
		<>
			<TooltipWrapper content={t("toggle")}>
				<Button
					ref={toggleButtonRef}
					size="icon"
					onClick={() => setIsOpen((open) => !open)}
					className="print:hidden fixed bottom-4 end-4 md:bottom-10 md:end-20 z-40 size-14 rounded-lg shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
					aria-label={t("toggle")}
					aria-expanded={isOpen}
					aria-controls="otacon-panel"
				>
					<IconSparkles className="size-6" />
				</Button>
			</TooltipWrapper>

			<AlertDialog
				open={isNewChatDialogOpen}
				onOpenChange={setIsNewChatDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("clearTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("clearDescription")}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								abortControllerRef.current?.abort(ABORT_DISCARD);
								clearMessages();
							}}
						>
							{t("clearConfirm")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id="otacon-panel"
						role="dialog"
						aria-label="Otacon"
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2 }}
						className="print:hidden fixed bottom-20 start-0 end-0 mx-auto md:bottom-28 md:start-auto md:end-20 z-50 w-[calc(100vw-1rem)] md:w-96 h-[calc(100dvh-8rem)] md:h-[min(40rem,calc(100dvh-10rem))] bg-card border border-border rounded-lg shadow-xl flex flex-col"
					>
						<div className="flex items-center justify-between p-4 border-b border-border">
							<div className="flex items-center gap-2">
								<IconSparkles className="size-5 text-primary" />
								<h2 className="font-semibold text-lg">Otacon</h2>
							</div>
							<div className="flex items-center gap-2">
								{messages.length > 0 && (
									<TooltipWrapper
										content={t("newChat")}
										open={isAtMessageLimit ? true : undefined}
									>
										<Button
											variant="ghost"
											size="icon-sm"
											aria-label={t("newChat")}
											onClick={() => setIsNewChatDialogOpen(true)}
										>
											<IconMessageCirclePlus className="size-5" />
										</Button>
									</TooltipWrapper>
								)}
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={closePanel}
									aria-label={t("close")}
								>
									<IconX className="size-5" />
								</Button>
							</div>
						</div>

						<div className="flex-1 overflow-hidden">
							<div
								ref={scrollViewportRef}
								className="h-full overflow-y-auto p-4 space-y-4"
								aria-busy={isStreaming}
							>
								{messages.length === 0 && (
									<div className="text-center h-full flex flex-col items-center justify-center text-muted-foreground py-8">
										<IconSparkles className="size-12 mx-auto mb-2 opacity-50" />
										<p>{t("empty")}</p>
									</div>
								)}
								{messages.map((message) => (
									<div
										key={`${message.timestamp}-${message.role}`}
										className={cn("flex", {
											"justify-end": message.role === "user",
											"justify-start": message.role === "assistant",
										})}
									>
										{message.content ? (
											<div
												className={cn("max-w-[80%] rounded-lg p-2", {
													"bg-muted": message.role === "user",
												})}
											>
												<div dir="auto" className="chat-markdown text-sm wrap-break-word">
													<ChatMarkdown>{message.content}</ChatMarkdown>
												</div>
											</div>
										) : (
											<div className="bg-muted text-foreground rounded-lg px-4 py-2">
												<div className="flex gap-1">
													{[0, 150, 300].map((delay) => (
														<span
															key={delay}
															className="size-2 bg-foreground/40 rounded-full animate-bounce"
															style={{ animationDelay: `${delay}ms` }}
														/>
													))}
												</div>
											</div>
										)}
									</div>
								))}
								<div className="h-4" />
							</div>
						</div>

						<div className="p-4 border-t border-border">
							{isAtMessageLimit && (
								<p className="text-xs text-destructive mb-2">
									{t("limitReachedPrefix")}{" "}
									<button
										type="button"
										className="cursor-pointer underline hover:text-primary"
										onClick={() => setIsNewChatDialogOpen(true)}
									>
										{t("limitReachedLink")}
									</button>{" "}
									{t("limitReachedSuffix")}
								</p>
							)}
							<div className="flex gap-2">
								<Textarea
									// Follow the typed text, but keep the page direction for the placeholder
									dir={inputValue ? "auto" : undefined}
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder={t("placeholder")}
									aria-label={t("inputLabel")}
									autoFocus
									disabled={isStreaming || isAtMessageLimit}
									className="flex-1 min-h-9! max-h-24! resize-none"
									maxLength={CHAT_MAX_PROMPT_LENGTH}
								/>
								<Button
									onClick={
										isStreaming
											? () => abortControllerRef.current?.abort(ABORT_STOP)
											: handleSendMessage
									}
									disabled={
										!isStreaming && (!inputValue.trim() || isAtMessageLimit)
									}
									size="icon"
									aria-label={isStreaming ? t("stop") : t("send")}
								>
									{isStreaming ? (
										<IconPlayerStopFilled className="size-4" />
									) : (
										<IconSend className="size-4 rtl:-scale-x-100" />
									)}
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
