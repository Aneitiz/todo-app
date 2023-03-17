import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

interface AppState {
  todoData: {
    id: number
    done: boolean
    label: string
    createTime: string
    timeLeft: number
  }[]
  currentFilter: string
}

class App extends Component<{}, AppState> {
  createTodoItem = (label: string, timeLeft: string) => {
    return {
      id: uuid(),
      done: false,
      label,
      createTime: JSON.stringify(new Date()),
      timeLeft,
    }
  }

  deleteItem = (id: number) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((element: { id: number }) => element.id !== id)
      return {
        todoData: newData,
      }
    })
  }

  addItem = (text: string, timeLeft: string) => {
    const newItem = this.createTodoItem(text, timeLeft)
    this.setState(({ todoData }: any) => {
      const newArray = [...todoData, newItem]
      return { todoData: newArray }
    })
  }

  toggleProperty(arr: object[], id: number, propName: string) {
    return arr.map((item: any) => {
      if (item.id === id) {
        return { ...item, [propName]: !item[propName] }
      }
      return item
    })
  }

  onToggleDone = (id: number) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  editItemHandler = (id: number, text: string) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          if (item.id === id) {
            return { ...item, label: text }
          }
          return item
        }),
      }
    })
  }

  clearCompleted = () => {
    const { todoData } = this.state
    const newArray = todoData.filter((item: { done: boolean }) => {
      return !item.done
    })
    this.setState(() => {
      return {
        todoData: newArray,
      }
    })
  }

  filterStatusHandler = (items: object[], filter: string) => {
    if (filter === 'all') {
      return items
    }
    if (filter === 'completed') {
      return items.filter((item: any) => {
        return item.done
      })
    }
    if (filter === 'active') {
      return items.filter((item: any) => {
        return !item.done
      })
    }
  }

  filterChangeHandler = (filter: string) => {
    this.setState({
      currentFilter: filter,
    })
  }

  onTimer = (id: number, timeLeft: number) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((element) => {
          if (element.id === id) {
            return { ...element, timeLeft: timeLeft }
          }
          return element
        }),
      }
    })
  }

  state = {
    todoData: [],
    currentFilter: 'all',
  }

  render() {
    const { todoData, currentFilter } = this.state
    const renderingItems = this.filterStatusHandler(todoData, currentFilter)
    const activeItemsLeft = todoData.filter((element: { done: boolean }) => {
      return !element.done
    }).length
    return (
      <div className="container">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todoData={renderingItems}
            deleteItem={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editItemHandler={this.editItemHandler}
            onTimer={this.onTimer}
          />
          <Footer
            activeItemsLeft={activeItemsLeft}
            clearCompleted={this.clearCompleted}
            filterChangeHandler={this.filterChangeHandler}
            currentFilter={currentFilter}
          />
        </section>
      </div>
    )
  }
}

export default App
