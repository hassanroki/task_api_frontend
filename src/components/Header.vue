<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const router = useRouter();
const mobileMenuOpen = ref(false);

const isLoggedIn = computed(() => {
  return !!localStorage.getItem("token");
});

const logout = () => {
  localStorage.removeItem("token");
  mobileMenuOpen.value = false;
  router.push("/login");
};

const closeMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4 md:py-6">
        <!-- Left: Logo + All Nav Links -->
        <div class="flex items-center gap-6">
          <router-link
            to="/"
            class="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo1.png"
              alt="Logo"
              class="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </router-link>

          <router-link
            to="/features"
            class="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base"
            >Features</router-link
          >

          <router-link
            to="/tasks"
            class="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base"
            >Tasks</router-link
          >

          <!-- Pricing + Contact desktop only, logo পাশে -->
          <router-link
            to="/pricing"
            class="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >Pricing</router-link
          >

          <router-link
            to="/contact"
            class="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >Contact</router-link
          >
        </div>

        <!-- Right: Auth + Hamburger -->
        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center space-x-4">
            <template v-if="!isLoggedIn">
              <router-link
                to="/login"
                class="text-blue-600 hover:text-blue-800 font-medium"
                >Sign In</router-link
              >
              <router-link
                to="/register"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >Get Started</router-link
              >
            </template>
            <template v-else>
              <router-link
                to="/dashboard"
                class="text-blue-600 hover:text-blue-800 font-medium"
                >Dashboard</router-link
              >
              <button
                @click="logout"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </template>
          </div>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              class="block w-5 h-0.5 bg-gray-700 transition-all duration-300"
              :class="mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-gray-700 my-1 transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-0' : ''"
            />
            <span
              class="block w-5 h-0.5 bg-gray-700 transition-all duration-300"
              :class="mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-100 bg-white shadow-lg"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <router-link
            to="/pricing"
            @click="closeMenu"
            class="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
            >Pricing</router-link
          >
          <router-link
            to="/contact"
            @click="closeMenu"
            class="flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
            >Contact</router-link
          >

          <div class="border-t border-gray-100 my-3" />

          <template v-if="!isLoggedIn">
            <router-link
              to="/login"
              @click="closeMenu"
              class="flex items-center justify-center px-3 py-3 rounded-lg text-blue-600 hover:bg-blue-50 font-medium transition-colors"
              >Sign In</router-link
            >
            <router-link
              to="/register"
              @click="closeMenu"
              class="flex items-center justify-center px-3 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
              >Get Started</router-link
            >
          </template>
          <template v-else>
            <router-link
              to="/dashboard"
              @click="closeMenu"
              class="flex items-center px-3 py-3 rounded-lg text-blue-600 hover:bg-blue-50 font-medium transition-colors"
              >Dashboard</router-link
            >
            <button
              @click="logout"
              class="w-full flex items-center justify-center px-3 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium transition-colors"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped></style>
