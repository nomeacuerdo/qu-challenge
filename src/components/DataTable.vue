<template>
  <table>
    <thead>
      <tr>
        <td>
          <span
            :class="{
              active: planetStore.sortField == 'id',
              asc: planetStore.sortCrit == 'asc',
              desc: planetStore.sortCrit == 'desc',
            }"
            @click="planetStore.sort('id')"
          >
            id
          </span>
        </td>
        <td>
          <span
            :class="{
              active: (planetStore.sortField == 'name'),
              asc: (planetStore.sortCrit == 'asc'),
              desc: (planetStore.sortCrit == 'desc'),
            }"
            @click="planetStore.sort('name')"
          >
            Planet
          </span>
        </td>
        <td>Climate</td>
        <td>
          <span
            :class="{
              active: (planetStore.sortField == 'rotation_period'),
              asc: (planetStore.sortCrit == 'asc'),
              desc: (planetStore.sortCrit == 'desc'),
            }"
            @click="planetStore.sort('rotation_period')"
          >
            Rotation period
          </span>
        </td>
        <td>URL</td>
      </tr>
    </thead>
    <tbody>
      <tr v-bind:key="planet.id" v-for="planet in planetStore.results">
        <td>{{ planet.id }}</td>
        <td>{{ planet.name }}</td>
        <td>{{ planet.climate }}</td>
        <td>{{ planet.rotation_period }}</td>
        <td>
          <a href="{{ planet.url }}" target="_blank">
            {{ planet.url }}
          </a>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">
          <span v-if="planetStore.count > 0">Results {{ planetStore.currentResultsCount }} out of </span>
          {{ planetStore.count }} total results.
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="nav-icons">
            <button
              :disabled="!planetStore.previous"
              @click="fetchData(planetStore.previous)"
            >
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              :disabled="!planetStore.next"
              @click="fetchData(planetStore.next)"
            >
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { usePlanetStore } from '@/stores/planetStore';

export default {
  setup() {
    const planetStore = usePlanetStore();
    return { planetStore };
  },
  data() {
    return {}
  },
  props: ["fetchData"],
}
</script>

<style scoped>
table {
  width: 80vw;
}
thead td {
  border: 0;
  border-bottom: 1px solid var(--color-border);
  margin: 0;
  font-weight: bold;
}
td:not(:last-child) {
  border-right: 1px solid var(--color-border);
  padding: 0.3rem 0.5rem;
}
tfoot tr:first-child td {
  border: 0;
  border-top: 1px solid var(--color-border);
  margin: 0;
}

h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
}

/* Sorting styles */
thead td span {
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: var(--green);
}

thead td span.active {
  color: var(--green);
}
thead td span.active.asc:after {
  content: '\e5c5';
  font-family: 'Material Symbols Outlined';
}
thead td span.active.desc:after {
  content: '\e5c7';
  font-family: 'Material Symbols Outlined';
}
</style>