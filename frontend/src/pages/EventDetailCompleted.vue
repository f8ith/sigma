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
    <table class="table table-hover">
      <thead>
        <tr style="text-transform: capitalize">
          <th scope="col">Rank</th>
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
          :class="attendanceClasses[participant.status]"
        >
          <th scope="row">{{ participant.rank }}</th>
          <td v-for="property in participantProperties" :key="property">
            {{ participant[property] }}
          </td>
          <td>{{ participant[rankProperty] }}</td>
        </tr>
      </tbody>
    </table>

    <AppLink
      class="mx-2 btn btn-primary"
      name="edit-score"
      :params="{ id: eventData.id }"
      >Edit Scores</AppLink
    >
    <!--button type="button" class="mx-2 btn btn-primary"><i class="ion-gear-a"/> Edit Settings</button-->
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "EventDetail",
  setup() {
    const route = useRoute();
    const id = parseInt(route.params.id);
    const participantProperties = [
      "lane",
      "id",
      "class",
      "classNumber",
      "name",
      "gender",
      "house"
    ];
    const rankProperty = "time";
    const attendanceClasses = ref({
      present: "table-success",
      absent: "table-danger",
      exempt: "table-secondary"
    });
    const eventsData = [
      {
        id: 1,
        name: "100m Sprint",
        gender: "Men",
        group: "Grade A",
        type: "Heat",
        completed: true,
        participants: [
          {
            name: "John Apple",
            id: "S171001",
            gender: "M",
            house: "Suuyki",
            lane: 1,
            time: "9'80",
            status: "present",
            rank: 1
          },
          {
            name: "Chris Brook",
            id: "S171086",
            gender: "M",
            house: "Copland",
            lane: 2,
            time: "10'80",
            status: "present",
            rank: 2
          },
          {
            name: "Tim Cook",
            id: "S171003",
            gender: "M",
            house: "Laozi",
            lane: 6,
            status: "exempt",
            time: ""
          }
        ]
      },
      {
        id: 2,
        name: "100m Sprint",
        gender: "Men",
        group: "Grade A",
        type: "Finals",
        completed: true
      },
      {
        id: 3,
        name: "100m Sprint",
        gender: "Women",
        group: "Grade A",
        type: "Heat",
        completed: true
      },
      {
        id: 4,
        name: "100m Sprint",
        gender: "Women",
        group: "Grade A",
        type: "Finals",
        completed: false
      }
    ];
    let eventData = ref(eventsData.find((elements) => elements.id === id));
    if (eventData.value.completed) {
      eventData.value.participants.sort((a, b) => a.rank - b.rank);
    }
    var scanning = ref(false);
    function setPresent(participantId) {
      console.log(participantId);
      const participant = eventData.value.participants.find(
        (element) => element.id === participantId
      );
      console.log(participant);
      if (participant != undefined) {
        participant.status = "present";
      }
    }
    return {
      participantProperties,
      rankProperty,
      eventData,
      scanning,
      attendanceClasses,
      toggleScanning() {
        scanning.value = !scanning.value;
        console.log(scanning);
      },
      setPresent
    };
  }
});
</script>
