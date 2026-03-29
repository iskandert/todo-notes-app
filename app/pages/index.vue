<script setup lang="ts">
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import NoteItem from '~/features/notes-list/ui/NoteItem.vue';
import { useNotesList } from '~/features/notes-list/model/useNotesList';

const { notes, confirmDelete, openEditForm, openCreateForm } = useNotesList();
</script>

<template>
    <main class="notes-page">
        <ConfirmDialog />

        <header class="notes-page__header">
            <h1>Мои заметки</h1>
            <Button
                class="notes-page__create-btn"
                label="Создать заметку"
                icon="pi pi-plus"
                @click="openCreateForm"
            />
        </header>

        <section
            v-if="notes.length"
            class="notes-page__list"
        >
            <NoteItem
                v-for="note in notes"
                :key="note.id"
                :note="note"
                @edit="openEditForm"
                @delete="confirmDelete"
            />
        </section>
        <p
            v-else
            class="notes-page__empty"
        >
            Пока нет заметок. Создайте первую.
        </p>

        <Button
            class="notes-page__fab"
            icon="pi pi-plus"
            rounded
            size="large"
            aria-label="Создать заметку"
            @click="openCreateForm"
        />
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as vars;

.notes-page {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 1rem 1rem;
    display: grid;
    gap: 1rem;

    &__header {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0;
        background: var(--app-bg-color);
        backdrop-filter: blur(8px);

        h1 {
            margin: 0;
        }
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 0.75rem;
    }

    &__empty {
        margin: 0;
        color: var(--text-color-secondary);
    }

    &__fab {
        display: none;
    }

    @media (max-width: vars.$breakpoint-sm) {
        padding-bottom: 7rem;

        &__header {
            background: linear-gradient(to bottom, var(--app-bg-color), transparent);
            margin: 0 -1rem;
            padding: 0.75rem 1rem;

            h1 {
                font-size: 1.25rem;
            }
        }

        &__list {
            margin: 0 -1rem;
        }

        &__create-btn {
            display: none;
        }

        &__fab {
            display: block;
            position: fixed;
            right: 1rem;
            bottom: 3rem;
            z-index: 20;
            line-height: 1.7;
        }
    }
}
</style>
