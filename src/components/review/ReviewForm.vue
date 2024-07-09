<template>
  <main class="container border border-dark-subtle p-4 mb-3 user-select-none">
    <h4 class="text-start fw-bolder mb-3">Beer Review</h4>
    <!-- Form  -->
    <form class="row g-4 needs-validation" id="reviewBeerForm" novalidate @submit.prevent="handleSubmit">
      <!-- Type of Beer -->
      <BeerType />
      <!-- Location and Weather Inputs -->
      <WeatherAndLocation />
      <!-- Ratings -->
      <Rating itemName="Hoppiness" id="hoppinessRating" />
      <Rating itemName="Maltiness"  id="maltinessRating"/>
      <Rating itemName="Overall" id="overallRating"/>
      <!-- Comment -->
       <Comment id="reviewComment"  label="Leave a comment here" placeholder="comment"/>
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
import Comment from "./ReviewComment.vue";
import TermsAndConditions from "./ReviewTermsAndConditions.vue";
import { formValidator } from "@/utils/validateInput";
import sanitizeInputs from "@/utils/sanitizedInput";

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  
  if(!formValidator(form)) return;
  
  const formData: FormData = new FormData(form);  
  let reviewData = Object.fromEntries(formData.entries());
  reviewData = sanitizeInputs(reviewData);

  console.log(reviewData);
};


</script>

<style scoped>
.container {
  width: min(600px, 95vw);
  margin: 0 auto;
}
</style>