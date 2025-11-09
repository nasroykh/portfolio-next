import { getEncoding } from "js-tiktoken";

export const getTokenCount = (text: string) => {
	const encoding = getEncoding("o200k_base");

	return encoding.encode(text).length;
};
