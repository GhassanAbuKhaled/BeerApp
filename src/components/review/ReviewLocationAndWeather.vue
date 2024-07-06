<template>
  <!-- Location Input Fields -->
  <!-- Country -->
  <div class="col-sm-7">
    <SearchableDatalist id="country" name="country" label="Country" zIndex="z-2" :value="locationDetails.country"
      :optionsList="optionsList" :key="componentKey" />
  </div>
  <!-- City -->
  <div class="col-sm-5">
    <label for="city" class="form-label">City <span class="text-danger">*</span></label>
    <input type="text" ref="cityInput" class="form-control" id="city" name="city" :value="locationDetails.city"
      autocomplete="off" @input="checkValidation" required />
    <div class="invalid-feedback">Please provide a valid city.</div>
  </div>

  <!-- Temperature Input -->

  <div class="form-group">
    <label for="temperatureInput">Temperature:</label>
    <div class="form-check form-check-inline ms-3">
      <input type="radio" id="fahrenheitRadio" name="temperatureUnit" class="form-check-input" value="F"
        @change="temperatureUnit = 'F'">
      <label class="form-check-label" for="fahrenheitRadio">Fahrenheit</label>
    </div>
    <div class="form-check form-check-inline">
      <input type="radio" id="celsiusRadio" name="temperatureUnit" class="form-check-input" value="C"
        @change="temperatureUnit = 'C'" checked>
      <label class="form-check-label" for="celsiusRadio">Celsius</label>
    </div>
  </div>

  <div class="form-group">
    <label for="temperature" class="form-label">Enter Temperature <span class="text-danger">*</span></label>
    <input type="number" class="form-control" id="temperature" name="temperature" :min="minTemperature"
      :max="maxTemperature" v-model="locationDetails.temperature" required>
    <div class="invalid-feedback">Please provide a valid temperature.</div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SearchableDatalist from '@/components/utilsComponents/SearchableDatalist.vue';
import getLocation from '@/services/locationServices';
import getCountriesList from '@/services/countriesServices';
import validate from '@/utils/validateInput';

const locationDetails = ref<WeatherAndLocationData>({
  country: '',
  city: '',
  temperature: 0,
});

const optionsList = ref<string[]>([]);
const componentKey = ref(0);
const temperatureUnit = ref('C');
const cityInput = ref<HTMLInputElement | null>(null)

// Fetch location details
const fetchLocationDetails = async () => {
  try {
    locationDetails.value = await getLocation() || locationDetails.value;
  } catch (error) {
    console.error('Error fetching location details:', error);
  }
};

// Fetch countries list
const fetchCountries = async () => {
  try {
    const data = await getCountriesList();

    if (data) {
      optionsList.value = Object.entries(data.countries).map(([, country]) => {
        return `${country.name} ${country.flag}`;
      });
      const currentCountry = data.countries[locationDetails.value.country];
      locationDetails.value.country = `${currentCountry.name} ${currentCountry.flag}` || '';

      componentKey.value += 1;
      checkValidation();

    }
  } catch (error) {
    console.error('Error fetching countries list:', error);
  }
};

// Call fetch functions on component mount
onMounted(async () => {
  await fetchLocationDetails();
  await fetchCountries();
});

// Computed properties for temperature input attributes
const minTemperature = computed(() => {
  return temperatureUnit.value === 'C' ? -70 : -100;
});

const maxTemperature = computed(() => {
  return temperatureUnit.value === 'C' ? 70 : 160;
});

const checkValidation = () => {
  if (cityInput.value) {
    if (!validate.cityName(cityInput.value.value)) {
      cityInput.value?.classList.remove('is-valid');
      cityInput.value?.classList.add('is-invalid');
    } else {
      cityInput.value?.classList.remove('is-invalid');
      cityInput.value?.classList.add('is-valid');
    }

  }
};

</script>
