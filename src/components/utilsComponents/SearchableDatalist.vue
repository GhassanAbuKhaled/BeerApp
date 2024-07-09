<template>
  <div class="form-group position-relative">
    <!-- Label for the input -->
    <label class="form-label" :for="name+label">{{ label }}<span class="text-danger">*</span></label>
    <!-- Input field -->
    <input type="text"
           class="form-control"
           autocomplete="off"
           role="combobox"
           :id="name+label"
           :name="name"
           :data-review-info="name"
           ref="textInputField"
           placeholder="Type to search..."
           @click="dataListDisplay('block')"
           @input="debouncedFilterOptions"
           aria-expanded="false"
           required 
    >
    <!-- Datalist for options -->
    <div :id="`${name}-dataList`" :class="[zIndex, 'datalist border rounded-bottom border-light']" ref="dataListElement">
      <!-- Options in datalist -->
      <div v-for="(opt, index) in optionsList"
              class="option p-1"
              :key="index"
              :value="opt"
              @click="selectOption(opt)"
              v-show="opt.toUpperCase().includes(filteredText)">
              {{ opt  }} 
      </div>
    </div>
    <!-- Validation feedback -->
    <div class="invalid-feedback">
      Please select a valid {{ props.label.toLowerCase() }}.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, PropType } from 'vue';
import { toggleValidationClasses, validators } from '@/utils/validateInput';

// Define props for the component
const props = defineProps({
  name: {
      type: String, 
      required: true, 
      validator: (value: string) => validators.withSpacesRegex(value)
  },
  label: { type: String, required: true },
  optionsList: { type: Array as () => string[], required: true },
  value: { type: String },
  zIndex: { type: String, required: true },
  validationFun: Function as PropType<(input: string) => boolean>,
});

// Reactive references
const optionsList = ref(props.optionsList);
const textInputField = ref<HTMLInputElement>();
const dataListElement = ref<HTMLDataListElement>();
const filteredText = ref('');

// Debounce timeout reference
let debounceTimeout: number;
// Display the datalist
const dataListDisplay = (display: string) => {
  const list = dataListElement.value;
  if (list) list.style.display = display;
};

// Debounced filter options
const debouncedFilterOptions = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    filterOptions();
  }, 200); // 200ms debounce time
};

// Filter options based on input text
const filterOptions = () => {
  const text = textInputField.value?.value.trim().toUpperCase() || '';
  filteredText.value = text;
  checkValidation();
};

// Handle selection of an option
const selectOption = (option: string) => {
  const input = textInputField.value;
  if (input) {
    toggleValidationClasses(true, input); // it is a valid option because it is from the list
    input.value = option;  // Set input value to selected option
  }
};

// Validate input value
const checkValidation = () => {
  const input = textInputField.value;
  if (input && props.validationFun) {
    const isValid = props.validationFun(input.value);
    toggleValidationClasses(isValid, input);
  }
};

// Hide datalist and reset input style
const hideDatalist = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const inputFiedId = props.name + props.label;
  if (element.id != inputFiedId) dataListDisplay('none');
};

// Event listeners
onMounted(() => {
  document.addEventListener('click', hideDatalist);
  if(props.value && textInputField.value){
    textInputField.value.value = props.value
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', hideDatalist);
});
</script>
 
<style scoped>
/* Scoped styles for datalist */
.datalist {
  position: absolute;
  background-color: #f0f0f0;
  font-family: sans-serif;
  font-size: 14px;
  padding: 5px;
  min-height: 3rem;
  max-height: 10rem;
  overflow-y: auto;
  width: 100%;
  display: none;
}
.datalist:hover{
  cursor: pointer;
}
/* Hover effect for options */
.option:hover,
.active {
  background-color: rgb(129, 235, 136);
  cursor: pointer;
}
</style>