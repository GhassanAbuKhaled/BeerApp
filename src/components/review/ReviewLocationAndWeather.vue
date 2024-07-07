<template>
  <!-- Location Input Fields -->
  <div class="col-sm-7">
    <SearchableDatalist
      id="country"
      name="country"
      label="Country"
      zIndex="z-2"
      :value="locationDetails.country"
      :optionsList="optionsList"
      :key="componentKey"
      :validator="validators.countryName"
    />
  </div>
  <div class="col-sm-5">
    <label for="city" class="form-label">City <span class="text-danger">*</span></label>
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
    <div class="form-check form-check-inline ms-2">
      <input
        type="radio"
        id="fahrenheitRadio"
        name="temperatureUnit"
        class="form-check-input"
        value="F"
        @change="temperatureUnit = 'F'"
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
        @change="temperatureUnit = 'C'"
        checked
      />
      <label class="form-check-label" for="celsiusRadio">Celsius</label>
    </div>
  </div>

  <div class="form-group">
    <label for="temperature" class="form-label">Enter Temperature <span class="text-danger">*</span></label>
    <input
      type="number"
      class="form-control"
      id="temperature"
      name="temperature"
      ref="temperatureInputField"
      :min="temperatureRange.min"
      :max="temperatureRange.max"
      v-model="locationDetails.temperature"
      @input="validateTemperature"
      step="0.5"
      required
    />
    <div class="invalid-feedback">Please provide a valid temperature.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import SearchableDatalist from '@/components/utilsComponents/SearchableDatalist.vue';
import getLocation from '@/services/locationServices';
import getCountriesList from '@/services/countriesServices';
import {validators, classValidToggle } from '@/utils/validateInput';

// Reactive references for location details, options list, and component key
const locationDetails = ref({ country: '', city: '', temperature: 0 });
const optionsList = ref<string[]>([]);
const componentKey = ref(0);
const temperatureUnit = ref('C');

// Refs for city and temperature input fields
const cityInputField = ref<HTMLInputElement>();
const temperatureInputField = ref<HTMLInputElement>();

// Fetches initial location details from the server
const fetchLocationDetails = async () => {
  try {
      const details = await getLocation();
      if (details) {
        locationDetails.value = details;
        validateCity();
        validateTemperature();
    }
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};

// Fetches the list of countries from the server
const fetchCountries = async () => {
  try {
    const data = await getCountriesList();
    if (data) {
      optionsList.value = Object.values(data.countries).map(country => `${country.name} ${country.flag}`);
      const currentCountry = data.countries[locationDetails.value.country];
      if (currentCountry) locationDetails.value.country = `${currentCountry.name} ${currentCountry.flag}`;
      componentKey.value += 1; // Force re-render of the datalist component
    }
  } catch (error) {
    console.error('Error fetching countries list:', error);
  }
};

// Validate city and temperature inputs on mount
onMounted(async () => {
  await fetchLocationDetails();
  await fetchCountries();
});

// Validates the city input field
const validateCity = () => {
  if (cityInputField.value) {
    const isValid = validators.cityName(cityInputField.value.value);
    classValidToggle(isValid, cityInputField.value);
  }
};

// Computes the temperature range based on the selected unit
const temperatureRange = computed(() => ({
  min: temperatureUnit.value === 'C' ? -70 : -100,
  max: temperatureUnit.value === 'C' ? 70 : 160,
}));

// Validates the temperature input field
const validateTemperature = () => {
  if (temperatureInputField.value) {
    const temperatureValue = parseFloat(temperatureInputField.value.value);
    const isValid = temperatureValue >= temperatureRange.value.min && temperatureValue <= temperatureRange.value.max;
    classValidToggle(isValid, temperatureInputField.value);
  }
};

// Watch for changes in temperature unit and revalidate temperature input
watch(temperatureUnit, validateTemperature);
</script>
