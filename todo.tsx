
import React, { useState } from 'react';
import { useTaskList } from '@/store/store';
import { title } from 'process';
import { Button } from "@/components/ui/button"

type TaskList = {
  title: string,
  description: string
}



const Todos = () => {
  const { createdTasks, deleteTask }: any = useTaskList();

  console.log({ createdTasks })

  return (
    <div>
      
      <h3 className='pt-5 ml-20 font-bold flex flex-row justify-center items-center'>Created Tasks</h3>
      <p className='ml-20 text-gray-500 flex flex-row justify-center items-center'>{`You have ${createdTasks.length} task${createdTasks.length !== 1 ? 's' : ''} to do`}</p>
      <div className="flex flex-col items-center justify-center ">

        {createdTasks && createdTasks.map((task: TaskList, index: number) => (
          <div key={index} className='mt-5 rounded-2xl bg-opacity-100 bg-[rgba(245,247,249,1)] flex flex-col justify-center items-center h-20 w-96 '>
            <div onClick={() =>deleteTask(task.title)} className="bg-red-500 text-white px-2 py-1 cursor-pointer mt-1 ml-auto">
              Delete
            </div>
            <p className='pl-5 flex flex-row justify-center items-center '>Title: {task.title}</p>
            <p className='pl-5 pb-2 flex flex-row justify-center items-center '>Description: {task.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Todos;
