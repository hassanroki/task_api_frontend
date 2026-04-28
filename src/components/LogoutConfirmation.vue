<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900">
            <svg class="inline-block w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 4v2m0-14a9 9 0 110 18 9 9 0 010-18z"></path>
            </svg>
            Confirm Logout?
          </h3>
          <button
            @click="$emit('cancel')"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <p class="text-gray-700 mb-4">
            Are you sure you want to logout? You will need to sign in again to access your dashboard.
          </p>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p class="text-sm text-yellow-800">
              <span class="font-semibold">Tip:</span> Make sure to save any unsaved work before logging out.
            </p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-200 flex space-x-3">
          <button
            @click="$emit('cancel')"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            @click="handleLogout"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium"
          >
            {{ isLoading ? 'Logging out...' : 'Logout' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { clearSessionData } from '@/utils/logoutHelper'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const router = useRouter()
const isLoading = ref(false)

const handleLogout = async () => {
  isLoading.value = true
  
  // Simulate logout process
  setTimeout(async () => {
    // Clear session data
    clearSessionData()
    
    // Emit confirm event
    emit('confirm')
    
    // Navigate to logout page
    await router.push('/logout')
  }, 500)
}
</script>
