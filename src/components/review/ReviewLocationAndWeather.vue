<template>
  <!-- Location Input Fields -->
  <div class="col-sm-7">
    <SearchableDatalist
      id="country"
      label="Country"
      zIndex="z-2"
      :value="locationDetails.country"
      :optionsList="optionsList"
      :key="componentKey"
      :validator="validators.countryName"
    />
  </div>
  <div class="col-sm-5">
    <label for="city" class="form-label">City<span class="text-danger">*</span></label>
    <input
      type="text"
      ref="cityInputField"
      class="form-control"
      id="city"
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
          type="radio"
          id="fahrenheitRadio"
          name="temperatureUnit"
          class="form-check-input"
          value="F"
          @click="temperatureUnit = 'F'"
        />
        <label class="form-check-label" for="fahrenheitRadio">Fahrenheit</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="radio"
          id="celsiusRadio"
          name="temperatureUnit"
          class="form-check-input"
          value="C"
          @click="temperatureUnit = 'C'"
          checked
        />
        <label class="form-check-label" for="celsiusRadio">Celsius</label>
      </div>
    </div>
  </div>

  <div class="form-group col-12 col-sm-8">
    <label for="temperature" class="form-label">Enter Temperature<span class="text-danger">*</span></label>
    <input
      type="number"
      class="form-control"
      id="temperature"
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
import SearchableDatalist from '@/components/utilsComponents/SearchableDatalist.vue';
import getLocation from '@/services/locationServices';
import getCountriesList from '@/services/countriesServices';
import {validators, toggleValidationClasses } from '@/utils/validateInput';

let optionsList : string[] = [];
// Reactive references for location details, options list, and component key
const locationDetails = ref<WeatherAndLocationData>({ country: '', city: '', temperature: null });
const componentKey = ref(0);
const temperatureUnit = ref<'C' | 'F'>('C');
const temperatureInputField = ref<HTMLInputElement>();

// Fetches initial location details from the server
const fetchLocationDetails = async () => {
  try {
      const details = await getLocation();
      if (details) locationDetails.value = details;
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};

// Fetches the list of countries from the server
const fetchCountries = async () => {
  try {
    const data = await getCountriesList();

    if (data && data.countries) {
      const countries = data.countries;

      // Update optionsList with country names and flags
      optionsList = Object.values(countries).map(country => `${country.name} ${country.flag}`);
      
      // selecte cuurrent country in locationDetails.
      const currentCountry = countries[locationDetails.value.country];
      if (currentCountry) {
        locationDetails.value.country = `${currentCountry.name} ${currentCountry.flag}`;
      }
      // Force re-render of the datalist component by incrementing componentKey
      componentKey.value += 1;
    }
  } catch (error) {
    // Log error if fetching countries fails
    console.error('Error fetching countries list:', error);
  }
};

// Validate city and temperature inputs on mount
onMounted(async () => {
  await fetchLocationDetails();
  await fetchCountries();
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