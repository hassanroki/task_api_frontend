import { ref, computed } from "vue";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://task-backend.larasoftbd.com/api";

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor - auth token auto attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function useTasks(initialTasks = []) {
  const tasks = ref([...initialTasks]);
  const showForm = ref(false);
  const formData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const totalTasks = computed(() => tasks.value.length);
  const completedTasks = computed(
    () => tasks.value.filter((t) => t.status === "done").length,
  );
  const pendingTasks = computed(
    () => tasks.value.filter((t) => t.status !== "done").length,
  );
  const highPriorityTasks = computed(
    () =>
      tasks.value.filter(
        (t) => t.task_type === "published" && t.status !== "done",
      ).length,
  );

  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("https://task-backend.larasoftbd.com/api/tasks");
      tasks.value = Array.isArray(data.data) ? data.data : data;
    } catch (err) {
      console.error("Error fetching tasks:", err);
      error.value = err.response?.data?.message || err.message;
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (taskData) => {
    try {
      const { data } = await api.post("https://task-backend.larasoftbd.com/api/tasks", {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "pending",
        task_type: taskData.task_type || "secret",
      });
      tasks.value.push(data.data || data);
      showForm.value = false;
      formData.value = null;
    } catch (err) {
      console.error("Error adding task:", err);
      error.value = err.response?.data?.message || err.message;
    }
  };

  const editTask = (task) => {
    formData.value = { ...task };
    showForm.value = true;
  };

  const updateTask = async (taskData) => {
    try {
      const { data } = await api.put(`https://task-backend.larasoftbd.com/api/tasks/${taskData.id}`, {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status || "pending",
        task_type: taskData.task_type || "secret",
      });
      const index = tasks.value.findIndex((t) => t.id === taskData.id);
      if (index !== -1) {
        tasks.value[index] = data.data || data;
      }
      showForm.value = false;
      formData.value = null;
    } catch (err) {
      console.error("Error updating task:", err);
      error.value = err.response?.data?.message || err.message;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`https://task-backend.larasoftbd.com/api/tasks/${id}`);
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      console.error("Error deleting task:", err);
      error.value = err.response?.data?.message || err.message;
    }
  };

  const toggleComplete = async (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      const newStatus = task.status === "done" ? "pending" : "done";
      try {
        await api.put(`https://task-backend.larasoftbd.com/api/tasks/${id}`, { status: newStatus });
        task.status = newStatus;
      } catch (err) {
        console.error("Error toggling task:", err);
        error.value = err.response?.data?.message || err.message;
      }
    }
  };

  const openFormForNew = () => {
    formData.value = null;
    showForm.value = true;
  };

  const closeForm = () => {
    showForm.value = false;
    formData.value = null;
  };

  return {
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
    closeForm,
  };
}
