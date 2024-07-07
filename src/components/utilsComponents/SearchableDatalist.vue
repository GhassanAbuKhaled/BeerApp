<template>
    <div class="form-group position-relative">
      <!-- Label for the input -->
      <label class="form-label" :for="name">{{ label }} <span class="text-danger">*</span></label>
  
      <!-- Input field -->
      <input type="text"
             class="form-control"
             autocomplete="off"
             role="combobox"
             :id="`${props.id}Input`"
             :name="name"
             ref="textInputField"
             :value="value"
             placeholder="Type to search..."
             @focus="showDatalist"
             @input="filterOptions"
             required
             :style="inputStyle">
  
      <!-- Datalist for options -->
      <datalist :id="`${props.id}List`"
                role="listbox"
                :class="zIndex"
                ref="dataListElement">
        <!-- Options in datalist -->
        <option v-for="(opt, index) in optionsList"
                :key="index"
                :value="opt"
                @click="selectOption(opt)">
          {{ opt }}
        </option>
      </datalist>
  
      <!-- Validation feedback -->
      <div class="invalid-feedback">
        Please select a valid {{ label.toLowerCase() }}.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { classValidToggle } from '@/utils/validateInput';
  import { ref, onMounted, onBeforeUnmount, computed, PropType } from 'vue';
  
  // Define props for the component
  const props = defineProps({
    id: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    optionsList: { type: Array as () => string[], required: true },
    value: { type: String },
    zIndex: { type: String, required: true },
    validator: Function as PropType<(input: string) => boolean>,
  });
  
  // Reactive references
  const optionsList = ref(props.optionsList);
  const textInputField = ref<HTMLInputElement>();
  const dataListElement = ref<HTMLDataListElement>();
  
  // Show datalist and adjust input style
  const showDatalist = () => {
    if (dataListElement.value && textInputField.value) {
        dataListElement.value.style.display = 'block';
    }
  };
  
  // Hide datalist and reset input style
  const hideDatalist = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (element.id !== `${props.id}Input` && textInputField.value && dataListElement.value) {
        dataListElement.value.style.display = 'none';
      textInputField.value.style.borderRadius = "5px";
    }
  };
  
  // Filter options based on input text
  const filterOptions = () => {
    const text = (textInputField.value?.value || '').trim().toUpperCase();
    checkValidation();
    Array.from(dataListElement.value?.options || []).forEach(option => {
      option.style.display = text.length > 0 && !option.value.toUpperCase().includes(text) ? "none" : "block";
    });
  };
  
  // Handle selection of an option
  const selectOption = (option: string) => {
    if (textInputField.value && dataListElement.value) {
      classValidToggle(true, textInputField.value);
      textInputField.value.value = option;  // Set input value to selected option
      dataListElement.value.style.display = 'none';  // Hide datalist
      textInputField.value.style.borderRadius = "5px";  // Reset input border radius
    }
  };
  
  // Validate input value
  const checkValidation = () => {
    if (textInputField.value && props.validator) {
      const isValid = props.validator(textInputField.value.value);
      classValidToggle(isValid, textInputField.value);
    }
  };
  
  // Adjust input style based on datalist display
  const inputStyle = computed(() => ({
    borderRadius: dataListElement.value && dataListElement.value.style.display === 'block' ? "5px 5px 0 0" : "5px"
  }));
  
  // Event listeners
  onMounted(() => {
    document.addEventListener('click', hideDatalist);
    if (props.validator && props.value) checkValidation();
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', hideDatalist);
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
  