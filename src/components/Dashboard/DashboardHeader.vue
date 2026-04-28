<script setup>
defineEmits(["add-task"]);
</script>

<template>
  <div class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <!-- Title -->
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p class="mt-1 text-sm sm:text-base text-gray-600">
            Welcome back! Manage your tasks efficiently
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex items-center gap-3">
          <!-- Add Task -->
          <button
            @click="$emit('add-task')"
            class="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 bg-indigo-600 text-white text-sm sm:text-base rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
          >
            <span class="text-lg leading-none">+</span>
            <span class="hidden xs:inline sm:inline">Add New Task</span>
            <span class="xs:hidden sm:hidden">Add Task</span>
          </button>

          <!-- Logout -->
          <router-link
            to="/logout"
            class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-red-600 transition duration-200 font-medium border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>