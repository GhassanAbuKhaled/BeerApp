<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/review">Review</router-link> 
  </nav>
  <router-view/>
  <toast />
</template>
<script setup lang="ts">
import { provideToast } from '@/utils/toast';
import toast from '@/components/utilsComponents/toast.vue';
import { backgroundSync } from './utils/backgroundSync';
import { onMounted } from 'vue';

provideToast();

onMounted(async ()=>{
  await backgroundSync();
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.form-control{
  border-radius: 0 !important;
}
</style>
