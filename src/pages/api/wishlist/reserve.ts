import {
	setItemAsReserved,
	undoSetItemAsReserved,
} from '@record-collection/util/wishlist';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	if (req.method === 'POST') {
		const body = JSON.parse(req.body);
		try {
			await setItemAsReserved({ id: body.id.toString(), email: body.email });
			res.status(200).json({ message: 'api.reserve.success' });
		} catch (e) {
			return res.status(500).json({ message: 'api.reserve.error' });
		}
	}

	if (req.method === 'DELETE') {
		const body = JSON.parse(req.body);
		try {
			await undoSetItemAsReserved({ id: body.id.toString(), email: body.email });
			res.status(200).json({ message: 'api.reserve.undo-success' });
		} catch (e) {
			return res.status(500).json({ message: 'api.reserve.undo-error' });
		}
	}
}
