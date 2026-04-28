<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </div>
      </div>

      <!-- Content -->
      <h1 class="text-2xl font-bold text-gray-900 text-center mb-2">Logged Out</h1>
      <p class="text-gray-600 text-center mb-6">You have been successfully logged out of your account.</p>

      <!-- Message -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p class="text-sm text-blue-800">
          <span class="font-semibold">Session cleared:</span> Your session data has been removed for security.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <!-- Login Button -->
        <router-link
          to="/login"
          class="block w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium text-center"
        >
          Sign In Again
        </router-link>

        <!-- Home Button -->
        <router-link
          to="/"
          class="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium text-center"
        >
          Back to Home
        </router-link>
      </div>

      <!-- Footer Info -->
      <div class="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>Questions? <router-link to="/contact" class="text-indigo-600 hover:text-indigo-700">Contact Support</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Clear user session on mount
onMounted(() => {
  // Clear local storage
  localStorage.clear()
  
  // Clear session storage
  sessionStorage.clear()
  
  // You can also dispatch logout action to state management here
  // Example: store.commit('logout')
})
</script>

<style scoped>
/* Optional smooth animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
