// Shared between the chat UI and the /api route so both enforce the same limits
export const CHAT_MAX_MESSAGES = 10;
export const CHAT_MAX_PROMPT_LENGTH = 500;
// Assistant replies are longer than prompts; this only bounds what a client can replay as history
export const CHAT_MAX_HISTORY_MESSAGE_LENGTH = 4000;

export type ChatMessage = {
	role: "user" | "assistant";
	content: string;
};
