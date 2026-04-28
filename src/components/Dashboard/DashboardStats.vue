<script setup>
import StatsCard from "./StatsCard.vue";

defineProps({
  totalTasks: {
    type: Number,
    required: true,
  },
  pendingTasks: {
    type: Number,
    required: true,
  },
  completedTasks: {
    type: Number,
    required: true,
  },
  highPriorityTasks: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <!-- Total Tasks -->
    <StatsCard
      label="Total Tasks"
      :value="totalTasks"
      border-color="#3b82f6"
      bg-color="#dbeafe"
    >
      <template #icon>
        <svg
          class="w-6 h-6 text-blue-600"
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
      </template>
    </StatsCard>

    <!-- Pending Tasks -->
    <StatsCard
      label="Pending"
      :value="pendingTasks"
      border-color="#eab308"
      bg-color="#fef3c7"
    >
      <template #icon>
        <svg
          class="w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </template>
    </StatsCard>

    <!-- Completed Tasks -->
    <StatsCard
      label="Completed"
      :value="completedTasks"
      border-color="#22c55e"
      bg-color="#dcfce7"
    >
      <template #icon>
        <svg
          class="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </template>
    </StatsCard>

    <!-- High Priority -->
    <StatsCard
      label="High Priority"
      :value="highPriorityTasks"
      border-color="#ef4444"
      bg-color="#fee2e2"
    >
      <template #icon>
        <svg
          class="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4v2m0 4v2M6.34 20H3.46a2 2 0 01-2-2V8a2 2 0 012-2h3.58a2 2 0 012 2v10a2 2 0 01-2 2z"
          ></path>
        </svg>
      </template>
    </StatsCard>
  </div>
</template>
