import React, { JSX } from 'react'
import Link from 'next/link'

export default function About(): JSX.Element {
	return (
		<div>
			<h1>About Page</h1>
			<Link href="/">Go back Home</Link>
		</div>
	)
}
