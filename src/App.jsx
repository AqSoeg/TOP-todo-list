import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import { format } from 'date-fns'

function App() {
  const todoList = []
  class todoItem {
    constructor(id, title, description, dueDate, important) {
      this.id = id
      this.title = title
      this.description = description
      this.dueDate = dueDate
      this.important = important
    }
  }

  const handleFormData = (data) => {
    const newItem = new todoItem(
      data.id,
      data.title,
      data.description,
      data.dueDate,
      data.important
    )
    todoList.push(newItem)
  }

  let dueDate = format(new Date('2024-08-15'), 'yyyy-MM-dd')
  let item1 = new todoItem(
    Date.now(),
    'Math',
    'Math homework 1.1',
    dueDate,
    true
  )
  let item2 = new todoItem(
    Date.now() + 1,
    'English',
    'English homework 2.1',
    dueDate,
    false
  )
  let item3 = new todoItem(
    Date.now() + 2,
    'History',
    'History homework 3.1',
    dueDate,
    false
  )
  todoList.push(item1)
  todoList.push(item2)
  todoList.push(item3)

  return (
    <>
      <Header />
      <Content todoList={todoList} onFormSubmit={handleFormData} />
    </>
  )
}

export default App
