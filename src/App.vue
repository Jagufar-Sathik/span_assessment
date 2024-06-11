<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "stores/userStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
onMounted(()=>{
if(!userStore.userInfo){
  router.push('login');
}
})
</script>
