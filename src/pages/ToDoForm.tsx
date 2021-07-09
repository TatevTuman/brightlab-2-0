import React, { useState } from 'react'

function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState('')
  
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(userInput)
    setUserInput('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
      onChange={handleChange}
      value={userInput}
      placeholder='введите задачу'
      />
    <button>сохранить</button>
    </form>
  )
}

export default ToDoForm