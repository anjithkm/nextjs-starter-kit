import { NextApiRequest, NextApiResponse } from 'next'

// API route handler using the middleware-like function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { name, id } = req.query

	// Simulate middleware behavior by calling the token verification function
	//   await verifyTokenMiddleware("all");

	switch (req.method) {
		case 'GET':
			res.status(200).json({ message: `${name}`, id: id })
			break
		case 'POST':
			break
		case 'PUT':
			break
		case 'DELETE':
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })
	}
}
