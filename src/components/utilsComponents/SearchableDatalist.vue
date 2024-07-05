<template>
    <div class="form-group position-relative">
        <!-- Label for the input -->
        <label class="form-label" :for="name">{{ label }}</label>

        <!-- Input field -->
        <input autocomplete="nope" role="combobox" :id="`${id}Input`" :name="name" :value="value" class="form-control"
            :pattern="pattern" placeholder="Type to search..." @focus="showDatalist" @input="filterOptions" required>

        <!-- Datalist for options -->
        <datalist :id="`${id}List`" role="listbox" :class="zIndex">
            <!-- Options in datalist -->

            <option v-for="(opt, index) in optionsList" :key="index" :value="opt" @click="selectOption(opt)"
                class="emojiText">
                {{ opt }}
            </option>
        </datalist>

        <!-- Validation feedback -->
        <div class="invalid-feedback">Please select a valid {{ label.toLocaleLowerCase() }}.</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

// Define props for the component
const props = defineProps({
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    optionsList: { type: Array as () => string[], required: true },
    pattern: { type: String, default: "[A-Za-z]{2,}" },
    value: { type: String },
    zIndex: { type: String, required: true }
});

// Reactive references
const optionsList = ref(props.optionsList);
const input = ref<HTMLInputElement | null>(null);
const options = ref<HTMLDataListElement | null>(null);
let currentFocus = ref(-1);  // Track focus on options

// Show datalist and adjust input style
const showDatalist = () => {
    if (options.value && input.value) {
        options.value.style.display = 'block';
        input.value.style.borderRadius = "5px 5px 0 0";  // Adjust input border radius
    }
};

// Filter options based on input value
const filterOptions = () => {
    currentFocus.value = -1;  // Reset current focus
    const text = input.value?.value.toUpperCase() || '';  // Get input value
    if (options.value) {
        Array.from(options.value.options).forEach(option => {
            option.style.display = option.value.toUpperCase().includes(text) ? "block" : "none";  // Filter options visibility
        });
    }
};

// Handle selection of an option
const selectOption = (option: string) => {
    if (input.value && options.value) {
        input.value.value = option;  // Set input value to selected option
        options.value.style.display = 'none';  // Hide datalist
        input.value.style.borderRadius = "5px";  // Reset input border radius
    }
};

// TODO: Remove repatativ code
// options.value.style.display = 'none';  // Hide datalist
// input.value.style.borderRadius = "5px";  // Reset input border radius

// Hide datalist when clicking outside
const hideDatalist = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.id !== `${props.id}Input` && input.value && options.value) {
        options.value.style.display = 'none';  // Hide datalist
        input.value.style.borderRadius = "5px";  // Reset input border radius
    }
};

// Initialize references and add event listener on component mount
onMounted(() => {
    input.value = document.getElementById(`${props.id}Input`) as HTMLInputElement;  // Set input reference
    options.value = document.getElementById(`${props.id}List`) as HTMLDataListElement;  // Set datalist reference
    document.addEventListener('click', hideDatalist);  // Add click event listener
});

// Remove event listener on component unmount
onBeforeUnmount(() => {
    document.removeEventListener('click', hideDatalist);  // Remove click event listener
});
</script>

<style scoped>
/* Scoped styles for datalist */
datalist {
    position: absolute;
    background-color: #f0f0f0;
    border: 1px solid rgb(139, 139, 139);
    border-radius: 0 0 5px 5px;
    border-top: none;
    font-family: sans-serif;
    font-size: 14px;
    padding: 5px;
    min-height: 3rem;
    max-height: 10rem;
    overflow-y: auto;
    width: 100%;
}

/* Hover effect for options */
option:hover,
.active {
    background-color: rgb(129, 235, 136);
    cursor: pointer;
}

.emojiText {
    font-family: "Segoe MDL2 Assets", "Segoe UI Symbol";
}
</style>
