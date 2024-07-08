<template>
    <div class="col-xs-12 col-sm-9 d-flex justify-content-between">
        <!-- Item name label -->
        <h6 class="form-label">
            {{ itemName }} <span class="text-danger">*</span>
        </h6>
        <!-- Star rating control -->
        <div class="star-rating grid text-start" style="direction: rtl;">
            <!-- Star rating inputs -->
            <template v-for="i in starCount" :key="`${itemName}-${i}`">
                <input 
                    type="radio" 
                    class="d-none"
                    :name="id" 
                    :value="starCount - i + 1"
                    :id="`${id}-${starCount - i + 1}`"
                    ref="ratingInputs"
                    @click="handleClick(starCount - i + 1)"
                    required
                >
                <label :for="`${id}-${starCount - i + 1}`" class="fs-4">☆</label>
            </template>
            <div class="invalid-feedback text-start">Please select a rating</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { classValidToggle, validators } from '@/utils/validateInput';

defineProps({
    itemName: { 
        type: String, 
        required: true, 
    },
    id:{
        type: String, 
        required: true, 
        validator(value: string, prpos) {
           return  validators.withSpacesRegex(value)
        } 
    },
    starCount: { type: Number, default: 9 },
});

const ratingInputs = ref<HTMLInputElement[]>([]);

const handleClick = (value: number) => {
    if (ratingInputs.value.length > 0) {
        classValidToggle(value > 0, ratingInputs.value[0]);          
    }
};
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