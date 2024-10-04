export const parseParams = <
	T extends Record<string, string | number | boolean | undefined>,
>(
	params: T,
): Record<string, string> => {
	const parsedParams: Record<string, string> = {};

	Object.entries(params).forEach(([key, value]) => {
		if (!value) return;
		parsedParams[key] = value?.toString();
	});

	return parsedParams;
};
