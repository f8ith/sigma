<template>
  <div class="my-4 w-100">
    <vue3-chart-js v-bind="{ ...barChart }" />
  </div>
</template>

<script lang="ts">
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Standings',
  components: {
    Vue3ChartJs,
  },
  setup () {
    // eslint-disable-next-line no-unused-vars
    const barChart = {
      type: 'bar',
      responsive: true,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
            },
          }],
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      data: {
        labels: [
          'Ghandi',
          'Lao-Zi',
          'Suukyi',
          'Austen',
          'Copland',
          'Newton',
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034,
          ],
          backgroundColor: ['orange', 'blue', 'yellow', 'green', 'red', 'purple'],
          pointBackgroundColor: '#007bff',
        }],
      },
    }
    return {
      barChart,
    }
  },
})
</script>
