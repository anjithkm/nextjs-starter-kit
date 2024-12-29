import React, { useState } from 'react'

const Counter: React.FC = () => {
	const [count, setCount] = useState<number>(0)

	return (
		<div>
			<h1>Counter</h1>
			<p role="status">Count: {count}</p>
			<button className="border px-[2px]" onClick={() => setCount(count + 1)}>
				Increment
			</button>
			<button className="border ml-[2px] px-[2px]" onClick={() => setCount(count - 1)}>
				Decrement
			</button>
		</div>
	)
}

export default Counter
