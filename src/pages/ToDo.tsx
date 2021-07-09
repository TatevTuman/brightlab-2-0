import React, { useState } from 'react'

function ToDo( {todo, toggleTask, removeTask} ) {
  return (
    <div className='flex-col border-1-solid' key={todo.id}>
      {todo.task}
      <span className='mr-2' onClick={() => removeTask(todo.id)}>X</span>
    </div>
  )
}

export default ToDo