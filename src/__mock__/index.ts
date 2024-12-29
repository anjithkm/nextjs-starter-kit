(global as any).process = {
	env: {
		...process.env,
		API_BASE_URL: 'http://localhost:3000/api',
	},
}