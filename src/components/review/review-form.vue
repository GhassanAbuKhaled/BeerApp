<template>
    <main class="container mt-1 p-3">
        <h4 class="text-start">Beer Review</h4>
        <!-- Form container -->
        <form class="row g-3 needs-validation" novalidate @submit.prevent="handleSubmit">
            <!-- SECTION: Type of Beer -->
            <Beer />
            <!-- SECTION: Location and Weather Inputs -->
            <WeatherAndLocation />
            <!-- SECTION: Ratings -->
            <Rating name="Hoppiness" />
            <Rating name="Maltiness" />
            <Rating name="Overall" />
            <!-- SECTION: Terms and Conditions Checkbox -->
            <Conditions />
            <!-- SECTION Submit Button -->
            <div class="col-12">
                <!-- Button to submit the form -->
                <button class="btn btn-primary" type="submit">Submit Form</button>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">

import Rating from "./review-rating.vue"
import Beer from "./review-beer.vue"
import WeatherAndLocation from "./review-location-weather.vue"
import Conditions from "./review-conditions.vue"

const handleSubmit = (event: Event) => {
    const form = (event.target as HTMLFormElement);
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        console.log(form.HoppinessRating.value);
        console.log(form.MaltinessRating.value);
        console.log(form.OverallRating.value);
    }
    form.classList.add('was-validated')
}
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
}

.form-floating {
    margin-bottom: 1rem;
}

h4 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 600;
}
</style>