<template>
  <div class="p-4 hover:bg-gray-50 transition duration-150 border-b border-gray-100 last:border-b-0">
    <div class="flex items-start space-x-4">
      <!-- Checkbox -->
      <input
        type="checkbox"
        :checked="task.status === 'done'"
        @change="$emit('toggle-complete')"
        class="mt-1 w-5 h-5 text-indigo-600 rounded cursor-pointer"
      />

      <!-- Task Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <h3
            :class="[
              'text-lg font-semibold',
              task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-900'
            ]"
          >
            {{ task.title }}
          </h3>
          <span :class="['text-xs px-2 py-1 rounded-full font-medium', getStatusColor(task.status)]">
            {{ formatStatus(task.status) }}
          </span>
        </div>
        <p v-if="task.description" class="mt-1 text-sm text-gray-600">
          {{ task.description }}
        </p>

        <!-- Tags and Metadata -->
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span :class="['text-xs px-2 py-1 rounded-full font-medium', getTypeColor(task.task_type)]">
            {{ formatTaskType(task.task_type) }}
          </span>
          <span class="text-xs text-gray-600 flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{{ formatDate(task.created_at) }}</span>
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('edit')"
          class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
          title="Edit task"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button
          @click="$emit('delete')"
          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
          title="Delete task"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['toggle-complete', 'edit', 'delete'])

const getStatusColor = (status) => {
  const colors = {
    'done': 'bg-green-100 text-green-800',
    'inprogress': 'bg-blue-100 text-blue-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getTypeColor = (taskType) => {
  const colors = {
    'published': 'bg-purple-100 text-purple-800',
    'secret': 'bg-indigo-100 text-indigo-800'
  }
  return colors[taskType] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status) => {
  const statusMap = {
    'done': 'Done',
    'inprogress': 'In Progress',
    'pending': 'Pending'
  }
  return statusMap[status] || status.charAt(0).toUpperCase() + status.slice(1)
}

const formatTaskType = (taskType) => {
  const typeMap = {
    'published': 'Published',
    'secret': 'Secret'
  }
  return typeMap[taskType] || taskType.charAt(0).toUpperCase() + taskType.slice(1)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
