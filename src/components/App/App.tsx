import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

type TodoData = {
  id: string
  done: boolean
  label: string
  createTime: string
  timeLeft: string
}[]

const App = () => {
  const [todoData, setTodoData]: [todoData: TodoData, setTodoData: any] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')

  const createTodoItem = (label: string, timeLeft: string) => {
    return {
      id: uuid(),
      done: false,
      label,
      createTime: JSON.stringify(new Date()),
      timeLeft,
    }
  }

  const deleteItem = (id: string) => {
    setTodoData((todoData: TodoData) => {
      return todoData.filter((element: any) => {
        return element.id !== id
      })
    })
  }

  const addItem = (text: string, timeLeft: string) => {
    //works
    setTodoData((todoData: TodoData) => {
      const newTodoItem = createTodoItem(text, timeLeft)
      const newTodoData = [...todoData]
      newTodoData.unshift(newTodoItem)
      return newTodoData
    })
  }

  const onToggleDone = (id: number) => {
    setTodoData((todoData: TodoData) => {
      const newData = [...todoData]
      return newData.map((element: any) => {
        if (element.id === id) {
          return { ...element, ['done']: !element.done }
        }
        return element
      })
    })
  }

  const editItemHandler = (id: number, text: string) => {
    setTodoData((todoData: TodoData) => {
      return todoData.map((item: any) => {
        if (item.id === id) {
          return { ...item, label: text }
        }
        return item
      })
    })
  }

  const clearCompleted = () => {
    setTodoData((todoData: TodoData) => {
      return todoData.filter((element: any) => {
        return !element.done
      })
    })
  }

  const filterChangeHandler = (filter: string) => {
    setCurrentFilter(filter)
  }
  const filterStatusHandler = (filterName: string) => {
    const temp = [...todoData]
    console.log(todoData)
    if (filterName === 'all') {
      return temp.filter((element) => {
        return element
      })
    }
    if (filterName === 'completed') {
      return temp.filter((element) => {
        return element.done
      })
    }
    if (filterName === 'active') {
      return temp.filter((element) => {
        return !element.done
      })
    }
  }

  const onTimer = (id: number, timeLeft: number) => {
    setTodoData((todoData: TodoData) => {
      return todoData.map((element: any) => {
        if (element.id === id) {
          return { ...element, timeLeft: timeLeft }
        }
        return element
      })
    })
  }

  const renderingItems = filterStatusHandler(currentFilter)
  const activeItemsLeft = todoData.filter((element: any) => {
    return !element.done
  }).length
  return (
    <div className="container">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todoData={renderingItems}
          deleteItem={deleteItem}
          onToggleDone={onToggleDone}
          editItemHandler={editItemHandler}
          onTimer={onTimer}
        />
        <Footer
          activeItemsLeft={activeItemsLeft}
          clearCompleted={clearCompleted}
          filterChangeHandler={filterChangeHandler}
          currentFilter={currentFilter}
        />
      </section>
    </div>
  )
}

export default App
