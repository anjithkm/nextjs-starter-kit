import { EndpointBuilder, BaseQueryFn } from '@reduxjs/toolkit/query/react'

// Define TypeScript interfaces for API responses
interface Post {
	id: number
	title: string
	body: string
}

export const getPosts = (builder: EndpointBuilder<BaseQueryFn, string, string>) => {
	return builder.query<Post[], void>({
		query: () => '/posts',
	})
}
