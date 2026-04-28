<template>
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4" :style="{ borderLeftColor: borderColor }">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 text-sm font-medium">{{ label }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
      </div>
      <div class="p-3 rounded-full" :style="{ backgroundColor: bgColor }">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  borderColor: {
    type: String,
    default: '#3b82f6'
  },
  bgColor: {
    type: String,
    default: '#dbeafe'
  }
})
</script>
