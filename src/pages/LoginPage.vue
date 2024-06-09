<template>
  <div class="login-page">
    <q-page>
      <div class="login-card fixed-center">
        <q-form @submit.prevent="login">
          <q-input
            v-model="loginCredentials.email"
            label="Email"
            type="email"
            :rules="[required, emailValidate]"
          />
          <q-input
            v-model="loginCredentials.password"
            label="Password"
            type="password"
            :rules="[required, min]"
          />
          <q-btn type="submit" label="Login" color="primary" block /><br />
          <br />
          <router-link class="cursor-pointer flex justify-center" to="/register"
            >Register</router-link
          >
        </q-form>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Notify } from "quasar";
import { useUserStore } from "stores/userStore";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const loginCredentials = ref({
  email: "",
  password: "",
});
const router = useRouter();

const required = (v) => !!v || "Field is required";
const emailValidate = (v) => /.+@.+\..+/.test(v) || "E-mail must be valid";
const min = (val) =>
  (val && val.length >= 8) || "Password must contain at least 8 characters";

const login = async () => {
  const params = {
    email: loginCredentials.value.email,
    password: loginCredentials.value.password,
  };
  try {
    const data = await userStore.get("login", params);
    Notify.create({
      type: "positive", // Notification type: 'positive', 'negative', 'warning', 'info'
      message: "Logged in successfully",
      timeout: 2000,
      position: "top",
      actions: [{ label: "X", color: "white", handler: () => {} }],
    });
    userStore.userInfo = data;
    router.push("home");
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  width: 400px;
}
</style>
