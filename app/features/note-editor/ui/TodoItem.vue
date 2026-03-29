<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';

const title = defineModel<string>('title', { required: true });
const done = defineModel<boolean>('done', { required: true });

const emit = defineEmits<{
    remove: [];
}>();
</script>

<template>
    <div class="todo-item">
        <Checkbox
            v-model="done"
            binary
        />

        <InputText
            v-model="title"
            class="todo-item__input"
            placeholder="Название задачи"
        />

        <Button
            class="todo-item__remove"
            icon="pi pi-delete-left"
            severity="danger"
            outlined
            aria-label="Удалить задачу"
            @click="emit('remove')"
        />
    </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as vars;

.todo-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5rem;
    align-items: center;

    &__input {
        width: 100%;
    }
}
</style>
