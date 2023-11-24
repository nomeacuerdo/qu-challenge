<template>
  <main class="main-content">
    <div v-if="loading" class="loading-indicator">
      <span class="material-symbols-outlined">
        sync
      </span>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="planetStore" class="content" :class="{loading: loading}">
      <DataTable :fetchData="fetchData" />
    </div>
  </main>
</template>

<script lang="ts">
  import { usePlanetStore } from '@/stores/planetStore';
  import DataTable from '@/components/DataTable.vue';
  
  export default {
    setup() {
      const planetStore = usePlanetStore();
      return { planetStore };
    },
    data() {
      return {
        loading: false,
        error: null,
      }
    },
    components: {
      DataTable
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData(url?: string) {
        const requestUrl = url || '/api/planets/';
        const vm = this;

        vm.error = null;
        vm.loading = true;
        vm.planetStore.getPlanetData(requestUrl).then(() => {
          vm.loading = false;
        });
      },
    },
  }
</script>
