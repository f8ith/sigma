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
    <table class="table-responsive table table-hover">
      <thead>
        <tr style="text-transform: capitalize">
          <th scope="col">Lane</th>
          <th
            scope="col"
            v-for="(property, $index) in participantProperties"
            :key="$index"
          >
            {{ property.normalize() }}
          </th>
          <th>{{ rankProperty }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="participant in eventData.participants"
          :key="participant.lane"
        >
          <th scope="row">{{ participant.lane }}</th>
          <td v-for="property in participantProperties" :key="property">
            {{ participant[property] }}
          </td>
          <td contenteditable="true">{{ participant[rankProperty] }}</td>
        </tr>
      </tbody>
    </table>

    <AppLink
      class="mx-2 btn btn-success"
      name="submit-score"
      :params="{ id: eventData.id }"
      >Confirm</AppLink
    >
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "EventDetail",
  setup(props) {
    const route = useRoute();
    const id = parseInt(route.params.id);
    const participantProperties = ["id", "name", "gender", "house"];
    const rankProperty = "time";
    const eventsData = [
      {
        id: 1,
        name: "100m Sprint",
        gender: "Men",
        group: "Grade A",
        type: "Heat",
        completed: false,
        participants: [
          {
            name: "John Apple",
            id: "s171001",
            gender: "M",
            house: "Suuyki",
            lane: 1,
            time: "",
          },
          {
            name: "Chris Brook",
            id: "s171002",
            gender: "M",
            house: "Copland",
            lane: 2,
            time: "",
          },
          {
            name: "Tim Cook",
            id: "s171003",
            gender: "M",
            house: "Laozi",
            lane: 6,
            time: "",
          },
        ],
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
    let eventData = eventsData.find((elements) => elements.id === id);
    return {
      participantProperties,
      rankProperty,
      eventData,
    };
  },
});
</script>
