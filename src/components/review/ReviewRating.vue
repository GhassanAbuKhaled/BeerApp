<template>
    <!-- Rating component -->
    <div class="d-block d-sm-flex align-items-center justify-content-between">
        <!-- Displaying the name of the item being rated -->
        <h6 class="form-label">{{ name }} <span class="text-danger">*</span></h6>
        
        <!-- Star rating control -->
        <div class="rating d-flex flex-row-reverse justify-content-center">
            <!-- Loop through the number of stars and create radio inputs -->
            <template v-for="n in numberOfStars" :key="`${name}-${n}`">
                <input type="radio" :name="`${name}`" :value="`${numberOfStars - n + 1}`" :id="`${name}-${n}`" required>
                <label :for="`${name}-${n}`">☆</label>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: { type: String, required: true },
    numberOfStars: { type: Number, default: 9 },
});
</script>

<style scoped>
.rating>input {
    display: none
}

.rating>label {
    position: relative;
    width: 1em;
    font-size: 23px;
    font-weight: 300;
    color: #57e32c;
    cursor: pointer
}

.rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0
}

.rating>label:hover:before,
.rating>label:hover~label:before {
    opacity: 1 !important
}

.rating>input[type="radio"]:checked~label:before {
    opacity: 1;
}

.rating:hover>input:checked~label:before {
    opacity: 0.4
}
</style>