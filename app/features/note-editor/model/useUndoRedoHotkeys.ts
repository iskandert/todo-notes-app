import { onBeforeUnmount, onMounted, type Ref } from 'vue';

interface UseUndoRedoHotkeysParams {
    undo: () => void;
    redo: () => void;
    canUndo: Ref<boolean>;
    canRedo: Ref<boolean>;
}

export const useUndoRedoHotkeys = ({ undo, redo, canUndo, canRedo }: UseUndoRedoHotkeysParams): void => {
    const onKeyDown = (event: KeyboardEvent): void => {
        if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z') {
            return;
        }

        event.preventDefault();
        if (event.shiftKey) {
            if (canRedo.value) {
                redo();
            }
            return;
        }

        if (canUndo.value) {
            undo();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', onKeyDown);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyDown);
    });
};
