<template>
    <div class="form-group position-relative">
        <!-- Label for the input -->
        <label class="form-label " :for="name">{{ label }} <span class="text-danger">*</span></label>

        <!-- Input field -->
        <input type="text" class="form-control" autocomplete="off" role="combobox" :id="`${id}Input`" :name="name"
            :value="value" placeholder="Type to search..." @focus="showDatalist" @input="filterOptions" required>

        <!-- Datalist for options -->
        <datalist :id="`${id}List`" role="listbox" :class="zIndex">
            <!-- Options in datalist -->

            <option v-for="(opt, index) in optionsList" :key="index" :value="opt" @click="selectOption(opt)">
                {{ opt }}
            </option>
        </datalist>

        <!-- Validation feedback -->
        <div class="invalid-feedback">Please select a valid {{ label.toLocaleLowerCase() }}.</div>
    </div>
</template>

<script setup lang="ts">
import validate from '@/utils/validateInput';
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props for the component
const props = defineProps({
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    optionsList: { type: Array as () => string[], required: true },
    value: { type: String },
    zIndex: { type: String, required: true }
});

const valedator = (props.label === 'Beer') ? validate.beerName : validate.countryName;

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

const filterOptions = () => {
    currentFocus.value = -1;
    const text = (input.value?.value || '').trim().toUpperCase();
    // console.log((validate(input.value?.value || '', props.label)));
    checkValidation();
    Array.from(options.value?.options || []).forEach(option => {
        option.style.display = text.length > 0 && !option.value.toUpperCase().includes(text) ? "none" : "block";
    });
};

// Handle selection of an option
const selectOption = (option: string) => {
    if (input.value && options.value) {
        input.value?.classList.add('is-valid');
        input.value?.classList.remove('is-invalid');
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

const checkValidation = () => {
    if (!(valedator(input.value?.value || ''))) {
        input.value?.classList.remove('is-valid');
        input.value?.classList.add('is-invalid');
    } else {
        input.value?.classList.remove('is-invalid');
        input.value?.classList.add('is-valid');
    }
};
// Initialize references and add event listener on component mount
onMounted(() => {
    input.value = document.getElementById(`${props.id}Input`) as HTMLInputElement;  // Set input reference
    options.value = document.getElementById(`${props.id}List`) as HTMLDataListElement;  // Set datalist reference
    document.addEventListener('click', hideDatalist);  // Add click event listener

    if (props.value) checkValidation();

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
</style>
