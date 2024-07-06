<template>
  <main class="container mt-1 p-3 mb-5">
    <h4 class="text-start">Beer Review</h4>
    <!-- Form container -->
    <form class="row g-3 needs-validation" id="reviewBeerForm" novalidate @submit.prevent="handleSubmit">
      <!-- Type of Beer -->
      <BeerType />
      <!-- Location and Weather Inputs -->
      <WeatherAndLocation />
      <!-- Ratings -->
      <Rating name="Hoppiness" />
      <Rating name="Maltiness" />
      <Rating name="Overall" />
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
  console.log('Form Data:', reviewData);
  console.log(sanitizeInputs(reviewData));
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');

    return;
  }
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