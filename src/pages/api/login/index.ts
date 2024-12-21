import { NextApiRequest, NextApiResponse } from 'next'
import { verifyAuthenticationMiddleware } from '@/middlewares/authentication'
import { postLoginContoller } from '@/controllers/login'

// API route handler using the middleware-like function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const { name } = req.query;

	const name = 'Anjith K M'

	// Simulate middleware behavior by calling the token verification function
	await verifyAuthenticationMiddleware('all')

	switch (req.method) {
		case 'GET':
			res.status(200).json({ message: `${name}` })
			break
		case 'POST':
			await postLoginContoller(req, res)
			break
		case 'PATCH':
			res.status(200).json({ message: `${name}` })
			break
		case 'DELETE':
			res.status(200).json({ message: `${name}` })
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}
