<template>
    <div class="rating-container col-12 col-sm-8  justify-content-between">
        <!-- Item name label -->
        <label class="form-label">
            {{ label }}<span class="text-danger">*</span>
        </label>
        
        <!-- Star rating control -->
        <div class="star-rating grid text-start" style="direction: rtl;">
            <!-- Star rating inputs -->
            <template v-for="i in starCount" :key="`${name}-${i}`">
                <input 
                    type="radio" 
                    class="d-none"
                    :name="`${name}`" 
                    :value="starCount - i + 1"
                    :id="`${name}-${starCount - i + 1}`"
                    ref="ratingInputs"
                    :data-review-info="( i==starCount) ? name : null" 
                    @click="handleClick(starCount - i + 1)"
                    required
                >
                <label :for="`${name}-${starCount - i + 1}`" class="fs-5">☆</label>
            </template>
            <div class="invalid-feedback text-start">Please select a rating</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toggleValidationClasses, validators } from '@/utils/validateInput';

defineProps({
    label: { 
        type: String, 
        required: true, 
    },
    name:{
        type: String, 
        required: true, 
        validator: (value: string)  => validators.withSpacesRegex(value)
    },
    starCount: { type: Number, default: 9 },
});

const ratingInputs = ref<HTMLInputElement[]>([]);

const handleClick = (value: number) => {
    if (ratingInputs.value.length > 0) {
        toggleValidationClasses(value > 0, ratingInputs.value[0]);          
    }
};
</script>


<style scoped>
.star-rating>label {
    position: relative;
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

@media (min-width: 340px) {
    .rating-container{
        display: inline-flex;
    }
    
}
</style>