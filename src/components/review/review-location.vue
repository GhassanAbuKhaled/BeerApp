<template>
  <!-- Location Input Fields -->
  <div class="col-sm-7">
    <SearchableDatalist
      name="country"
      label="Country"
      zIndex="z-2"
      :value="countriesList[locationDetails.countryCode]"
      :optionsList="Object.values(countriesList)"
      :key="componentKey"
      :validationFun="validators.countryName"
    />
  </div>
  <div class="col-sm-5">
    <label for="cityName" class="form-label">City<span class="text-danger">*</span></label>
    <input
      type="text"
      ref="cityInputField"
      class="form-control"
      id="cityName"
      name="city"
      v-model="locationDetails.city"
      autocomplete="off"
      @input="validateCity"
      required
    />
    <div class="invalid-feedback">Please provide a valid city.</div>
  </div>

  <!-- Temperature Input -->
  <div class="form-group">
    <label for="temperatureInput">Temperature:</label>
    <div class="temperature-unit d-inline-block ms-2">

      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          id="fahrenheitRadio"
          type="radio"
          name="temperatureUnit"
          value="F"
          @click="temperatureUnit = 'F'"
        />
        <label class="form-check-label" for="fahrenheitRadio">Fahrenheit</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          id="celsiusRadio"
          type="radio"
          name="temperatureUnit"
          value="C"
          @click="temperatureUnit = 'C'"
          checked
        />
        <label class="form-check-label" for="celsiusRadio">Celsius</label>
      </div>
    </div>
  </div>

  <div class="form-group col-12 col-sm-8">
    <label for="temperatureValue" class="form-label">Enter Temperature<span class="text-danger">*</span></label>
    <input
      type="number"
      class="form-control"
      id="temperatureValue"
      name="temperature"
      ref="temperatureInputField"
      v-model="locationDetails.temperature"
      @input="validateTemperature"
      step="0.5"
      required
    />
    <div class="invalid-feedback">Please provide a valid temperature.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SearchableDatalist from '@/components/utilsComponents/searchable-datalist.vue';
import getLocation from '@/services/locationServices';
import {validators, toggleValidationClasses , countriesList} from '@/utils/validateInput';

// Reactive references for location details, options list, and component key
const locationDetails = ref<WeatherAndLocationData>({ countryCode: '', city: '', temperature: null });
const componentKey = ref(0);
const temperatureUnit = ref<'C' | 'F'>('C');
const temperatureInputField = ref<HTMLInputElement>();

// Fetches initial location details from the server
const fetchLocationDetails = async () => {
  try {
      const data = await getLocation();
      if (data) {
        locationDetails.value = data;
          // Force re-render of the datalist component by incrementing componentKey
        componentKey.value += 1;
      }
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};

// Validate city and temperature inputs on mount
onMounted(async () => {
  await fetchLocationDetails();
});

// Validates the city input field
const validateCity = (event: Event) =>{
  if(event){
    const input = event.target as HTMLInputElement;
    toggleValidationClasses(validators.cityName(input.value), input);
  }
};

// Validates the temperature input field
const validateTemperature = () => {
 const input =  temperatureInputField.value;
  if (input) {
   const isValid = validators.temperature(temperatureUnit.value, parseFloat(input.value));
   toggleValidationClasses(isValid, input );
  }
};

// Watch for changes in temperature unit and revalidate temperature input
watch(temperatureUnit, validateTemperature)

</script>

<style scoped>
.temperature-unit{
  width: 100%;
  margin-top: 8px;
}
@media (min-width: 390px) {
  .temperature-unit{
    width: auto ;
    margin-top: 0;
  }
}
</style>