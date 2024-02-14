export type Task = {
	id: string;
	title: string;
	desc?: string;
	status: Status;
};

export type Status = "todo" | "in-progress" | "done";
