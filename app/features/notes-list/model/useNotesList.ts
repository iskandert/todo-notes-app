import { computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { useNotesStore } from '~/entities/note/model/store';

export const useNotesList = () => {
    const store = useNotesStore();
    const confirm = useConfirm();

    const notes = computed(() => store.allNotes);

    const confirmDelete = (id: string): void => {
        confirm.require({
            header: 'Удаление заметки',
            message: 'Вы уверены, что хотите удалить эту заметку?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Удалить',
            rejectLabel: 'Отмена',
            acceptClass: 'p-button-danger',
            accept: () => {
                store.deleteNote(id);
            },
        });
    };

    const openEditForm = async (id: string): Promise<void> => {
        await navigateTo(`/notes/${id}`);
    };

    const openCreateForm = async (): Promise<void> => {
        await navigateTo('/notes/new');
    };

    return {
        notes,
        confirmDelete,
        openEditForm,
        openCreateForm,
    };
};
