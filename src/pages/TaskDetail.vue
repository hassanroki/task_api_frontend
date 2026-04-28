<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const postID = route.params.id;

const post = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get(
      `https://task-backend.larasoftbd.com/api/task-list/${postID}`,
    );
    post.value = res.data.data; // ⚠️ important
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});

const back = () => {
  router.go(-1);
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

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

    <!-- Content -->
    <main v-else class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            class="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg"
            @click="back"
          >
            ← Back
          </button>

          <h1 class="text-xl font-bold text-gray-700">Task Details</h1>
        </div>

        <!-- Data -->
        <div v-if="post" class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">Title</p>
            <h2 class="text-lg font-semibold">{{ post.title }}</h2>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg text-justify">
            <p class="text-sm text-gray-500 text-justify">Description</p>
            <p class="text-gray-700">
              {{ post.description || "No description provided" }}
            </p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">Status</p>
            <span
              class="px-3 py-1 rounded-full text-sm font-semibold"
              :class="{
                'bg-green-100 text-green-700': post.status === 'done',
                'bg-blue-100 text-blue-700': post.status === 'inprogress',
                'bg-yellow-100 text-yellow-700': post.status === 'pending',
              }"
            >
              {{ post.status }}
            </span>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">Created By</p>
            <p class="text-gray-700">
              {{ post.user?.name || "Unknown" }}
            </p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-500">Created At</p>
            <p class="text-gray-700">
              {{ formatDate(post.created_at) }}
            </p>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="text-center text-gray-400">Task not found</div>
      </div>
    </main>

    <Footer />
  </div>
</template>
<style scoped></style>
