import { selectHttpOptionsAndBody } from '@apollo/client'
import React, { useState } from 'react'
import { PageMeta } from '~seo'
import { Button } from '~ui'
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'

const IndexPage = () => {
  const [todos, setTodos] = useState([]) 
  
  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        complete: false
      }
      setTodos([...todos, newItem]) 
    }
  }

  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => {
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      })
    ])
  }
  console.log('todos --->', todos)
  return (
    <section className="bg-rose pt-20">
      <PageMeta title={'Home'} />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h1 className="tracking-tight text-black-1000">
          <span className="block">Ready to dive in?</span>
        </h1>
        <span className='flex-col'>
          <p>todo лист</p>
          <p className="text-black-1000"> cписок задач</p> 
          <ToDoForm addTask={addTask} className="flex-col border-1-solid-black"/>
          {todos.map((todo) => {
            return (
              <ToDo 
              todo={todo}
              key={todo.id}
              toggleTask={handleToggle}
              removeTask={removeTask}
              />
            )
          })}
        </span>
      </div>
    </section>
  )
}

export default IndexPage
