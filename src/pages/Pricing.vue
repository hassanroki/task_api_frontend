<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const plans = [
  {
    id: 1,
    name: 'Starter',
    price: 0,
    billingPeriod: 'Forever Free',
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 50 tasks',
      'Basic task organization',
      'Email notifications',
      'Mobile app access',
      'Community support'
    ],
    cta: 'Get Started',
    highlighted: false
  },
  {
    id: 2,
    name: 'Professional',
    price: 9,
    billingPeriod: 'per month',
    description: 'For professionals and small teams',
    features: [
      'Unlimited tasks',
      'Advanced organization',
      'Team collaboration',
      'Custom labels & filters',
      'Priority email support',
      'Recurring tasks',
      'Analytics dashboard'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 'Custom',
    billingPeriod: 'contact sales',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Advanced permissions',
      'Custom integrations',
      'Dedicated account manager',
      'SSO & security features',
      'On-premise option',
      '24/7 priority support'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
]
</script>

<template>
  <div>
    <Header />
    
    <!-- Pricing Header -->
    <section class="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p class="text-xl text-blue-100">Choose the plan that works best for you. No hidden fees.</p>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="plan in plans" 
            :key="plan.id"
            :class="['rounded-lg overflow-hidden transition-transform hover:scale-105', plan.highlighted ? 'md:scale-105 bg-white shadow-2xl' : 'bg-white shadow-lg']"
          >
            <!-- Card Header -->
            <div :class="['p-8', plan.highlighted ? 'bg-blue-600 text-white' : 'bg-gray-50']">
              <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
              <p :class="plan.highlighted ? 'text-blue-100' : 'text-gray-600'">{{ plan.description }}</p>
            </div>

            <!-- Pricing -->
            <div class="p-8 border-b">
              <div class="flex items-baseline mb-2">
                <span v-if="typeof plan.price === 'number'" class="text-4xl font-bold text-gray-900">${{ plan.price }}</span>
                <span v-else class="text-4xl font-bold text-gray-900">{{ plan.price }}</span>
                <span v-if="typeof plan.price === 'number'" class="text-gray-600 ml-2">/month</span>
              </div>
              <p class="text-gray-600">{{ plan.billingPeriod }}</p>
            </div>

            <!-- Features -->
            <div class="p-8">
              <ul class="space-y-4 mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700">{{ feature }}</span>
                </li>
              </ul>
              <button 
                :class="[
                  'w-full py-3 px-4 rounded-lg font-semibold transition-colors',
                  plan.highlighted 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                ]"
              >
                {{ plan.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-24 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div class="space-y-6">
          <div class="border-b pb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
            <p class="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
          </div>
          <div class="border-b pb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Is there a free trial for paid plans?</h3>
            <p class="text-gray-600">Yes! We offer a 14-day free trial for the Professional plan. No credit card required.</p>
          </div>
          <div class="border-b pb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
            <p class="text-gray-600">We offer a 30-day money-back guarantee if you're not satisfied with your subscription.</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
</style>
