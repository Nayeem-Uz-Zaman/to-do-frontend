import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const res = await fetch(`${API_URL}/todos`)
      if (!res.ok) throw new Error('Failed to load todos')
      setTodos(await res.json())
    } catch {
      setError('Could not reach the server.')
    }
  }

  async function addTodo(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      })
      if (!res.ok) throw new Error('Failed to add todo')
      const newTodo = await res.json()
      setTodos((prev) => [...prev, newTodo])
      setText('')
    } catch {
      setError('Could not add todo.')
    }
  }

  async function markDone(id) {
    try {
      const res = await fetch(`${API_URL}/todos/${id}/done`, { method: 'PATCH' })
      if (!res.ok) throw new Error('Failed to update todo')
      const updated = await res.json()
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } catch {
      setError('Could not update todo.')
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: '40px auto', padding: '0 16px' }}>
      <h1>To-Do List</h1>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => !todo.done && markDone(todo.id)}
            style={{
              padding: '8px 12px',
              marginBottom: 6,
              background: '#fff',
              borderRadius: 4,
              cursor: todo.done ? 'default' : 'pointer',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#888' : '#222',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
