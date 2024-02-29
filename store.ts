import create from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';

type TaskList = {
  title: string;
  description: string;
};

export const useTaskList = create(
  persist(
    (set) => ({
      createdTasks: [],
      updateTask: (title: string, description: string) => {
        set((state: any) => ({
          createdTasks: [
            ...state.createdTasks,
            {
              title: title,
              description: description,
            } as TaskList,
          ],
        }));
      },
      deleteTask: (title: string) => {
        set((state: any) => ({
          createdTasks: state.createdTasks.filter(
            (data: any) => data.title !== title
          ),
        }));
      },
    }),
    {
      name: 'taskList', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
