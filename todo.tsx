import React, { useState } from 'react';
import { useTaskList } from '@/store/store';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import ss from "../images/ss.svg";

type TaskList = {
  title: string;
  description: string;
};

const Todos = () => {
  const { updateTask, createdTasks, deleteTask }: any = useTaskList();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tasks, setTasks] = useState<Array<{ title: string, desc: string }>>([]);
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("");


  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
    setTitle('');
    setDesc('');
  };


  const update = () => {
    updateTask(title, desc)
    closeSheet();

  }
  const createTask = (): void => {

    setTasks([...tasks, { title, desc }]);
    setTitle('');
    setDesc('');
  };

  console.log(createdTasks)
  return (
    <div>
      {createdTasks.length > 0 && (
        <>
          <h3 className='pt-5 ml-20 font-bold flex flex-row justify-center items-center'>Created Tasks</h3>
          <p className='ml-20 text-gray-500 flex flex-row justify-center items-center'>{`You have ${createdTasks.length} task${createdTasks.length !== 1 ? 's' : ''} to do`}</p>
          <div className="flex flex-col items-center justify-center ">
            <Button className="flex flew-row self-end mr-20" variant="outline" onClick={openSheet}>
              Click here to add more tasks
            </Button>
            {createdTasks.length !== 0 && createdTasks.map((task: TaskList, index: number) => (
              <div key={index} className='mt-5 rounded-2xl bg-opacity-100 bg-[rgba(245,247,249,1)] flex flex-col justify-center items-center h-20 w-96 '>
                <div onClick={() => deleteTask(task.title)} className="bg-red-500 text-white px-2 py-0.5 cursor-pointer mt-6 ml-auto">
                  X
                </div>
                <p className='pl-5 pb-7flex flex-row justify-center items-center font-bold'>Title: {task.title}</p>
                <p className='pl-5 pb-7 flex flex-row justify-center items-center '>Description: {task.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
  
      <Sheet open={isSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <h2>Create Task</h2>
              <h3 className="p-4 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Title</h3>
              <Input type="text" placeholder="Enter text.. " onChange={(e) => { setTitle(e.target.value) }} />
  
              <h3 className=" mt-3 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Description</h3>
              <Input type="text" placeholder="Enter Description.." className="w-96 h-56" onChange={(e) => { setDesc(e.target.value) }} />
            </SheetTitle>
            <SheetDescription>
              <div>
                <h3 className=" mt-3 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Upload Screenshot</h3>
                <div className="w-32 h-32  rounded-md border-dotted border-1 border-black flex flex-row items-center justify-center">
                </div>
              </div>
              <div className="flex flex-row justify-between align-center pt-8 w-full">
                <Button variant="outline" className="w-[45%] h-12 font=['Urbanist'] p-5  rounded-12 border-1 border-solid  border-black gap-3 flex flex-row justify-center items-center " onClick={closeSheet}>Cancel</Button>
                <Button variant="outline" className="w-[45%] h-12 font=['Urbanist']  p-5 rounded-12 border-1 border-solid border-black gap-3 flex flex-row justify-center items-center bg-blue-500 bg-opacity-10 text-blue-600" onClick={update} >+ Create Task</Button>
              </div>
  
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
  
    </div>
  );
}
  
export default Todos;
