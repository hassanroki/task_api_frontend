<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="bg-linear-to-r from-blue-600 to-blue-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Manage Your Tasks<br>
          <span class="text-blue-200">Effortlessly</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Streamline your productivity with our intuitive task management platform.
          Organize, prioritize, and accomplish more with TaskFlow.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/register" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
            Start Free Trial
          </router-link>
          <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
