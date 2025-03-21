import { parseParams } from './parse-params';

export type ParamsType = Record<string, string | number | boolean | undefined>;

// eslint-disable-next-line
type RequestOptionsType = RequestInit & {
	params?: ParamsType;
};
type DataType = Record<string, string | number | boolean>;

const createDiscogsClient = () => {
	const baseURL: string = 'https://api.discogs.com';
	const token: string | undefined = process.env.DISCOGS_TOKEN;
	const userAgent: string | undefined = process.env.DISCOGS_USER_AGENT;

	const fetchWithHeaders = async <T>(
		url: string,
		options: RequestOptionsType,
	): Promise<T> => {
		if (token) {
			options.headers = {
				...(options.headers as HeadersInit),
				Authorization: `Discogs token=${token}`,
			};
		}
		if (userAgent) {
			options.headers = {
				...(options.headers as HeadersInit),
				'User-Agent': userAgent,
			};
		}
		const response = await fetch(url, options);
		return response.json() as Promise<T>;
	};

	const request = async <T>(
		method: string,
		url: string,
		// eslint-disable-next-line
		data: any,
		options: RequestOptionsType = {},
	): Promise<T> => {
		const fetchOptions: RequestInit = { method, ...options };

		if (data) {
			fetchOptions.body = JSON.stringify(data);
			fetchOptions.headers = {
				...(fetchOptions.headers as HeadersInit),
				'Content-Type': 'application/json',
			};
		}

		// Handle params
		const { params } = options;
		if (params) {
			const queryString = new URLSearchParams(parseParams(params)).toString();
			url += `?${queryString}`;
		}

		return fetchWithHeaders<T>(`${baseURL}${url}`, fetchOptions);
	};

	const get = <T>(url: string, options?: RequestOptionsType): Promise<T> =>
		request<T>('GET', url, null, options);
	const post = <T>(
		url: string,
		data: DataType,
		options?: RequestOptionsType,
	): Promise<T> => request<T>('POST', url, data, options);
	const put = <T>(
		url: string,
		data: DataType,
		options?: RequestOptionsType,
	): Promise<T> => request<T>('PUT', url, data, options);
	const del = <T>(url: string, options?: RequestOptionsType): Promise<T> =>
		request<T>('DELETE', url, null, options);

	return {
		get,
		post,
		put,
		delete: del,
	};
};

export const discogsClient = createDiscogsClient();
