import { Status, Task } from "@/config/types/task";
import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist, createJSONStorage } from "zustand/middleware";

export type State = {
	tasks: Task[];
	draggedTask: string | null;
};

export type Actions = {
	addTask: (title: string, desc?: string) => void;
	removeTask: (id: string) => void;
	dragTask: (id: string | null) => void;
	updateTask: (id: string, status: Status) => void;
};

export const useTaskStore = create<State & Actions>()(
	persist(
		(set) => ({
			tasks: [],
			addTask: (title: string, desc?: string) =>
				set((state) => ({
					tasks: [
						...state.tasks,
						{
							id: uuid(),
							title,
							desc,
							status: "todo",
						},
					],
				})),
			removeTask: (id: string) =>
				set((state) => ({
					tasks: state.tasks.filter((task) => task.id !== id),
				})),
			updateTask: (id: string, status: Status) =>
				set((state) => ({
					tasks: state.tasks.map((task) => {
						if (task.id === id) {
							return {
								...task,
								status,
							};
						} else {
							return task;
						}
					}),
				})),
			draggedTask: null,
			dragTask: (id: string | null) => set({ draggedTask: id }),
		}),
		{
			name: "tasks", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage),
			skipHydration: true,
		}
	)
);
