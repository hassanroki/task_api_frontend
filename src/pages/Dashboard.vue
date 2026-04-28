<script setup>
import { onMounted } from 'vue'
import { useTasks } from '@/composables/useTasks'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'
import DashboardStats from '@/components/Dashboard/DashboardStats.vue'
import TaskList from '@/components/Dashboard/TaskList.vue'
import TaskForm from '@/components/Dashboard/TaskForm.vue'
import QuickStatsPanel from '@/components/Dashboard/QuickStatsPanel.vue'

// Use task composable
const {
  tasks,
  showForm,
  formData,
  loading,
  error,
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriorityTasks,
  fetchTasks,
  addTask,
  editTask,
  updateTask,
  deleteTask,
  toggleComplete,
  openFormForNew,
  closeForm
} = useTasks()

// Fetch tasks on component mount
onMounted(() => {
  fetchTasks()
})

// Handle form submission
const handleFormSubmit = (taskData) => {
  if (taskData.id) {
    updateTask(taskData)
  } else {
    addTask(taskData)
  }
}

// Handle task deletion with confirmation
const handleDeleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTask(id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header Section -->
    <DashboardHeader @add-task="openFormForNew" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div class="h-32 bg-white rounded-lg animate-pulse"></div>
        <div class="h-96 bg-white rounded-lg animate-pulse"></div>
      </div>

      <!-- Main Content -->
      <template v-else>
        <!-- Stats Section -->
        <DashboardStats
          :total-tasks="totalTasks"
          :pending-tasks="pendingTasks"
          :completed-tasks="completedTasks"
          :high-priority-tasks="highPriorityTasks"
        />

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <!-- Tasks List -->
          <div class="lg:col-span-2">
            <TaskList
              :tasks="tasks"
              @toggle-complete="toggleComplete"
              @edit="editTask"
              @delete="handleDeleteTask"
            />
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <QuickStatsPanel
              :total-tasks="totalTasks"
              :completed-tasks="completedTasks"
              :tasks="tasks"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Task Form Modal -->
    <TaskForm
      :is-open="showForm"
      :initial-data="formData"
      @close="closeForm"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<style scoped>
</style>