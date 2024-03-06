import React, { useState } from 'react';
import { useTaskList } from '@/store/store';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import ss from "../images/ss.svg"
import { close } from 'inspector';
import { useEffect } from 'react';

type TaskList = {
    title: string;
    description: string;
};

const Todos = (props: any) => {
    console.log(":::::::::::::::::::::::::::::::::::")
    const { updateTask, createdTasks, deleteTask, editTodoTasks }: any = useTaskList();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [tasks, setTasks] = useState<Array<{ title: string, desc: string }>>([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
    const [title, setTitle] = useState<string>("")
    const [desc, setDesc] = useState<string>("");

    useEffect(() => {
        console.log({ createdTasks })
    }, [createdTasks])

    const openSheet = () => {
        setIsSheetOpen(true);
    };

    const closeSheet = () => {
        setIsSheetOpen(false);
        setSelectedTaskIndex(0);
        setTitle('');
        setDesc('');
    };

    const update = () => {
        debugger
        editTodoTasks(title, desc, selectedTaskIndex);
        setSelectedTaskIndex(0);
        closeDialog();
    };

    const createTask = (): void => {
        updateTask(title, desc);
        setTitle('');
        setDesc('');
        closeSheet();
    };

    const editTasks = (index: number) => {
        setSelectedTaskIndex(index);
        setTitle(createdTasks[index].title);
        setDesc(createdTasks[index].description);
        // setopenDialog(true);
        // openSheet();
    };

    const closeDialog = () => {
        closeSheet();
    };
    return (
        <div>
            {createdTasks.length !== 0 && (
                <>
                    <h3 className='pt-5 ml-20 font-bold flex flex-row justify-center items-center'>Created Tasks</h3>
                    <p className='ml-20 text-gray-500 flex flex-row justify-center items-center'>{`You have ${createdTasks.length} task${createdTasks.length !== 1 ? 's' : ''} to do`}</p>
                    <div className="flex flex-col items-center justify-center ">
                        <Button className="flex flew-row self-center mr-20 mt-5" variant="outline" onClick={openSheet}>
                            Add More Tasks
                        </Button>
                        {createdTasks.length !== 0 && createdTasks.map((task: TaskList, index: number) => (
                            <div key={index} className='mt-5 rounded-2xl bg-opacity-100 bg-[rgba(245,247,249,1)] flex flex-col justify-center items-center h-20 w-96 relative'>
                                <div onClick={() => deleteTask(task.title)} className="absolute top-0 right-0 bg-red-500 text-white px-1 py-0.75 hover:bg-red-600 cursor-pointer">
                                    X
                                </div>
                                <Dialog >
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="bg-blue-500 text-white px-1 py-0.5 rounded-md hover:bg-blue-600 mt-5 self-start" onClick={() => { editTasks(index) }}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="title" className="text-right">
                                                    Title
                                                </Label>
                                                <Input id="title" value={title} className="col-span-3" onChange={(e) => { setTitle(e.target.value) }} />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="description" className="text-right">
                                                    Description
                                                </Label>
                                                <Input id="description" value={desc} className="col-span-3" onChange={(e) => { setDesc(e.target.value) }} />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button type="submit" onClick={update} >Save changes</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <div className=''>
                                    <p className='pl-5 flex flex-row justify-center items-center font-bold'>Title: {task.title}</p>
                                    <p className='pl-5 pb-7 flex flex-row justify-center items-center '>Description: {task.description}</p>
                                </div>
                
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
                                    {/* <Image src={ss} width={20} height={20} alt=""></Image> */}
                                </div>
                            </div>
                            <div className="flex flex-row justify-between align-center pt-8 w-full">
                                <Button variant="outline" className="w-[45%] h-12 font=['Urbanist'] p-5  rounded-12 border-1 border-solid  border-black gap-3 flex flex-row justify-center items-center " onClick={closeSheet}>Cancel</Button>
                                <Button variant="outline" className="w-[45%] h-12 font=['Urbanist']  p-5 rounded-12 border-1 border-solid border-black gap-3 flex flex-row justify-center items-center bg-blue-500 bg-opacity-10 text-blue-600" onClick={createTask} >+ Create Task</Button>
                            </div>

                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Todos;

