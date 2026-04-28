<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  setTimeout(() => {
    formData.value = { name: '', email: '', subject: '', message: '' }
    submitted.value = false
  }, 2000)
}

const contactInfo = [
  {
    icon: 'mail',
    title: 'Email',
    content: 'hassan0cse@gmail.com',
    subtext: 'We respond within 24 hours'
  },
  {
    icon: 'phone',
    title: 'Phone',
    content: '+880 1770910017',
    subtext: 'Available Sat-Thus, 9am-10pm'
  },
  {
    icon: 'location',
    title: 'Address',
    content: 'West Dhanmoni Hosuing',
    subtext: 'Bosila, Dhaka, Bangladesh'
  }
]
</script>

<template>
  <div>
    <Header />
    
    <!-- Contact Header -->
    <section class="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
        <p class="text-xl text-blue-100">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <div v-if="submitted" class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Thank you! Your message has been sent successfully.
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-gray-700 font-medium mb-2">Name</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Your name"
                  required
                >
              </div>
              
              <div>
                <label class="block text-gray-700 font-medium mb-2">Email</label>
                <input 
                  v-model="formData.email"
                  type="email" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="your@email.com"
                  required
                >
              </div>
              
              <div>
                <label class="block text-gray-700 font-medium mb-2">Subject</label>
                <input 
                  v-model="formData.subject"
                  type="text" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="How can we help?"
                  required
                >
              </div>
              
              <div>
                <label class="block text-gray-700 font-medium mb-2">Message</label>
                <textarea 
                  v-model="formData.message"
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div class="space-y-8">
              <div v-for="info in contactInfo" :key="info.title" class="flex">
                <div v-if="info.icon === 'mail'" class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div v-else-if="info.icon === 'phone'" class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div v-else class="flex-shrink-0">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-gray-900">{{ info.title }}</h3>
                  <p class="text-gray-600">{{ info.content }}</p>
                  <p class="text-sm text-gray-500">{{ info.subtext }}</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="mt-12">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"></path></svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.678 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
</style>
