import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import TaskList from '../TaskList'
import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

import './App.css'

class App extends Component<
  object,
  {
    todoData: {
      id: number
      done: boolean
      label: string
      createTime: string
    }[]
    currentFilter: string
  }
> {
  componentDidMount() {
    if (localStorage.getItem('data')) {
      setInterval(() => {
        this.tick()
      }, 5000)
      this.setState(() => {
        return {
          todoData: JSON.parse(localStorage.getItem('data') || '{}'),
        }
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('data', JSON.stringify(this.state.todoData))
  }

  tick() {
    this.setState(({ todoData }: any): any => {
      return {
        todoData: todoData,
      }
    })
  }

  createTodoItem = (label: string) => {
    return {
      id: uuid(),
      done: false,
      label,
      createTime: JSON.stringify(new Date()),
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

  addItem = (text: string) => {
    const newItem = this.createTodoItem(text)
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

  filterStatusHandler = (items: any, filter: string) => {
    const filters = {
      all: 'all',
      active: 'active',
      completed: 'completed',
    }
    switch (filter) {
      case filters.all: {
        return items
      }
      case filters.active: {
        return items.filter((element: { done: boolean }) => {
          return !element.done
        })
      }
      case filters.completed: {
        return items.filter((element: { done: boolean }) => {
          return element.done
        })
      }
      default:
        return items
    }
  }

  filterChangeHandler = (filter: string) => {
    this.setState({
      currentFilter: filter,
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
