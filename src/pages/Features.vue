<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const advancedFeatures = [
  {
    id: 1,
    title: 'Task Organization',
    description: 'Categorize and organize your tasks with custom labels, priorities, and due dates.',
    details: 'Create unlimited task lists with custom labels, set priority levels from critical to low.'
  },
  {
    id: 2,
    title: 'Team Collaboration',
    description: 'Share tasks with your team, assign responsibilities, and track progress together.',
    details: 'Invite unlimited team members, assign tasks, add comments, and track real-time updates.'
  },
  {
    id: 3,
    title: 'Analytics & Reports',
    description: 'Get insights into your productivity with detailed reports and performance metrics.',
    details: 'Track productivity trends, visualize completed tasks, and identify bottlenecks.'
  },
  {
    id: 4,
    title: 'Recurring Tasks',
    description: 'Automate repetitive tasks with flexible recurring schedules.',
    details: 'Set daily, weekly, monthly, or custom recurring patterns for routine tasks.'
  },
  {
    id: 5,
    title: 'Integrations',
    description: 'Connect with your favorite tools and services.',
    details: 'Integrate with Slack, Email, Google Calendar, and many more platforms.'
  },
  {
    id: 6,
    title: 'Mobile App',
    description: 'Manage tasks on the go with our native mobile application.',
    details: 'iOS and Android apps with offline support and push notifications.'
  }
]
</script>

<template>
  <div>
    <Header />
    
    <!-- Features Header -->
    <section class="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Advanced Features</h1>
        <p class="text-xl text-blue-100">Explore all the powerful features that make TaskFlow the ultimate productivity tool.</p>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12">
          <div v-for="feature in advancedFeatures" :key="feature.id" class="border-l-4 border-blue-600 pl-6 py-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 mb-3">{{ feature.description }}</p>
            <p class="text-gray-700 font-medium">{{ feature.details }}</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
</style>
