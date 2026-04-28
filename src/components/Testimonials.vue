<script setup>
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Product Manager',
    initials: 'JD',
    quote: 'TaskFlow has revolutionized how our team manages projects. The collaboration features are outstanding.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Freelancer',
    initials: 'JS',
    quote: 'As a freelancer, staying organized is crucial. TaskFlow helps me keep track of everything effortlessly.'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Team Lead',
    initials: 'MJ',
    quote: 'The analytics feature gives us great insights into our team\'s performance. Highly recommended!'
  }
]
</script>

<template>
  <section id="testimonials" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their productivity.
        </p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="bg-gray-50 p-6 rounded-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">{{ testimonial.initials }}</div>
            <div class="ml-4">
              <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
              <div class="text-gray-600">{{ testimonial.role }}</div>
            </div>
          </div>
          <p class="text-gray-700">{{ testimonial.quote }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
