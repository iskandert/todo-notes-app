export interface Todo {
    id: string;
    title: string;
    done: boolean;
}

export interface Note {
    id: string;
    title: string;
    todos: Todo[];
}

export interface TodoInput {
    id?: string;
    title: string;
    done: boolean;
}

export interface NoteInput {
    id?: string;
    title: string;
    todos: TodoInput[];
}
