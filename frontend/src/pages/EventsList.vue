<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
    <div class="row mb-5">
      <div class="search-wrapper panel-heading col-sm-12">
        <input
          class="form-control"
          type="text"
          v-model="searchQuery"
          placeholder="Search"
        />
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="event in filteredData" :key="event.id" class="col">
        <div
          class="text-white card shadow rounded"
          :class="{
            'bg-secondary': event.completed,
            'bg-success': event.type === 'Heat' && !event.completed,
            'bg-warning': event.type === 'Finals' && !event.completed,
          }"
        >
          <div class="card-header">{{ event.gender }}'s {{ event.group }}</div>
          <div class="card-body">
            <AppLink
              class="
                h5
                text-decoration-none text-white
                card-title
                stretched-link
              "
              name="event"
              :params="{ id: event.id }"
              :id="event.id"
              >{{ event.name }}</AppLink
            >
          </div>
          <div class="card-footer">
            {{ event.type }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "EventsPage",
  setup() {
    let searchQuery = ref("");
    const eventsData = [
      {
        id: 1,
        name: "100m Sprint",
        gender: "Men",
        group: "Grade C",
        type: "Heat",
        completed: false,
      },
      {
        id: 2,
        name: "100m Sprint",
        gender: "Men",
        group: "Grade A",
        type: "Finals",
        completed: true,
      },
      {
        id: 3,
        name: "100m Sprint",
        gender: "Women",
        group: "Grade A",
        type: "Heat",
        completed: true,
      },
      {
        id: 4,
        name: "100m Sprint",
        gender: "Women",
        group: "Grade A",
        type: "Finals",
        completed: false,
      },
    ];

    const filteredData = computed(() =>
      eventsData.filter((data) =>
        data.group.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

    return {
      searchQuery,
      filteredData,
    };
  },
});
</script>
