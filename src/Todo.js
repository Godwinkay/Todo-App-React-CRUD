import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Todo = () => {

    const initialState = JSON.parse(localStorage.getItem('todo')) || [];
    const [todo, setTodo] = useState(initialState);

    const [newTask, setNewTask] = useState('')


    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todo));
    }, [todo]);


    const onSubmitForm = (e) => {
        e.preventDefault();
    }

    const addTask = () => {
        if (newTask.length > 0) {
            const task = {
                id: uuidv4(),
                taskName: newTask,
                completed: false,
            };
            setTodo([...todo, task]);
            setNewTask('');
        }
    };
    
    const deleteTask = (id) => {
        setTodo(todo.filter((task) => task.id !== id))
    }

    const completedTask = (id) => {
        setTodo(
            todo.map((task) => {
                if (task.id === id) {
                    return {...task, completed: true}
                } else {
                    return task
                }
            })
        )
    }

  return (
    <div className='min-h-[1000px] bg-blue-900'>
    <div className='h-max-h w-full flex justify-center items-center'>
      <div className='bg-blue-200 w-1/2 rounded-lg flex justify-center items-center my-12 p-6'>
        <form onSubmit={onSubmitForm} className='flex flex-col gap-6'>
            <h1 className='text-4xl font-bold text-center'>To-do List</h1>
            
            <div className='space-x-3'>
                <input type='text' placeholder='Input a new task' value={newTask} onChange={(e) => {setNewTask(e.target.value)}} className='w-[400px] p-3 bg-transparent rounded outline-none border-blue-900 border-[1px] placeholder:italic'/>
                <button onClick={addTask} className='p-3 bg-blue-900 text-white rounded'>Add Task</button>
            </div>

            
                {todo.map((task) => {
                    return <div
                    key={task.id}
                     className={`flex justify-between mt-3 p-3 rounded-md uppercase ${task.completed ? 'bg-blue-700' : ''}`}>
                            <div>
                            <h2
                            className={`text-xl font-medium ${
                                task.completed ? 'completed-task' : ''
                            }`}
                        >
                            {task.taskName}
                        </h2> 
                            </div>
                            <div className='space-x-3'>
                                <button onClick={() => completedTask(task.id)}><i className='text-blue-900'><CheckCircleIcon /></i></button>
                                <button onClick={() => deleteTask(task.id)}><i  className='text-red-600'><DeleteOutlineIcon /></i></button>
                            </div>
                    </div>
                })}
        
        </form>
      </div>
    </div>
    </div>
  )
}

export default Todo
