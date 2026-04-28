<script setup>
const steps = [
  {
    id: 1,
    title: 'Create Your Account',
    description: 'Sign up for free and set up your profile in under 2 minutes.'
  },
  {
    id: 2,
    title: 'Add Your Tasks',
    description: 'Import or create tasks, set priorities, and organize them efficiently.'
  },
  {
    id: 3,
    title: 'Start Achieving',
    description: 'Track progress, collaborate with teams, and boost your productivity.'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get started in minutes with our simple 3-step process.
        </p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="step in steps" :key="step.id" class="text-center">
          <div class="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{{ step.id }}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
