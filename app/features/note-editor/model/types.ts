import type { Todo } from '~/entities/note/model/types';

export interface NoteForm {
    title: string;
    todos: Todo[];
}
