import React, { useState } from 'react'

export const Table = () => {
	const [rows, setRows] = useState<any>([])
	const [selectedRows, setSelectedRows] = useState<number[]>([])
	const [newRow, setNewRow] = useState({ id: '', name: '', age: '' })

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setNewRow({ ...newRow, [name]: value })
	}

	const addRow = () => {
		if (newRow.id && newRow.name && newRow.age) {
			setRows([...rows, newRow])
			setNewRow({ id: '', name: '', age: '' })
		}
	}

	const deleteRow = (id: number) => {
		setRows(rows.filter((row: any) => row.id !== id))
	}

	const deleteSelectedRows = () => {
		setRows(rows.filter((row: any) => !selectedRows.includes(row.id)))
		setSelectedRows([])
	}

	const editRow = (id: number) => {
		const editedRow = rows.find((row: any) => row.id === id)
		setNewRow(editedRow)
		deleteRow(id)
	}

	const toggleRowSelection = (id: any) => {
		if (selectedRows.includes(id)) {
			setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
		} else {
			setSelectedRows([...selectedRows, id])
		}
	}

	return (
		<div>
			<h1>React Table</h1>
			<input type="text" name="id" placeholder="ID" value={newRow.id} onChange={handleInputChange} />
			<input type="text" name="name" placeholder="Name" value={newRow.name} onChange={handleInputChange} />
			<input type="text" name="age" placeholder="Age" value={newRow.age} onChange={handleInputChange} />
			<button onClick={addRow}>Add Row</button>
			<button onClick={deleteSelectedRows}>Delete Selected Rows</button>
			<table border={1}>
				<thead>
					<tr>
						<th>Select</th>
						<th>ID</th>
						<th>Name</th>
						<th>Age</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row: any) => (
						<tr key={row.id}>
							<td>
								<input
									type="checkbox"
									checked={selectedRows.includes(row.id)}
									onChange={() => toggleRowSelection(row.id)}
								/>
							</td>
							<td>{row.id}</td>
							<td>{row.name}</td>
							<td>{row.age}</td>
							<td>
								<button onClick={() => editRow(row.id)}>Edit</button>
								<button onClick={() => deleteRow(row.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Table
