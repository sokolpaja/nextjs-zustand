"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTaskStore } from "@/lib/store";

const AddNewTodo = () => {
	const addTask = useTaskStore((state) => state.addTask);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);

		const { title, description } = Object.fromEntries(formData);

		if (typeof title !== "string" || typeof description !== "string") return;

		addTask(title, description);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline"> + Add Task</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Task</DialogTitle>
				</DialogHeader>
				<form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Title
							</Label>
							<Input id="title" name="title" placeholder="task title..." className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Desc
							</Label>
							<Textarea id="description" name="description" placeholder="description" className="col-span-3" />
						</div>
					</div>
				</form>
				<DialogFooter>
					<DialogTrigger asChild>
						<Button type="submit" size="sm" form="todo-form">
							Add Todo
						</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default AddNewTodo;
