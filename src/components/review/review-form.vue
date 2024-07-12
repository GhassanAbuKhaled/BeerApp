<template>
  <main class="container border border-dark-subtle p-4 mb-3 user-select-none">
    <!-- Review Form -->
    <form method="POST" class="row g-4 needs-validation" id="reviewBeerForm" novalidate @submit.prevent="handleSubmit">
      <!-- Beer Type -->
      <BeerType />
      <!-- Weather and Location -->
      <WeatherAndLocation />
      <!-- Ratings -->
      <Rating label="Hoppiness" name="hoppinessRating" />
      <Rating label="Maltiness" name="maltinessRating" />
      <Rating label="Overall" name="overallRating" />
      <!-- Comment -->
      <Comment label="Leave a comment here" name="reviewComment" placeholder="Comment" />
      <!-- Terms and Conditions -->
      <TermsAndConditions />
      <!-- CSRF Token -->
      <CSRFToken />
      <!-- Submit Button -->
      <div :class="[{'shake': warning}, 'col-12']">
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
import { saveFormData } from "@/utils/indexedDB";
import { backgroundSync } from "@/utils/backgroundSync";

const { showToast } = useToast();

// Reactive reference to control warning message visibility
const warning = ref(false);

// Form submission handler
const handleSubmit = async (event: Event) => {
  event.preventDefault(); 
  const form = event.target as HTMLFormElement;
  
  // Validate form and extract review data
  const { review, validationResult } = formValidator(form);   
  if (!validationResult) {
    showToast('Please complete all required fields!');
    return warningStart(); 
  }
  
  // Proceed with form submission
  if (navigator.onLine) {
    try {
      const res = await saveReview(review);
      showToast(res.message);
    } catch (error) {
      console.error('Error saving review:', error); 
    }
  } else {
  // Handle offline mode using service workers
    try {
      await saveFormData(review);
      await backgroundSync();
      showToast('You are offline. Your form data will be submitted when online.');
    } catch (error) {
      console.error('Error handling offline mode:', error);
      showToast('Failed to save review. Please try again later.');
    }
  }
  router.push('/');
};

// Show warning message
const warningStart = () => {
  warning.value = true;
  setTimeout(() => {
    warning.value = false;
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