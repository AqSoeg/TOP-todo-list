import { Navbar } from 'flowbite-react'
import { CiCircleCheck } from 'react-icons/ci'

export default function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='#'>
        <CiCircleCheck className='h-5 w-5' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-4'>
          Todo List
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse></Navbar.Collapse>
    </Navbar>
  )
}
