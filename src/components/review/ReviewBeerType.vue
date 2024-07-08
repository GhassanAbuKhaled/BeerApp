<template>
    <div class="col-sm-12">
        <SearchableDatalist 
          id="beerType" 
          label="Beer" 
          zIndex="z-3" 
          :optionsList="optionsList" 
          :key="componentKey" 
          :validator="validators.beerName"
        />
    </div>
</template>

<script setup lang="ts">

import SearchableDatalist from '@/components/utilsComponents/SearchableDatalist.vue';
import getBeerTypes from '@/services/reviewServices';
import { validators } from '@/utils/validateInput';
import { onMounted, ref } from 'vue';

let optionsList : string[] = [];
const componentKey  = ref(0)

const fetchBeersTypes = async () => {
    try {
        // Fetching beer types using a service function
        const data = await getBeerTypes();
        // Updating optionsList if data is successfully fetched
        if (data) {
            // Mapping fetched beer names to optionsList
            optionsList = data.beers.map(beer => beer.name); 
           // Ensure the component re-renders by updating the key.
            componentKey.value = componentKey.value + 1
        }
    } catch (error) {
        console.error(error);
    }
};

onMounted(fetchBeersTypes);
</script>
