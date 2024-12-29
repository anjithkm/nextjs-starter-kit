import React, { useState } from 'react'
import { useCreatePostMutation } from '../services/api'

const CreatePost: React.FC = () => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [createPost, { isLoading }] = useCreatePostMutation()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await createPost({ title, body })
		setTitle('')
		setBody('')
	}

	return (
		<div>
			<h1>Create Post</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					required
				/>
				<textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Creating...' : 'Create'}
				</button>
			</form>
		</div>
	)
}

export default CreatePost
