import React from 'react'
import Column from './Column'
import AddNewTodo from './AddNewTodo'

const Columns = () => {
  return (
    <div>
      <AddNewTodo />
      
      <div className='flex gap-4'>
        <Column title='Todo' status='todo'  />
        <Column title='In Progress' status='in-progress' />
        <Column title='Done' status='done' />
    </div>
    </div>
  )
}

export default Columns