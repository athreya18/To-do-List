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
      editTodoTasks: (title: string, description: string, index: number) => {
        set((state: any) => ({
          createdTasks:  state.createdTasks.map((task: any, i: number) =>
          index === i
            ? ({ ...state.createdTasks, title: title, description: description } as TaskList)
            : task
        ),
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
