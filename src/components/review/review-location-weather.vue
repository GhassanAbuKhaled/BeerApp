<template>
      <!-- SECTION: Location Input fields -->
    <template v-for="field in fields" :key="field.id">
        <div :class="field.class">
            <label :for="field.id" class="form-label">{{ field.label }}</label>
            <input type="text" class="form-control" :id="field.id" :name="field.id" v-model="field.model.value"
                :pattern="field.pattern" required />
            <div class="invalid-feedback">Please provide a valid {{ field.label.toLowerCase() }}.</div>
        </div>
    </template>
     <!-- SECTION: Temperature Input -->
    <div>
        <div class="d-flex align-items-center form-label">
            <label for="temperatureInput">Temperature:</label>
            <!-- Radio buttons for temperature unit selection -->
            <label for="convertTo" class="ms-3 me-1">Fahrenheit</label>
            <input type="radio" name='convertTo' value="f"  />
            
            <label for="convertTo" class="ms-3 me-1">Celsius</label>
            <input type="radio" name='convertTo' value="C" checked/>
        </div>
        <!-- Input field for temperature -->
        <div class="d-flex">
            <div>
                <input type="number" class="form-control" id="temperatureInput" name="temperatureInput" v-model="temperature" required>
                <div class="invalid-feedback">Please provide a valid temperature.</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import getLocation from '@/services/locationService';
import { weatherAndLocationStore } from "@/store/weatherAndLocation";

const country = ref<string>('');
const city = ref<string>('');
const temperature = ref<number>(0);

const fields = [
    { id: 'countryInput', label: 'Country', model: country, pattern: '[A-Za-z]{2}', class: 'col-sm-6' },
    { id: 'cityInput', label: 'City', model: city, pattern: '[A-Za-z]{2}', class: 'col-sm-6' },
];

onMounted(async () => {
    try {
        let locationDetails = weatherAndLocationStore().getData;
        if (locationDetails && !locationDetails.city) {
            locationDetails = await getLocation();
        }
        if (locationDetails) {
            country.value = locationDetails.country;
            city.value = locationDetails.city;
            temperature.value = locationDetails.temperature
        }
    } catch (error) {
        console.error(error);
    }
});
</script>
