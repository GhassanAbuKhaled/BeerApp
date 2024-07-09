<template>
    <div class="form-group">
    <label :for="id" class="form-label">
        {{ label }}
    </label>
    <textarea
        class="form-control"
        :placeholder="placeholder"
        :id="id"
        style="height: 100px;"
        @input="autoResize"
    ></textarea>
    </div>
</template>

<script setup lang="ts">
import { validators } from '@/utils/validateInput';

defineProps({
    id: {
    type: String,
    required: true,
    validator(value: string) {
        return validators.withSpacesRegex(value);
    },
    },
    label: { type: String, required: true },
    placeholder: { type: String, default: 'type..' },
});

const maxTextAreaHeight = 250;

const autoResize = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    if (textarea.scrollHeight > maxTextAreaHeight) {
        textarea.style.height = `${maxTextAreaHeight}px`;
        textarea.style.overflowY = 'auto'; // Enable vertical scrollbar when max height is reached
    } else {
        textarea.style.overflowY = 'hidden'; // Hide vertical scrollbar if max height is not reached
    }
    }
};
</script>

<style scoped>
textarea {
    overflow: hidden; 
    resize: none; 
}
</style>
