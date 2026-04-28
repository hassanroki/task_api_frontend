<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

const showPassword = ref(false);
const errors = ref({});
const isLoading = ref(false);
const showSuccessMessage = ref(false);

// 🔐 LOGIN FUNCTION
const handleLogin = async () => {
  isLoading.value = true;
  errors.value = {};
  showSuccessMessage.value = false;

  try {
    const res = await axios.post("https://task-backend.larasoftbd.com/api/login", {
      email: formData.value.email,
      password: formData.value.password,
    });

    // ✅ token + user
    const token = res.data.data.token;
    const user = res.data.data.user;

    // 🔥 localStorage set
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    showSuccessMessage.value = true;

    // redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        errors.value.email = "Invalid credentials";
      } else if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } else {
      alert("Server error!");
      console.log(error);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <!-- Login Content -->
    <main class="flex-grow flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md">
        <div class="bg-white rounded-lg shadow-lg p-8">

          <!-- Header -->
          <div class="text-center mb-6">
            <h1 class="text-3xl font-bold">Welcome Back</h1>
            <p class="text-gray-600">Login to your account</p>
          </div>

          <!-- Success -->
          <div v-if="showSuccessMessage" class="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Login successful! Redirecting...
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-5">

            <!-- Email -->
            <div>
              <label class="block mb-1">Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full border p-2 rounded"
                placeholder="Enter email"
              />
              <p v-if="errors.email" class="text-red-500 text-sm">
                {{ Array.isArray(errors.email) ? errors.email[0] : errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label class="block mb-1">Password</label>
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full border p-2 rounded"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-2 top-2"
                >
                  👁️
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm">
                {{ Array.isArray(errors.password) ? errors.password[0] : errors.password }}
              </p>
            </div>

            <!-- Button -->
            <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded"
              :disabled="isLoading"
            >
              {{ isLoading ? "Logging in..." : "Login" }}
            </button>

          </form>

          <!-- Register Link -->
          <p class="text-center mt-4">
            Don't have an account?
            <router-link to="/register" class="text-blue-600">Register</router-link>
          </p>

        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
</style>