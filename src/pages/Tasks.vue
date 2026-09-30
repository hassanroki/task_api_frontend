<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const filterStatus = ref("all");
const searchQuery = ref("");
const tasks = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const perPage = 10;

const fetchTasks = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "http://127.0.0.1:8081/api/task-list",
    );
    tasks.value = response.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTasks();
});

const filteredTasks = computed(() => {
  currentPage.value = 1;
  return tasks.value.filter((task) => {
    const matchesStatus =
      filterStatus.value === "all" || task.status === filterStatus.value;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (task.description ?? "")
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });
});

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredTasks.value.slice(start, start + perPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTasks.value.length / perPage),
);
const pageNumbers = computed(() =>
  Array.from({ length: totalPages.value }, (_, i) => i + 1),
);

const taskStats = computed(() => ({
  total: tasks.value.length,
  done: tasks.value.filter((t) => t.status === "done").length,
  inprogress: tasks.value.filter((t) => t.status === "inprogress").length,
  pending: tasks.value.filter((t) => t.status === "pending").length,
}));

const getStatusConfig = (status) => {
  switch (status) {
    case "done":
      return {
        label: "Done",
        icon: "✓",
        badge: "bg-green-100 text-green-800",
        dot: "bg-green-500",
      };
    case "inprogress":
      return {
        label: "In Progress",
        icon: "↻",
        badge: "bg-blue-100 text-blue-800",
        dot: "bg-blue-500",
      };
    case "pending":
      return {
        label: "Pending",
        icon: "◷",
        badge: "bg-amber-100 text-amber-800",
        dot: "bg-amber-400",
      };
    default:
      return {
        label: status,
        icon: "−",
        badge: "bg-gray-100 text-gray-600",
        dot: "bg-gray-400",
      };
  }
};

const getInitials = (name) =>
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <!-- Hero -->
    <section class="bg-gray-900 pt-12 pb-10">
      <div class="max-w-4xl mx-auto px-6">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1
              class="text-4xl font-bold text-white tracking-tight leading-tight"
            >
              Task Management
            </h1>
            <p class="mt-2 text-sm text-gray-400">
              Track, filter, and manage all your tasks in one place.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-6 py-5">
        <div
          class="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-xl overflow-hidden divide-x divide-y md:divide-y-0 divide-gray-100"
        >
          <div class="px-5 py-4">
            <span
              class="block text-3xl font-bold text-gray-900 leading-none tracking-tight"
              >{{ taskStats.total }}</span
            >
            <span
              class="block text-xs font-semibold uppercase tracking-widest text-gray-400 mt-1.5"
              >Total</span
            >
          </div>
          <div class="px-5 py-4">
            <span
              class="block text-3xl font-bold text-green-600 leading-none tracking-tight"
              >{{ taskStats.done }}</span
            >
            <span
              class="block text-xs font-semibold uppercase tracking-widest text-green-400 mt-1.5"
              >Done</span
            >
          </div>
          <div class="px-5 py-4">
            <span
              class="block text-3xl font-bold text-blue-600 leading-none tracking-tight"
              >{{ taskStats.inprogress }}</span
            >
            <span
              class="block text-xs font-semibold uppercase tracking-widest text-blue-400 mt-1.5"
              >In Progress</span
            >
          </div>
          <div class="px-5 py-4">
            <span
              class="block text-3xl font-bold text-amber-500 leading-none tracking-tight"
              >{{ taskStats.pending }}</span
            >
            <span
              class="block text-xs font-semibold uppercase tracking-widest text-amber-400 mt-1.5"
              >Pending</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Bar -->
    <section
      class="bg-gray-50/80 backdrop-blur border-b border-gray-200 sticky top-0 z-10"
    >
      <div class="max-w-4xl mx-auto px-6 py-3.5">
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <!-- Search -->
          <div class="relative flex-1">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 20 20"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M15 15l3 3" stroke-linecap="round" />
            </svg>
            <input
              v-model="searchQuery"
              placeholder="Search by title or description…"
              class="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
            />
          </div>

          <!-- Filter Tabs -->
          <div
            class="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 shrink-0"
          >
            <button
              v-for="opt in ['all', 'done', 'inprogress', 'pending']"
              :key="opt"
              @click="filterStatus = opt"
              :class="[
                'text-xs font-semibold px-3 py-1.5 rounded-md transition-all duration-150',
                filterStatus === opt
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
              ]"
            >
              {{
                opt === "inprogress"
                  ? "In Progress"
                  : opt.charAt(0).toUpperCase() + opt.slice(1)
              }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="flex items-center justify-center p-6 w-full">
      <div
        class="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg animate-pulse"
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="h-10 w-24 bg-gray-200 rounded-lg"></div>
          <div class="h-6 w-32 bg-gray-200 rounded"></div>
        </div>

        <!-- Card blocks -->
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-3 w-20 bg-gray-200 rounded mb-2"></div>
            <div class="h-5 w-32 bg-gray-300 rounded"></div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-3 w-24 bg-gray-200 rounded mb-2"></div>
            <div class="h-5 w-full bg-gray-300 rounded"></div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-3 w-28 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
            <div class="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-3 w-16 bg-gray-200 rounded mb-2"></div>
            <div class="h-6 w-24 bg-gray-300 rounded-full"></div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="h-3 w-24 bg-gray-200 rounded mb-2"></div>
            <div class="h-5 w-28 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else class="max-w-4xl mx-auto px-6 py-8 pb-16">
      <!-- Empty State -->
      <div
        v-if="paginatedTasks.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <span class="text-4xl mb-4">📋</span>
        <h3 class="text-base font-semibold text-gray-700 mb-1">
          No tasks found
        </h3>
        <p class="text-sm text-gray-400">
          Try adjusting your search or filter.
        </p>
      </div>

      <!-- Task Cards -->
      <div v-else class="flex flex-col gap-3">
        <div
          v-for="task in paginatedTasks"
          :key="task.id"
          class="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-start gap-4 hover:shadow-md hover:border-gray-200 hover:-translate-y-px transition-all duration-200 group"
        >
          <!-- Status Dot -->
          <div class="pt-1.5 shrink-0">
            <span
              :class="[
                'block w-2.5 h-2.5 rounded-full',
                getStatusConfig(task.status).dot,
              ]"
            ></span>
          </div>

          <!-- Body -->
          <div class="flex-1 min-w-0">
            <div
              class="flex flex-wrap items-center justify-between gap-2 mb-1.5"
            >
              <h2 class="text-sm font-semibold text-gray-900 truncate">
                {{ task.title }}
              </h2>
              <span
                :class="[
                  'inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0',
                  getStatusConfig(task.status).badge,
                ]"
              >
                {{ getStatusConfig(task.status).icon }}
                {{ getStatusConfig(task.status).label }}
              </span>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3 text-justify">
              {{ task.description ?? "No description provided." }}
            </p>

            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="flex items-center gap-2">
                <div
                  class="w-6 h-6 rounded-full bg-violet-100 text-violet-800 text-[10px] font-bold flex items-center justify-center shrink-0"
                >
                  {{ getInitials(task.user?.name) }}
                </div>
                <span class="text-xs font-medium text-gray-500">{{
                  task.user?.name
                }}</span>
              </div>
              <span class="text-xs text-gray-400">{{
                formatDate(task.created_at)
              }}</span>
            </div>
          </div>

          <!-- View Button -->
          <div class="shrink-0 self-center">
            <RouterLink
              :to="`/task-detail/${task.id}`"
              class="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 border border-gray-200 px-3.5 py-2 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 active:scale-95 transition-all duration-150 group/btn"
            >
              View
              <span
                class="group-hover/btn:translate-x-0.5 transition-transform duration-150 inline-block"
                >→</span
              >
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-1.5 mt-8 flex-wrap"
      >
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="text-xs font-medium px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Prev
        </button>

        <button
          v-for="page in pageNumbers"
          :key="page"
          @click="currentPage = page"
          :class="[
            'text-xs font-medium px-3.5 py-2 rounded-lg border transition',
            currentPage === page
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="text-xs font-medium px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next →
        </button>
      </div>

      <!-- Page Info -->
      <p
        v-if="filteredTasks.length > 0"
        class="text-center text-xs text-gray-400 mt-4"
      >
        Showing {{ (currentPage - 1) * perPage + 1 }}–{{
          Math.min(currentPage * perPage, filteredTasks.length)
        }}
        of {{ filteredTasks.length }} tasks
      </p>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
