import { useRefHistory } from '@vueuse/core';
import { computed, nextTick, ref, toRaw } from 'vue';

import { createTodoId } from '~/shared/lib/id';

import type { NoteForm } from '~/features/note-editor/model/types';
import type { Todo } from '~/entities/note/model/types';

const createEmptyTodo = (): Todo => ({
    id: createTodoId(),
    title: '',
    done: false,
});

const createEmptyForm = (): NoteForm => ({
    title: '',
    todos: [],
});

export const useNoteForm = () => {
    const form = ref<NoteForm>(createEmptyForm());

    const { undo, redo, canUndo, canRedo, clear } = useRefHistory(form, {
        deep: true,
        clone: value => structuredClone(toRaw(value)),
    });

    const todos = computed(() => form.value.todos);

    const todoIndexesById = computed(() =>
        form.value.todos.reduce(
            (acc, todo, index) => {
                acc[todo.id] = index;
                return acc;
            },
            {} as Record<string, number>,
        ),
    );

    const initForm = (value: NoteForm): void => {
        form.value = structuredClone(toRaw(value));
        clearHistory();
    };

    const resetForm = (): void => {
        form.value = createEmptyForm();
        clearHistory();
    };

    const addTodo = (): void => {
        form.value.todos.push(createEmptyTodo());
    };

    const removeTodo = (id: string): void => {
        const index = todoIndexesById.value[id];
        if (index !== undefined) {
            form.value.todos.splice(index, 1);
        }
    };

    const clearHistory = () => {
        nextTick(() => {
            // useRefHistory works in flush:pre mode, so we need to wait for the changes to be applied
            clear();
        });
    };

    return {
        form,
        todos,
        initForm,
        resetForm,
        addTodo,
        removeTodo,
        undo,
        redo,
        canUndo,
        canRedo,
    };
};
