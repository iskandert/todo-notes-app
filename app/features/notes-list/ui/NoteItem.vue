<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';

import type { Note } from '~/entities/note/model/types';

const props = defineProps<{
    note: Note;
}>();

const emit = defineEmits<{
    edit: [id: string];
    delete: [id: string];
}>();

const previewTodos = computed(() => props.note.todos.slice(0, 3));
const remainingCount = computed(() => Math.max(0, props.note.todos.length - 3));
const footerLabel = computed<string | null>(() => {
    if (props.note.todos.length === 0) return 'Задач пока нет';
    if (remainingCount.value > 0) return `Ещё задач: ${remainingCount.value}`;
    return null;
});
</script>

<template>
    <Card class="note-item">
        <template #title>
            {{ note.title || 'Без названия' }}
        </template>

        <template #content>
            <ul
                v-if="previewTodos.length"
                class="note-item__todos"
            >
                <li
                    v-for="todo in previewTodos"
                    :key="todo.id"
                    class="note-item__todo"
                >
                    <Checkbox
                        :model-value="todo.done"
                        binary
                        disabled
                        class="note-item__checkbox"
                    />
                    <span :class="{ done: todo.done, empty: !todo.title }">
                        {{ todo.title || 'Без названия задачи' }}
                    </span>
                </li>
            </ul>

            <p
                v-if="footerLabel"
                class="note-item__meta"
            >
                {{ footerLabel }}
            </p>
        </template>

        <template #footer>
            <div class="note-item__actions">
                <Button
                    label="Редактировать"
                    icon="pi pi-pencil"
                    severity="secondary"
                    @click="emit('edit', note.id)"
                />
                <Button
                    label="Удалить"
                    icon="pi pi-trash"
                    severity="danger"
                    outlined
                    @click="emit('delete', note.id)"
                />
            </div>
        </template>
    </Card>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as vars;

.note-item {
    :deep(.p-card-title) {
        font-weight: bold;
    }

    :deep(.p-card-body),
    :deep(.p-card-footer) {
        flex-grow: 1;
    }

    &__todos {
        margin: 0.5rem 0 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 0.35rem;
    }

    &__todo {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        .done {
            text-decoration: line-through;
            color: var(--p-surface-400);
        }

        .empty {
            color: var(--p-surface-400);
        }
    }

    &__checkbox {
        --p-checkbox-width: 14px;
        --p-checkbox-height: 14px;
        --p-checkbox-border-radius: 3px;
        --p-checkbox-icon-size: 10px;
    }

    &__meta {
        margin: 0.5rem 0 0;
        color: var(--p-text-muted-color);
        font-size: 0.875rem;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 0.5rem;
        height: 100%;
        margin-top: 0.5rem;
    }
}
</style>
