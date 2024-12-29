import React, { JSX } from 'react'
import Link from 'next/link'

export default function Home(): JSX.Element {
	return (
		<div>
			<h1>Home Page</h1>
			<Link href="/about">Go to About</Link>
		</div>
	)
}
