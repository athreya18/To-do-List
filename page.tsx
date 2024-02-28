"use client"
import React, { useState } from "react";
import Image from "next/image"
import iconimg from "../images/Group-1.svg";
import john from "../images/john.svg";
import list from "../images/list.svg";
import ss from "../images/ss.svg";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Todos from "@/components/ui/todo"
import { useTaskList } from "../store/store";



interface Task {
  title: string;
  description: string;
}

export default function Home() {
  
  const { updateTask, createdTasks}: any = useTaskList();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState<string | undefined | null>("");

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
  return (
    <>
    {/* header */}
      <div className="pt-10 w-full h-16  flex flex-row justify-evenly align-center">
        <div className=" w-20 h-7 flex flex-row justify-item-start align-center">
          <Image src={iconimg} width={20} height={15} className=" pt-4 rounded-md" alt=""></Image>
          <h1 className=" pt-2 text-2xl font-['Urbanist'] ">Taski</h1>
        </div>
        <div className="flex flex-row w-24 h-10 align-center justify-content-center">
          <h1 className=" pt-2 text-xl text-black ml-2 font-['Urbanist']">John</h1>
          <Image src={john} width={42} height={42} alt="" className="ml-2" />
        </div>
      </div>
      {/* Welcome John */}
      <div className="mt-10 ml-20 w-48 h-9  flex flex-row justify-center items-center">
        <h1 className="ml-8 font-['Urbanist'] text-2xl font-bold leading-34 tracking-normal text-left"> Welcome,</h1>
        <h1 className="text-blue-500 font-['Urbanist'] text-2xl font-bold leading-34 tracking-normal text-left"> John.</h1>
      </div>
      <div className="w-56 h-5 ml-20 ">
        <p className=" ml-8 font-['Urbanist'] text-base font-medium leading-19 tracking-normal text-gray-500">Create tasks to achieve more.</p>
      </div>
        {/* Image */}
      {createdTasks.length == 0 && <div className="flex flex-row justify-center items-center">
        <Image src={list} width={148} height={144} alt="" className="mt-20"></Image>
      </div>}
      
      <div className=" flex flex-row justify-center items-center ">
        <Sheet open={isSheetOpen} onClose={closeSheet}>
          {createdTasks.length == 0 && <SheetTrigger className="p-4 flex flex-row justify-center items-center mt-5 w-39 h-12 rounded-xl gap-3 bg-blue-500 bg-opacity-10 text-blue-500" onClick={openSheet}>+ Create Task</SheetTrigger>}
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <h2>Create Task</h2>
                <h3 className="p-4 mt-1 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Title</h3>
                <Input type="text"  placeholder="Enter text.. " onChange={(e) => {setTitle(e.target.value)}}/>

                <h3 className=" mt-3 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Description</h3>
                <Input type="text" placeholder="Enter Description.." className="w-96 h-56" onChange={(e) => {setDesc(e.target.value)}}/>
              </SheetTitle>
              <SheetDescription>
                <div>
                  <h3 className=" mt-3 font=['Urbanist'] text-sm font-medium leading-17 tracking-normal text-left text-indigo-800 w-27 h-17">Upload Screenshot</h3>
                  <div className="w-32 h-32  rounded-md border-dotted border-1 border-black flex flex-row items-center justify-center">
                    <Image src={ss} width={20} height={20} alt=""></Image>
                  </div>
                </div>
                <div className="flex flex-row justify-between align-center pt-8 w-full">
                  <Button variant="outline" className="w-[45%] h-12 font=['Urbanist'] p-5  rounded-12 border-1 border-solid  border-black gap-3 flex flex-row justify-center items-center " onClick={closeSheet}>Cancel</Button>
                  <Button variant="outline" className="w-[45%] h-12 font=['Urbanist']  p-5 rounded-12 border-1 border-solid border-black gap-3 flex flex-row justify-center items-center bg-blue-500 bg-opacity-10 text-blue-600"onClick={closeSheet} onClick={update} >+ Create Task</Button>
                </div>
                
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </div>
      <Todos ></Todos>
    </>
  );
}

