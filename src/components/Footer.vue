<script setup>
const footerLinks = {
  product: [
    { name: 'Features', url: '#' },
    { name: 'Pricing', url: '#' },
    { name: 'Integrations', url: '#' }
  ],
  company: [
    { name: 'About', url: '#' },
    { name: 'Blog', url: '#' },
    { name: 'Careers', url: '#' }
  ],
  support: [
    { name: 'Help Center', url: '#' },
    { name: 'Contact Us', url: '#' },
    { name: 'Privacy Policy', url: '#' }
  ]
}

const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="text-2xl font-bold text-blue-400 mb-4"> <img
              src="/logo1.png"
              alt="Logo"
              class="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
            /></div>
          <p class="text-gray-400">Empowering productivity through intelligent task management.</p>
        </div>
        <div>
          <h3 class="font-semibold mb-4">Product</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="link in footerLinks.product" :key="link.name">
              <a :href="link.url" class="hover:text-white transition-colors">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold mb-4">Company</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="link in footerLinks.company" :key="link.name">
              <a :href="link.url" class="hover:text-white transition-colors">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold mb-4">Support</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="link in footerLinks.support" :key="link.name">
              <a :href="link.url" class="hover:text-white transition-colors">{{ link.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ year }} Lara Soft BD. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
