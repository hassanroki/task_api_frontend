<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
    <div class="space-y-3">
      <!-- Completion Rate -->
      <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <span class="text-sm text-gray-700">Completion Rate</span>
        <span class="text-lg font-bold text-blue-600">
          {{ completionRate }}%
        </span>
      </div>

      <!-- Tasks Today -->
      <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
        <span class="text-sm text-gray-700">Tasks Today</span>
        <span class="text-lg font-bold text-green-600">
          {{ tasksToday }}
        </span>
      </div>

      <!-- Overdue Tasks -->
      <div class="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
        <span class="text-sm text-gray-700">Overdue Tasks</span>
        <span class="text-lg font-bold text-orange-600">
          {{ overdueTasks }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalTasks: {
    type: Number,
    required: true
  },
  completedTasks: {
    type: Number,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
})

const completionRate = computed(() => {
  return props.totalTasks > 0 ? Math.round((props.completedTasks / props.totalTasks) * 100) : 0
})

const tasksToday = computed(() => {
  const today = new Date().toDateString()
  return props.tasks.filter(t => new Date(t.dueDate).toDateString() === today).length
})

const overdueTasks = computed(() => {
  const now = new Date()
  return props.tasks.filter(t => new Date(t.dueDate) < now && !t.completed).length
})
</script>
