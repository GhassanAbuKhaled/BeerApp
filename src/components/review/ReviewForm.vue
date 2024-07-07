<template>
  <main class="container border mt-1 p-4 mb-5 user-select-none">
    <h4 class="text-start">Beer Review</h4>
    <!-- Form container -->
    <form class="row g-4 needs-validation" id="reviewBeerForm" novalidate @submit.prevent="handleSubmit">
      <!-- Type of Beer -->
      <BeerType />
      <!-- Location and Weather Inputs -->
      <WeatherAndLocation />
      <!-- Ratings -->
      <Rating itemName="Hoppiness" />
      <Rating itemName="Maltiness" />
      <Rating itemName="Overall" />
      <!-- Terms and Conditions Checkbox -->
      <TermsAndConditions />
      <!-- Submit Button -->
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit Form</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import Rating from "./ReviewRating.vue";
import BeerType from "./ReviewBeerType.vue";
import WeatherAndLocation from "./ReviewLocationAndWeather.vue";
import TermsAndConditions from "./ReviewTermsAndConditions.vue";
import sanitizeInputs from "@/utils/sanitizedInput";

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData: any = new FormData(form);
  const reviewData = Object.fromEntries(formData.entries()) as ReviewData;
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    
    return;
  }
  console.log('Form Data:', reviewData);
  console.log(sanitizeInputs(reviewData));
};


</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
}

h4 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
}
</style>