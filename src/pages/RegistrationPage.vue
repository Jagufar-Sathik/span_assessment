<template>
  <div class="registration-page">
    <q-form>
      <div class="form-fields">
        <q-input
          v-model="companyName"
          label="Company Name"
          :rules="[required]"
        />
        <q-file
          v-model="logoUrl"
          label="Logo (Image URL)"
          :rules="[required]"
          accept="image/*"
          @change="handleImageUpload"
        />
        <q-input
          v-model="email"
          label="Email"
          type="email"
          error-label="Invalid email"
          :rules="[required, emailValidate]"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          error-label="Should contain minimum of 8 characters"
          :rules="[required, min]"
          :rulesOptions="{ min: 8 }"
        />
      </div>
    </q-form>
    <div class="login-link">
      <q-btn
        label="Register"
        type="submit"
        color="primary"
        @click.stop="registerUser"
      /><br />
      <br />
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Notify } from "quasar";
import { useUserStore } from "stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const companyName = ref("");
const logoUrl = ref("");
const email = ref("");
const password = ref("");
const required = (v) => !!v || "Field is required";
const emailValidate = (v) => /.+@.+\..+/.test(v) || "E-mail must be valid";

const registerUser = async () => {
  const base64Image = await handleImageUpload();
  const payload = {
    companyName: companyName.value,
    logoName: logoUrl.value.name,
    email: email.value,
    password: password.value,
    base64Image,
  };
  try {
    const result = await userStore.post("register", payload);
    Notify.create({
      type: "positive",
      message: `${result.message}`,
      timeout: 2000,
      position: "top",
      actions: [{ label: "X", color: "white", handler: () => {} }],
    });
    router.push("login");
  } catch (e) {
    console.error(e);
  }
};
function handleImageUpload() {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result; // Get the base64 string
      resolve(base64Image); // Resolve the Promise with the base64Image
    };

    reader.onerror = (error) => {
      reject(error); // Reject the Promise if an error occurs
    };

    reader.readAsDataURL(logoUrl.value); // Read the file as data URL
  });
}
</script>

<style scoped>
.registration-page {
  align-items: center;
  width: 400px !important;
  margin: 0 auto;
  padding: 20px;
}

.form-fields {
  width: 100%;
}
.q-field {
  margin-top: 10px;
}

.login-link {
  margin-top: 16px;
  text-align: center;
}
</style>
