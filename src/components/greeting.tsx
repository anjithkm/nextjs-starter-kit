import { FC } from 'react'

export const Greeting: FC<{ name: string }> = ({ name }) => {
	return <h1>Hello, {name}!</h1>
}

export default Greeting
