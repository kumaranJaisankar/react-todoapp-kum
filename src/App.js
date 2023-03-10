import {Component} from 'react'
import {v4} from 'uuid'
import {MdDeleteForever} from 'react-icons/md'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {format} from 'date-fns'
import 'animate.css'
import './App.css'

const listFromStorage = () => {
  const getList = localStorage.getItem('todoList')
  const parsedList = JSON.parse(getList)
  if (parsedList === null) {
    return []
  }
  return parsedList
}

class App extends Component {
  state = {newItem: '', list: listFromStorage()}

  checkBox = id => {
    const {list} = this.state
    this.setState({
      list: list.map(each => {
        if (each.id === id) {
          return {...each, isDone: !each.isDone}
        }
        return each
      }),
    })
  }

  addItem(todoValue) {
    const {list} = this.state
    if (todoValue !== '') {
      const newItem = {
        id: v4(),
        value: todoValue,
        isDone: false,
        date: format(new Date(), 'MM/dd/yyyy'),
      }
      const lists = [...list]
      lists.push(newItem)

      this.setState({
        list: lists,
        newItem: '',
      })
    }
  }

  deleteItem(id) {
    const {list} = this.state
    const lists = [...list]
    const updatedList = lists.filter(item => item.id !== id)
    this.setState({
      list: updatedList,
    })
  }

  updateInput(input) {
    this.setState({newItem: input})
  }

  render() {
    const {newItem, list} = this.state
    localStorage.setItem('todoList', JSON.stringify(list))
    return (
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5_pFXLFlros8tRZoOHLVZVI30KJEU411IQ&usqp=CAU"
          width="300"
          height="200"
          alt="logo"
          className="logo"
        />
        <h1 className="app-title">
          Kumaran<span>&apos;</span>s Todo App
        </h1>
        <div className="container">
          <input
            type="text"
            className="input-text"
            placeholder="Write a todo"
            value={newItem}
            onChange={e => this.updateInput(e.target.value)}
          />
          <button
            type="button"
            className="add-btn aws-btn"
            onClick={() => this.addItem(newItem)}
            disabled={!newItem.length}
          >
            Add Todo
          </button>
          <div className="list">
            {list.length === 0 && (
              <h1 className="empty-list animate__bounceInLeft animate__animated animate__repeat-1">
                Add Your Todo<span>&apos;</span>s...
              </h1>
            )}
            <ul>
              {list.map(item => {
                const isChecked = item.isDone
                  ? 'deco animate__animated animate__lightSpeedOutRight animate__repeat-1'
                  : ''
                const task = !item.isDone
                  ? 'none'
                  : 'task-completed animate__flipInX animate__animated animate__repeat-1'
                return (
                  <li key={item.id}>
                    <div className="div">
                      <input
                        type="checkbox"
                        checked={item.isDone}
                        onChange={() => this.checkBox(item.id)}
                      />
                      <p className={isChecked}>{item.value}</p>
                      <h4 className={task}>
                        <span className="deco">{item.value}</span>
                        -Task Completed
                        <BsFillCheckCircleFill color="green" />
                      </h4>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => this.deleteItem(item.id)}
                      >
                        Delete
                        <MdDeleteForever size={18} />
                      </button>
                      <p className="date">on {item.date}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// export Default app
export default App
