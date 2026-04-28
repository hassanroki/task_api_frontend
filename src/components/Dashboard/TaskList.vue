<script setup>
import TaskItem from "./TaskItem.vue";

defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

defineEmits(["toggle-complete", "edit", "delete"]);
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <h2 class="text-xl font-bold text-gray-900">Task List</h2>
    </div>

    <!-- Empty State -->
    <div v-if="tasks.length === 0" class="p-12 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        ></path>
      </svg>
      <p class="mt-4 text-gray-600">No tasks yet. Create one to get started!</p>
    </div>

    <!-- Task Items -->
    <div v-else class="divide-y divide-gray-200">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-complete="$emit('toggle-complete', task.id)"
        @edit="$emit('edit', task)"
        @delete="$emit('delete', task.id)"
      />
    </div>
  </div>
</template>

<style scoped></style>
