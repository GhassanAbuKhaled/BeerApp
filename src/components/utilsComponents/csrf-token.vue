<template>
  <div>
    <!-- CSRF token hidden input -->
    <input type="hidden" name="_csrfToken" :value="csrfToken">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getCsrfToken from '@/services/tokenServices';
import useTokenStore from '@/store/tokenStore'

// Define a reactive ref for CSRF token
const csrfToken = ref<string | null>(useTokenStore().csrfTokenValue);

// Fetch CSRF token from server
const fetchCsrfToken = async () =>  {
  try {
    // Only fetch token if it hasn't been fetched yet
    if(csrfToken.value) return;

    const data = await getCsrfToken();
    if(data) {
      csrfToken.value = data.csrfToken;
      // store the token
      useTokenStore().setCsrfToken(data.csrfToken);
    }
    
  } catch (error) {
    console.error('Failed to fetch CSRF token');
  }
}  
// Fetch CSRF token on component mount
onMounted(async () => {
  await fetchCsrfToken();
});
</script>
  