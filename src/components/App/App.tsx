import React, { Component } from 'react'

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
      editing: boolean
      label: string
      createTime: string
    }[]
    currentFilter: string
  }
> {
  itemsId = 100

  componentDidUpdate() {
    setInterval(() => {
      return this.setState(({ todoData }) => {
        return {
          todoData: todoData,
        }
      })
    }, 5000)
  }

  createTodoItem = (label: string) => {
    return {
      id: this.itemsId++,
      done: false,
      editing: false,
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
    this.setState(({ todoData }) => {
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

  editItem = (id: number, text: string) => {
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

  filter = (items: any, filter: string) => {
    switch (filter) {
      case 'all': {
        return items
      }
      case 'active': {
        return items.filter((element: { done: boolean }) => {
          return !element.done
        })
      }
      case 'completed': {
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
    const renderingItems = this.filter(todoData, currentFilter)
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
            editItem={this.editItem}
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
