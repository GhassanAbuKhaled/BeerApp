<template>
  <main class="container border border-dark-subtle p-4 mb-3 user-select-none">
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
      <!-- Csrf token -->
      <CSRFToken />
      <!-- Submit Button -->
      <div :class="[ {'shake': warning}, 'col-12' ]">
        <button :class="['btn', warning ? 'btn-danger' : 'btn-primary']" type="submit">Submit Form</button>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import Rating from "./review-rating.vue";
import BeerType from "./review-beer.vue";
import WeatherAndLocation from "./review-location.vue";
import Comment from "./review-comment.vue";
import TermsAndConditions from "./review-terms.vue";
import CSRFToken from "@/components/utilsComponents/csrf-token.vue";
import { formValidator } from "@/utils/validateInput";
import { saveReview } from "@/services/reviewServices";
import { ref } from "vue";
import router from "@/router";
import { useToast } from '@/utils/toast';

const { showToast } = useToast();

// A reactive reference for controlling the warning message visibility
const warning = ref(false);

// The form submission event
const handleSubmit = async (event: Event) => {
  event.preventDefault(); 
  const form = event.target as HTMLFormElement;
  // Validate the form and extract the review data
  const { review, validationResult } = formValidator(form); 
  if (!validationResult) {
    
    showToast('Please select all the required fields!');
    return warningStart(); 
  }
  
  try {
    // Attempt to save the review using the review service
    const res = await saveReview(review); 
    showToast(res.message);
    // Redirect the user back to the home
    router.push('/');
  } catch (error) {
    console.error(error); 
  }
};

// Starts the warning display.
const warningStart = () => {
  warning.value = true; // Show the warning
  setTimeout(() => {
    warning.value = false; // Hide the warning after 2 seconds
  }, 2000);
};
</script>


<style scoped>
.container {
  width: min(600px, 95vw);
  margin: 0 auto;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  color: red;
}

@keyframes shake {
  10%,
  90% {
  transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
  transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
  transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
  transform: translate3d(4px, 0, 0);
  }
}
</style>