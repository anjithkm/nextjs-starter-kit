import { NextApiRequest, NextApiResponse } from 'next'
import { verifyAuthenticationMiddleware } from '@/middlewares/authentication'

// API route handler using the middleware-like function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const { name } = req.query;

	// Simulate middleware behavior by calling the token verification function
	await verifyAuthenticationMiddleware('all')

	res.status(503).json({
		error: 'Service Unavailable',
		message: 'The api end pont is unavailable. Please try again.',
	})
}
