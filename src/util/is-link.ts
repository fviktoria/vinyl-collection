export const isLink = (str: string): boolean => {
	const regexPattern = /^(https?:\/\/|www\.)\S+$/;
	return regexPattern.test(str);
};
