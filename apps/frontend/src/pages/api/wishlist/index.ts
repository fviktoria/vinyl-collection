import { getWishlistWithReserved } from '@record-collection/util/get-wishlist-with-reserved';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const wishlist = await getWishlistWithReserved();
			return res.json(wishlist);
		} catch (e) {
			return res.status(500).json({ message: 'api.error' });
		}
	}
}
