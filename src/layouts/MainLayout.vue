<template>
  <div>
    <q-layout view="lHh Lpr lFf" :style="{ height: headerHeight }">
      <q-header elevated class="q-pa-sm">
        <q-toolbar v-if="!!userStore.userInfo" class="flex justify-end">
          <span class="user-name flex justify-start">{{
            userStore.userInfo.companyName
          }}</span>
          <div class="logo-container flex items-center">
            <img
              :src="'src/assets/logo/' + userStore.userInfo.logoName"
              alt="User Logo"
              class="logo-image"
            />
          </div>

          <!-- Navigation Icons -->
          <div class="navigation-container flex items-center">
            <q-icon
              name="home"
              class="cursor-pointer q-px-sm"
              :size="'xs'"
              @click.stop="$router.push('home')"
            />
            <q-icon
              name="info"
              class="cursor-pointer q-px-sm"
              :size="'xs'"
              @click.stop="$router.push('about')"
            />
            <q-icon
              name="logout"
              class="cursor-pointer q-px-sm"
              :size="'xs'"
              @click="openPopup = true"
            />
          </div>
        </q-toolbar>
      </q-header>

      <!-- Rest of your layout content -->
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <prompt-dialog v-model="openPopup" :action="'logout'" @action="logout" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "stores/userStore";
import { useRouter } from "vue-router";
import PromptDialog from "src/components/PromptDialog.vue";

const userStore = useUserStore();
const router = useRouter();
const openPopup = ref(false);
const headerHeight = ref("70px");

const logout = () => {
  userStore.userInfo = null;
  router.push("login");
  sessionStorage.clear();
};
</script>

<style scoped>
/* Add any custom styles here */
.logo-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-image {
  width: 30px;
  height: 30px;
}

.user-name {
  font-weight: bold;
  /* Add any other styling for the user name */
}
</style>
