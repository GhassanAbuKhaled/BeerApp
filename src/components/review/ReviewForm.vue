<template>
  <main class="container border border-dark-subtle p-4 mb-3 user-select-none">
    <h4 class="text-start fw-bolder mb-3">Beer Review</h4>
    <!-- Form  -->
    <form method="POST" class="row g-4 needs-validation" id="reviewBeerForm" novalidate @submit.prevent="handleSubmit">
      <!-- Type of Beer -->
      <BeerType />
      <!-- Location and Weather Inputs -->
      <WeatherAndLocation />
      <!-- Ratings -->
      <Rating label="Hoppiness" name="hoppinessRating" />
      <Rating label="Maltiness"  name="maltinessRating"/>
      <Rating label="Overall" name="overallRating"/>
      <!-- Comment -->
       <Comment  label="Leave a comment here" name="reviewComment" placeholder="comment"/>
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

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;  

  const {review, validationResult} = formValidator(form);

  if(!validationResult) return;
  console.log(review, validationResult);

};


</script>

<style scoped>
.container {
  width: min(600px, 95vw);
  margin: 0 auto;
}
</style>