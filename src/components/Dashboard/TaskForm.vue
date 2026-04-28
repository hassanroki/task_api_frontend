
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const editingId = ref(null)
const formData = ref({
  title: '',
  description: '',
  status: 'pending',
  task_type: 'secret'
})
const errors = ref({})

// Watch for changes to isOpen and initialData
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.initialData) {
    editingId.value = props.initialData.id
    formData.value = { ...props.initialData }
  } else if (!newVal) {
    resetForm()
  }
})

const validateForm = () => {
  errors.value = {}
  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }
  return Object.keys(errors.value).length === 0
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    status: 'pending',
    task_type: 'secret'
  }
  editingId.value = null
  errors.value = {}
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', {
    ...formData.value,
    id: editingId.value
  })
  handleClose()
}

const handleClose = () => {
  emit('close')
}
</script>
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900">
            {{ editingId ? 'Edit Task' : 'Create New Task' }}
          </h3>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-4">
          <!-- Title Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="Enter task title"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Description Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="formData.description"
              placeholder="Enter task description (optional)"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <!-- Status Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <!-- Task Type Select -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
            <select
              v-model="formData.task_type"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="secret">Secret (Private)</option>
              <option value="published">Published (Public)</option>
            </select>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-200 flex space-x-3">
          <button
            @click="handleClose"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            {{ editingId ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

