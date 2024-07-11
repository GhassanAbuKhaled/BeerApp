<template>
    <div
     class="toast position-fixed p-3 m-1 top-0 end-0 border border-dark-subtle"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">BeerApp</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
        {{ currentToast?.message}}
      </div>
    </div>
</template>
  
  
<script setup lang="ts">
import { useToast } from '@/utils/toast';

const { currentToast } = useToast();

</script>

<style scoped>
.toast {
    position: relative;
    width: min(300px, 95vw); 
    overflow-wrap: break-word;
}
</style>
  