<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from 'primevue/inputtext';
import { useConfirm } from 'primevue/useconfirm';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import TodoItem from '~/features/note-editor/ui/TodoItem.vue';
import { useNoteForm } from '~/features/note-editor/model/useNoteForm';
import { useUndoRedoHotkeys } from '~/features/note-editor/model/useUndoRedoHotkeys';
import { useNotesStore } from '~/entities/note/model/store';

const route = useRoute();
const store = useNotesStore();
const confirm = useConfirm();
const toast = useToast();

const isCreateMode = computed(() => String(route.params.id) === 'new');
const currentId = computed(() => String(route.params.id));

const { form, todos, initForm, resetForm, addTodo, removeTodo, undo, redo, canUndo, canRedo } = useNoteForm();
useUndoRedoHotkeys({ undo, redo, canUndo, canRedo });

const pageTitle = computed(() => (isCreateMode.value ? 'Новая заметка' : 'Редактирование заметки'));

const setupForm = (): void => {
    if (isCreateMode.value) {
        resetForm();
        return;
    }

    const existingNote = store.getNoteById(currentId.value);
    if (!existingNote) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Заметка не найдена',
            life: 3000,
        });

        navigateTo('/');
        return;
    }

    initForm({
        title: existingNote.title,
        todos: structuredClone(toRaw(existingNote.todos)),
    });
};

const save = async (): Promise<void> => {
    if (isCreateMode.value) {
        store.addNote({
            title: form.value.title,
            todos: form.value.todos,
        });
    } else {
        const isUpdated = store.updateNote(currentId.value, {
            title: form.value.title,
            todos: form.value.todos,
        });

        if (!isUpdated) {
            toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не удалось сохранить заметку',
                life: 3000,
            });
            return;
        }
    }

    await navigateTo('/');
};

const cancel = (): void => {
    confirm.require({
        header: 'Выход из формы',
        message: 'Отменить изменения?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        acceptClass: 'p-button-secondary',
        accept: () => {
            navigateTo('/');
        },
    });
};

const deleteNote = async (): Promise<void> => {
    if (isCreateMode.value) {
        return;
    }

    confirm.require({
        header: 'Удаление заметки',
        message: 'Удалить заметку?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Удалить',
        rejectLabel: 'Отмена',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-secondary',
        accept: async () => {
            store.deleteNote(currentId.value);
            await navigateTo('/');
        },
    });
};

watch(() => route.params.id, setupForm, { immediate: true });
</script>

<template>
    <main class="note-editor">
        <ConfirmDialog />
        <Toast />

        <header class="note-editor__header">
            <h1>{{ pageTitle }}</h1>
            <div class="note-editor__history-actions">
                <Button
                    label="Отменить"
                    icon="pi pi-undo"
                    severity="secondary"
                    text
                    :disabled="!canUndo"
                    @click="undo"
                />
                <Button
                    label="Повторить"
                    icon="pi pi-undo"
                    severity="secondary"
                    text
                    class="note-editor__redo-btn"
                    :disabled="!canRedo"
                    @click="redo"
                />
            </div>
        </header>

        <section class="note-editor__content">
            <Card>
                <template #content>
                    <div class="note-editor__fields">
                        <label
                            class="note-editor__label"
                            for="note-title"
                            >Название</label
                        >
                        <InputText
                            id="note-title"
                            v-model="form.title"
                            placeholder="Введите название заметки"
                        />

                        <h2 class="note-editor__todos-title">Задачи</h2>

                        <div class="note-editor__todos">
                            <TodoItem
                                v-for="todo in todos"
                                :key="todo.id"
                                v-model:title="todo.title"
                                v-model:done="todo.done"
                                @remove="removeTodo(todo.id)"
                            />
                        </div>
                        <Button
                            label="Добавить задачу"
                            icon="pi pi-plus"
                            text
                            class="note-editor__add-todo"
                            @click="addTodo"
                        />
                    </div>
                </template>

                <template #footer>
                    <div class="note-editor__actions">
                        <Button
                            label="Сохранить"
                            icon="pi pi-check"
                            @click="save"
                        />
                        <Button
                            label="Отменить"
                            icon="pi pi-times"
                            severity="secondary"
                            outlined
                            @click="cancel"
                        />
                        <Button
                            v-if="!isCreateMode"
                            label="Удалить заметку"
                            icon="pi pi-trash"
                            severity="danger"
                            class="note-editor__delete-btn"
                            @click="deleteNote"
                        />
                    </div>
                </template>
            </Card>
        </section>
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as vars;

.note-editor {
    max-width: 1080px;
    margin: 0 auto;
    padding: 1rem;
    display: grid;
    gap: 1rem;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;

        h1 {
            margin: 0;
        }
    }

    &__redo-btn {
        :deep(.p-button-icon) {
            transform: scaleX(-1);
        }
    }

    &__history-actions {
        display: flex;
        gap: 0.5rem;
    }

    &__fields {
        display: grid;
        gap: 0.75rem;
    }

    &__label {
        font-weight: 600;
    }

    &__todos-title {
        margin: 0;
        font-size: 1rem;
    }

    &__todos {
        display: grid;
        gap: 0.5rem;
    }

    &__add-todo {
        justify-self: start;
    }

    &__actions {
        margin-top: 0.5rem;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    &__delete-btn {
        margin-left: auto;
    }

    @media (max-width: vars.$breakpoint-sm) {
        &__header {
            flex-direction: column;
            align-items: stretch;

            h1 {
                font-size: 1.25rem;
            }
        }

        &__content {
            margin: 0 -1rem;
        }

        &__history-actions {
            justify-content: flex-end;
        }

        &__actions {
            margin-top: 1.5rem;
            display: grid;
            grid-template-columns: 1fr;
        }

        &__delete-btn {
            margin-left: 0;
        }
    }
}
</style>
