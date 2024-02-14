'use client'

import { Task } from '@/config/types/task'
import { useTaskStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import React from 'react'

const TaskComponent = ({
  id,
  title,
	desc,
	status,
  
}: Task) => {

  const dragTask = useTaskStore(state => state.dragTask)
  const removeTask = useTaskStore(state => state.removeTask)
  
  const handleDelete = (id: string)=>{
    removeTask(id)
  }
  
  return (
    <div className={cn('flex cursor-move items-start justify-between rounded-lg bg-white p-4 ',{
      'border-2 border-sky-500': status === 'todo',
      'border-2 border-amber-500': status === 'in-progress',
      'border-2 border-emerald-500': status === 'done',
    })}
    draggable
    onDrag={()=>dragTask(id)}
    >
      
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>

      <button className='' onClick={()=>handleDelete(id)}>
        <Trash2 />
      </button>

    </div>
  )
}

export default TaskComponent