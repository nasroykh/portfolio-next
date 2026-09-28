import { getEncoding, type Tiktoken } from "js-tiktoken";

let encoding: Tiktoken | null = null;

// Building the o200k_base encoder is expensive; it is called once per chunk during indexing
export const getTokenCount = (text: string) => {
	encoding ??= getEncoding("o200k_base");
	return encoding.encode(text).length;
};
