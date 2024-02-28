import { create } from 'zustand'

type TaskList = {
    title: string,
    description: string
}

export const useTaskList = create((set) => ({
    createdTasks: [],
    updateTask: (title: string, description: string) => {
        set((state: any) => ({
          createdTasks: [
            ...state.createdTasks,
            {
              title: title,
              description: description
            } as TaskList,
          ],
        }));

    },
    deleteTask : (title: string) => {
        set((state: any) => ({
          createdTasks: state.createdTasks.filter((data: any) => {
                data.title !== title
          }), 
        }));

        
    }
   
}))
