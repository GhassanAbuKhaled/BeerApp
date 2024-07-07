<template>
    <div class="col-xs-12 col-sm-9 d-flex justify-content-between ">
        <!-- Item name label -->
        <h6 class="form-label">{{ itemName }} <span class="text-danger">*</span></h6>
        <!-- Star rating control -->
        <div class="star-rating grid text-start" style="direction: rtl;">
            <!-- Star rating inputs -->
            <template v-for="i in starCount" :key="`${itemName}-${i}`">
                <input 
                type="radio" 
                class="d-none"
                :name="itemName" 
                :value="`${starCount - i + 1}`" 
                :id="`${itemName}-${i}`"
                required>
                <label :for="`${itemName}-${i}`" class="fs-4">☆</label>
            </template>
            <div class="invalid-feedback text-start">Please select a rating</div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    itemName: { type: String, required: true },
    starCount: { type: Number, default: 9 },
});
</script>

<style scoped>
.star-rating>label {
    position: relative;
    width: 1em;
    color: #FFC107;
    cursor: pointer;
    line-height: 0;
}

.star-rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0;
    transition: transform 0.2s, opacity 0.2s;
}

.star-rating>label:hover:before {
    opacity: 1 !important;
    transform: scale(1.4) !important;
}

.star-rating>label:hover~label:before {
    opacity: 1 !important;
    transform: scale(1) !important; /* Ensures other stars stay the same size */
}

.star-rating>input[type="radio"]:checked~label:before {
    opacity: 1;
}

.star-rating:hover>input:checked~label:before {
    opacity: 0;
}
</style>