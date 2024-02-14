"use client";

import { Status, Task } from "@/config/types/task";
import { status } from "@/constants";
import React, { useEffect, useMemo } from "react";
import TaskComponent from "./Task";
import { useTaskStore } from "@/lib/store";

const mockTasks: Task[] = [
	{
		id: "1",
		title: "first task",
		desc: "descriptions",
		status: status.TODO as Status,
	},
];

const Column = ({ title, status }: { title: string; status: Status }) => {
	const tasks = useTaskStore((state) => state.tasks);
	const updateTask = useTaskStore((state) => state.updateTask);
	const draggedTaskId = useTaskStore((state) => state.draggedTask);
	const dragTask = useTaskStore((state) => state.dragTask);

	const handleTaskDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (!draggedTaskId) return;

		updateTask(draggedTaskId, status);
		dragTask(null);
	};

	const filteredTasks = useMemo(() => tasks.filter((task) => task.status === status), [tasks, status]);

	useEffect(() => {
		useTaskStore.persist.rehydrate();
	}, []);

	return (
		<div className="h-[600px] flex-1 px-2">
			<h2 className="ml-1 text-white text-2xl">{title}</h2>

			<div onDrop={handleTaskDrop} onDragOver={(e) => e.preventDefault()} className="mt-4 px-2 py-3 h-full flex-1 rounded-xl bg-gray-700/50">
				<div className="flex flex-col gap-4">
					{filteredTasks.map((task: Task) => (
						<TaskComponent key={task.id as string} {...task} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Column;
