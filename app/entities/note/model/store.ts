import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { createNoteId, createTodoId } from '~/shared/lib/id';

import type { Note, NoteInput, Todo, TodoInput } from './types';

const getNormalizedTodo = (todo: TodoInput): Todo => ({
    id: todo.id?.trim() || createTodoId(),
    title: todo.title.trim(),
    done: todo.done,
});

const getNormalizedNote = (input: NoteInput): Note => ({
    id: input.id?.trim() || createNoteId(),
    title: input.title.trim(),
    todos: input.todos.map(getNormalizedTodo),
});

export const useNotesStore = defineStore(
    'notes',
    () => {
        const notes = ref<Note[]>([]);

        const allNotes = computed(() => notes.value);
        const notesById = computed(() =>
            notes.value.reduce(
                (acc, note) => {
                    acc[note.id] = note;
                    return acc;
                },
                {} as Record<string, Note>,
            ),
        );

        const getNoteById = (id: string): Note | undefined => notesById.value[id];

        const addNote = (input: NoteInput): void => {
            const newNote = getNormalizedNote({
                ...input,
                id: input.id?.trim() && input.id !== 'new' ? input.id : undefined,
            });
            notes.value.push(newNote);
        };

        const updateNote = (id: string, input: NoteInput): boolean => {
            const noteIndex = notes.value.findIndex(note => note.id === id);
            if (noteIndex === -1) {
                return false;
            }

            const updatedNote = getNormalizedNote({
                ...input,
                id,
            });
            notes.value[noteIndex] = updatedNote;
            return true;
        };

        const deleteNote = (id: string): boolean => {
            const noteIndex = notes.value.findIndex(note => note.id === id);
            if (noteIndex === -1) {
                return false;
            }

            notes.value.splice(noteIndex, 1);
            return true;
        };

        return {
            notes,
            allNotes,
            getNoteById,
            addNote,
            updateNote,
            deleteNote,
        };
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    },
);
