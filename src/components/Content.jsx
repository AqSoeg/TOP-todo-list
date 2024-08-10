import {
  Card,
  Button,
  Modal,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
} from 'flowbite-react'
import { IoMdAdd, IoIosStar, IoMdClose } from 'react-icons/io'
import { format } from 'date-fns'
import { useState } from 'react'

function MyCard({ id, title, description, dueDate, important, handleDelete }) {
  const handleClickCard = () => {
    console.log('Card clicked')
  }

  return (
    <Card href='#' className='max-w-sm m-4' onClick={handleClickCard}>
      <div className='flex'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
        </h5>
        {important ? <IoIosStar /> : <></>}
        <IoMdClose
          className='h-5 w-5 justify-end ml-auto'
          onClick={() => handleDelete(id)}
        />
      </div>
      <p className='font-normal text-gray-700 dark:text-gray-400'>
        {description}
      </p>
      <p className='font-normal text-gray-700 dark:text-gray-400'>
        Due: {dueDate}
      </p>
    </Card>
  )
}

function MyForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    description: '',
    dueDate: format(Date(), 'yyyy-MM-dd'),
    important: false,
  })
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleChangeCheckbox = (event) => {
    setIsChecked(event.target.checked)
  }

  const handleChangeDate = (date) => {
    console.log(date)
    setFormData((prevData) => ({
      ...prevData,
      dueDate: format(date, 'yyyy-MM-dd'),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    formData.important = isChecked
    onFormSubmit(formData)
    console.log('Form submitted:', formData)
  }

  return (
    <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='title' value='Title' />
        </div>
        <TextInput name='title' type='text' onChange={handleChange} required />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='descrpition' value='Description' />
        </div>
        <TextInput
          name='description'
          type='text'
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='dueDate' value='Due Date' />
        </div>
        <Datepicker onSelectedDateChanged={handleChangeDate} />
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox name='important' onChange={handleChangeCheckbox} />
        <Label htmlFor='important'>Important</Label>
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default function Content({ todoList, onFormSubmit }) {
  const [openModal, setOpenModal] = useState(false)
  const [validList, setValidList] = useState(todoList)

  function onCloseModal() {
    setOpenModal(false)
  }

  function handleDelete(id) {
    setValidList(validList.filter((item) => item.id !== id))
  }

  return (
    <>
      <div className='grid grid-cols-3'>
        {validList.map((item) => (
          <MyCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            dueDate={item.dueDate}
            important={item.important}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-wrap gap-2'>
          <Button color='blue' onClick={() => setOpenModal(true)}>
            <IoMdAdd className='mr-2 h-5 w-5' />
            Add
          </Button>
        </div>
      </div>
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              Add a new todo item
            </h3>
            <MyForm onFormSubmit={onFormSubmit} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
