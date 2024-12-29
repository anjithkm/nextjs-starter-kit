import React from 'react'
import { useGetPostByIdQuery } from '@/services/api'

const Posts: React.FC = () => {
	//   const { data: getPostData, error: getPostError, isLoading: getPostLoading } = useGetPostsQuery();
	const { data: getPostByIdData, error: getPostByIdError, isLoading: getPostByIdLoading } = useGetPostByIdQuery('1')

	if (getPostByIdLoading) return <div>Loading...</div>
	if (getPostByIdError) return <div>Error loading posts</div>

	return (
		<div>
			<h1>Posts</h1>
			{/* <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
			<ul>{getPostByIdData && <li key={getPostByIdData.id}>{getPostByIdData.title}</li>}</ul>
		</div>
	)
}

export default Posts
