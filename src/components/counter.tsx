import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '@/services/slice/counter'

const Counter: React.FC = () => {

	const dispatch = useDispatch()
	const count = useSelector((state: any) => state.counter.value)

	return (
		<div>
			<h1>Counter</h1>
			<p role="status">Count: {count}</p>
			<button className="border px-[2px]" onClick={() => dispatch(increment())}>
				Increment
			</button>
			<button className="border ml-[2px] px-[2px]" onClick={() => dispatch(decrement())}>
				Decrement
			</button>
		</div>
	)
}

export default Counter
