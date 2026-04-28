<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

axios.defaults.baseURL = "https://task-backend.larasoftbd.com/api";

const formData = ref({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errors = ref({});
const isLoading = ref(false);
const showSuccessMessage = ref(false);

const validateForm = () => {
  errors.value = {};

  if (!formData.value.fullName.trim()) {
    errors.value.name = ["Full name is required"];
  } else if (formData.value.fullName.trim().length < 3) {
    errors.value.name = ["Full name must be at least 3 characters"];
  }

  if (!formData.value.email) {
    errors.value.email = ["Email is required"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = ["Please enter a valid email"];
  }

  if (!formData.value.password) {
    errors.value.password = ["Password is required"];
  } else if (formData.value.password.length < 6) {
    errors.value.password = ["Minimum 6 characters"];
  }

  if (!formData.value.confirmPassword) {
    errors.value.password_confirmation = ["Confirm your password"];
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.password_confirmation = ["Passwords do not match"];
  }

  if (!formData.value.acceptTerms) {
    errors.value.acceptTerms = ["You must accept terms"];
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errors.value = {};

  try {
    const response = await axios.post("/register", {
      name: formData.value.fullName,
      email: formData.value.email,
      password: formData.value.password,
      password_confirmation: formData.value.confirmPassword,
    });

    // ✅ SAVE TOKEN
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));

    showSuccessMessage.value = true;

    formData.value = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    };

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      alert("Something went wrong!");
      console.log(error);
    }
  } finally {
    isLoading.value = false;
  }
};

const passwordStrength = ref(0);

const checkPasswordStrength = () => {
  let strength = 0;
  const pwd = formData.value.password;

  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (/(?=.*[a-z])(?=.*[A-Z])/.test(pwd)) strength++;
  if (/(?=.*\d)/.test(pwd)) strength++;
  if (/(?=.*[!@#$%^&*])/.test(pwd)) strength++;

  passwordStrength.value = strength;
};

const getPasswordStrengthColor = () => {
  switch (passwordStrength.value) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
      return "bg-yellow-500";
    case 3:
      return "bg-blue-500";
    case 4:
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

const getPasswordStrengthText = () => {
  switch (passwordStrength.value) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    case 5:
      return "Very Strong";
    default:
      return "";
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <!-- Registration Content -->
    <main
      class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p class="text-gray-600">
              Join TaskFlow and boost your productivity
            </p>
          </div>

          <!-- Success Message -->
          <div
            v-if="showSuccessMessage"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p class="text-green-800 font-medium">
              ✓ Account created successfully!
            </p>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="handleRegister" class="space-y-5">
            <!-- Full Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Full Name</label
              >
              <input
                v-model="formData.fullName"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                :class="errors.fullName ? 'border-red-500' : 'border-gray-300'"
                :disabled="isLoading"
              />
              <p v-if="errors.name" class="text-red-600">
                {{ errors.name[0] }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email Address</label
              >
              <input
                v-model="formData.email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                :class="errors.name ? 'border-red-500' : 'border-gray-300'"
                :disabled="isLoading"
              />
              <p v-if="errors.name" class="text-red-600">
                {{ errors.name[0] }}
              </p>
            </div>

            <!-- Password Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Password</label
              >
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  @input="checkPasswordStrength"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  :class="
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  "
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  :disabled="isLoading"
                >
                  <span v-if="!showPassword">👁️</span>
                  <span v-else>🔒</span>
                </button>
              </div>

              <!-- Password Strength Indicator -->
              <div v-if="formData.password" class="mt-2">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-medium text-gray-600"
                    >Strength:</span
                  >
                  <span
                    class="text-xs font-medium"
                    :class="{
                      'text-red-600': passwordStrength <= 1,
                      'text-yellow-600': passwordStrength === 2,
                      'text-blue-600': passwordStrength === 3,
                      'text-green-600': passwordStrength >= 4,
                    }"
                  >
                    {{ getPasswordStrengthText() }}
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    :class="[
                      getPasswordStrengthColor(),
                      'h-2 rounded-full transition-all',
                    ]"
                    :style="{ width: `${(passwordStrength / 5) * 100}%` }"
                  ></div>
                </div>
              </div>

              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password[0] }}
              </p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Re-enter your password"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  :class="
                    errors.password_confirmation
                      ? 'border-red-500'
                      : 'border-gray-300'
                  "
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  :disabled="isLoading"
                >
                  <span v-if="!showConfirmPassword">👁️</span>
                  <span v-else>🔒</span>
                </button>
              </div>
              <p
                v-if="errors.password_confirmation"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors.password_confirmation[0] }}
              </p>
            </div>

            <!-- Terms and Conditions -->
            <div>
              <div class="flex items-start">
                <input
                  id="terms"
                  v-model="formData.acceptTerms"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mt-1"
                  :disabled="isLoading"
                />
                <label for="terms" class="ml-2 text-sm text-gray-600">
                  I agree to the
                  <a href="#" class="text-blue-600 hover:text-blue-800"
                    >Terms of Service</a
                  >
                  and
                  <a href="#" class="text-blue-600 hover:text-blue-800"
                    >Privacy Policy</a
                  >
                </label>
              </div>
              <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-600">
                {{ errors.acceptTerms[0] }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              <span v-if="isLoading">Creating account...</span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-2 text-gray-500 text-sm">or</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>

          <!-- Social Registration -->
          <div class="space-y-3">
            <button
              class="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
              :disabled="isLoading"
            >
              <span class="text-2xl">G</span>
              <span class="text-gray-700 font-medium">Google</span>
            </button>
            <button
              class="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
              :disabled="isLoading"
            >
              <span class="text-gray-700 font-bold text-lg">f</span>
              <span class="text-gray-700 font-medium">Facebook</span>
            </button>
          </div>

          <!-- Sign In Link -->
          <div class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/login"
              class="text-blue-600 hover:text-blue-800 font-medium"
              >Sign in here</router-link
            >
          </div>
        </div>

        <!-- Footer Note -->
        <p class="text-center text-gray-500 text-sm mt-6">
          We'll never share your data. See our
          <a href="#" class="text-blue-600 hover:text-blue-800"
            >Privacy Policy</a
          >.
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped></style>
