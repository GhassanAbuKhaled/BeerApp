<template>
  <!-- Location Input Fields -->
  <!-- Country -->
  <div class="col-sm-6" v-if="locationDetails">
    <SearchableDatalist id="country" name="country" label="Country" zIndex="z-2" :value="locationDetails.country"
      :optionsList="optionsList" :key="componentKey" />
  </div>
  <!-- City -->
  <div class="col-sm-6">
    <label for="city" class="form-label">City</label>
    <input type="text" class="form-control" id="city" name="city" v-model="locationDetails.city"
      pattern="[A-Za-z]{2,}" required />
    <div class="invalid-feedback">Please provide a valid city.</div>
  </div>

  <!-- Temperature Input -->
  <div class="form-group" style="margin-bottom: 0 !important;">
    <label for="temperatureInput">Temperature:</label>
    <div class="form-check form-check-inline ms-3">
      <input type="radio" id="fahrenheitRadio" name="temperatureUnit" class="form-check-input" value="f">
      <label class="form-check-label" for="fahrenheitRadio">Fahrenheit</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" id="celsiusRadio" name="temperatureUnit" class="form-check-input" value="C" checked>
      <label class="form-check-label" for="celsiusRadio">Celsius</label>
    </div>
  </div>

  <div class="form-group" style="margin-top: 5px">
    <label for="temperature">Enter Temperature:</label>
    <input type="number" class="form-control" id="temperature" name="temperature" v-model="locationDetails.temperature"
      required>
    <div class="invalid-feedback">Please provide a valid temperature.</div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getLocation from '@/services/locationServices';
import SearchableDatalist from '../utilsComponents/SearchableDatalist.vue';
import getCountriesList from '@/services/countriesServices';

const locationDetails = ref<WeatherAndLocationData>({
  country: '',
  city: '',
  temperature: 0,
});

const optionsList = ref<string[]>([]);
const componentKey = ref(0)

// Define a function to fetch location details
const fetchLocationDetails = async () => {
  try {
    locationDetails.value = await getLocation() as WeatherAndLocationData;
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};

const fetchCountries = async () => {
  try {
    const data = await getCountriesList();
    
    if (data) {
      optionsList.value = data.countries.map(country => `${country.name} ${country.flag}`);
      componentKey.value = componentKey.value + 1
    }
  } catch (error) {
    console.error('Error fetching countries list:', error);
  }
}

// Call the fetchLocationDetails function when the component is mounted
onMounted(() => {
   fetchLocationDetails();
   fetchCountries();
});
</script>