"use client";

import { useState, useEffect, useRef } from "react";
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
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
	IconSend,
	IconPlayerStopFilled,
	IconSparkles,
	IconX,
	IconMessageCirclePlus,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./ui/tooltip-wrapper";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

// Types
interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
}

const STORAGE_KEY = "usagi-chat-history";
const MAX_MESSAGES = 10;
const INITIAL_MESSAGE: Message = {
	role: "assistant",
	content: "Hello! I'm Usagi, Nas's AI assistant. How can I help you today?",
	timestamp: Date.now(),
};

// Custom hook for localStorage persistence
function useChatHistory() {
	const [messages, setMessages] = useState<Message[]>(() => {
		// Initialize state from localStorage
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					return JSON.parse(stored);
				} catch (e) {
					console.error("Failed to parse chat history:", e);
				}
			}
		}
		return [INITIAL_MESSAGE];
	});

	useEffect(() => {
		if (messages.length > 0) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
		}
	}, [messages]);

	const addMessage = (message: Message) => {
		setMessages((prev) => {
			const updated = [...prev, message];
			// Enforce message limit
			if (updated.length > MAX_MESSAGES) {
				return updated.slice(updated.length - MAX_MESSAGES);
			}
			return updated;
		});
	};

	const updateLastMessage = (content: string) => {
		setMessages((prev) => {
			const updated = [...prev];
			const lastMessage = updated[updated.length - 1];
			if (lastMessage && lastMessage.role === "assistant") {
				lastMessage.content = content;
			}
			return updated;
		});
	};

	const clearMessages = () => {
		setMessages([INITIAL_MESSAGE]);
		localStorage.removeItem(STORAGE_KEY);
	};

	return {
		messages,
		setMessages,
		addMessage,
		updateLastMessage,
		clearMessages,
	};
}

export const AIAssistant = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isStreaming, setIsStreaming] = useState(false);
	const {
		messages,
		setMessages,
		addMessage,
		updateLastMessage,
		clearMessages,
	} = useChatHistory();
	const scrollViewportRef = useRef<HTMLDivElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		if (scrollViewportRef.current) {
			const viewport = scrollViewportRef.current;
			viewport.scrollTop = viewport.scrollHeight;
		}
	}, [messages, isLoading]);

	// Streaming message handler
	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading) return;

		if (inputValue.length > 500) {
			toast.error(
				"Message is too long. Please shorten it to 500 characters or less."
			);
			return;
		}

		if (messages.length >= MAX_MESSAGES) {
			toast.error(
				"Message limit reached. Please start a new chat to continue."
			);
			return;
		}

		const userPrompt = inputValue.trim();
		const userMessage: Message = {
			role: "user",
			content: userPrompt,
			timestamp: Date.now(),
		};

		addMessage(userMessage);
		setInputValue("");
		setIsLoading(true);
		setIsStreaming(true);

		// Create placeholder for assistant message
		const assistantMessage: Message = {
			role: "assistant",
			content: "",
			timestamp: Date.now(),
		};
		addMessage(assistantMessage);

		// Create abort controller for stopping stream
		abortControllerRef.current = new AbortController();

		try {
			const response = await fetch("/api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: userPrompt, messages }),
				signal: abortControllerRef.current.signal,
			});

			if (!response.ok) throw new Error("Failed to fetch");

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let accumulatedContent = "";

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value);
					const lines = chunk.split("\n").filter((line) => line.trim());

					for (const line of lines) {
						try {
							const data = JSON.parse(line);
							if (data.content) {
								accumulatedContent += data.content;
								updateLastMessage(accumulatedContent);
							}
						} catch {
							// Skip invalid JSON
						}
					}
				}
			}
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				console.log("Stream aborted by user");
			} else {
				console.error("Streaming error:", error);
				// Remove the empty assistant message on error
				setMessages((prev) => prev.slice(0, -1));
			}
		} finally {
			setIsLoading(false);
			setIsStreaming(false);
			abortControllerRef.current = null;
		}
	};

	const handleStopStreaming = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}

		if (e.key === "Escape") {
			e.preventDefault();
			setIsOpen(false);
		}
	};

	const handleNewChat = () => {
		clearMessages();
	};

	const isAtMessageLimit = messages.length >= MAX_MESSAGES;

	return (
		<>
			{/* Floating Toggle Button */}
			<TooltipWrapper content="Toggle Usagi AI Assistant">
				<Button
					size="icon"
					onClick={() => setIsOpen(!isOpen)}
					className="fixed bottom-0 right-4 md:bottom-10 md:right-20 z-40 size-14 rounded-lg shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
					aria-label="Toggle AI Assistant"
				>
					<IconSparkles className="size-6" />
				</Button>
			</TooltipWrapper>

			{/* Chat Panel */}
			{isOpen && (
				<div className="fixed bottom-16 left-0 right-0 mx-auto md:bottom-24 md:left-auto md:right-32 z-50 w-[calc(100vw-1rem)] md:w-96 md:max-w-[calc(100vw-3rem)] h-[calc(100dvh-12rem)] md:h-[calc(100dvh-12rem)] bg-card border border-border rounded-lg shadow-xl flex flex-col animate-in fade-in duration-200">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-border">
						<div className="flex items-center gap-2">
							<IconSparkles className="size-5 text-primary" />
							<h2 className="font-semibold text-lg">Usagi</h2>
						</div>
						<div className="flex items-center gap-2">
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<TooltipWrapper
										content="New chat"
										open={isAtMessageLimit ? true : undefined}
									>
										<Button
											variant="ghost"
											size="icon-sm"
											disabled={messages.length === 0}
											title="New chat"
										>
											<IconMessageCirclePlus className="size-5" />
										</Button>
									</TooltipWrapper>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Clear chat history?</AlertDialogTitle>
										<AlertDialogDescription>
											This will permanently delete all messages in this
											conversation. This action cannot be undone.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleNewChat}>
											Clear chat
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<Button
								variant="ghost"
								size="icon-sm"
								onClick={() => setIsOpen(false)}
								title="Close chat"
							>
								<IconX className="size-5" />
							</Button>
						</div>
					</div>

					{/* Messages Area */}
					<div className="flex-1 overflow-hidden">
						<div
							ref={scrollViewportRef}
							className="h-full overflow-y-auto p-4 space-y-4"
						>
							{messages.length === 0 && (
								<div className="text-center text-muted-foreground py-8">
									<IconSparkles className="size-12 mx-auto mb-2 opacity-50" />
									<p>Start a conversation with Usagi!</p>
								</div>
							)}
							{messages.map((message, index) => (
								<div
									key={index}
									className={cn("flex", {
										"justify-end": message.role === "user",
										"justify-start": message.role === "assistant",
									})}
								>
									<div
										className={cn("max-w-[80%] rounded-lg p-2", {
											"bg-muted": message.role === "user",
										})}
									>
										<div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0! [&>*:last-child]:mb-0!">
											<ReactMarkdown remarkPlugins={[remarkGfm]}>
												{message.content}
											</ReactMarkdown>
										</div>
									</div>
								</div>
							))}
							{isLoading && messages[messages.length - 1]?.content === "" && (
								<div className="flex justify-start">
									<div className="bg-muted text-foreground rounded-lg px-4 py-2">
										<div className="flex gap-1">
											<span
												className="size-2 bg-foreground/40 rounded-full animate-bounce"
												style={{ animationDelay: "0ms" }}
											/>
											<span
												className="size-2 bg-foreground/40 rounded-full animate-bounce"
												style={{ animationDelay: "150ms" }}
											/>
											<span
												className="size-2 bg-foreground/40 rounded-full animate-bounce"
												style={{ animationDelay: "300ms" }}
											/>
										</div>
									</div>
								</div>
							)}
							{/* Extra padding at bottom to ensure last message is visible */}
							<div className="h-4" />
						</div>
					</div>

					{/* Input Section */}
					<div className="p-4 border-t border-border">
						{isAtMessageLimit && (
							<p className="text-xs text-destructive mb-2">
								Message limit reached. Start a{" "}
								<button
									className="cursor-pointer underline hover:text-primary"
									onClick={handleNewChat}
								>
									new chat
								</button>{" "}
								to continue.
							</p>
						)}
						<div className="flex gap-2">
							<Textarea
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyUp={handleKeyPress}
								placeholder="Type your message..."
								disabled={isLoading || isAtMessageLimit}
								className="flex-1 min-h-9! max-h-24! resize-none"
								maxLength={500}
							/>
							<Button
								onClick={isStreaming ? handleStopStreaming : handleSendMessage}
								disabled={
									(!inputValue.trim() && !isLoading) || isAtMessageLimit
								}
								size="icon"
							>
								{isStreaming ? (
									<IconPlayerStopFilled className="size-4" />
								) : (
									<IconSend className="size-4" />
								)}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
