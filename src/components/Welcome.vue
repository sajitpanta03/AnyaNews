<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in store.state.anyaData.data" :key="item.id">
        <a href="#">
          <img class="rounded-t-lg" :src="item.image" alt="" />
        </a>

        <div v-if="store.state.loading">Loading...</div>
        <div v-else-if="store.state.error">Error: {{ store.state.error }}</div>
        <div class="p-5" v-else>
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ item.title }}
            </h5>
            <p class="text-gray-800">{{ item.publisher_name }}</p>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
          <RouterLink
              :to="'/news/' + item.id"
              @click="() => store.fetchSingleAnyaData(item.id)"
              class="inline-flex items-center font-medium text-sky-200 dark:text-primary-500 hover:underline"
            >
          <a
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnyaStore } from "@/stores/anyaStore";
import { onMounted } from "vue";

const store = useAnyaStore();

const titleLengthAdjust = () => {
  store.state.anyaData.data.forEach((item) => {
    if (item.title.length > 50) {
      item.title = item.title.substring(0, 50) + '...';
    }
  });
};


onMounted(() => {
  store.fetchAnyaData().then(() => {
    titleLengthAdjust();
  });
});
</script>
