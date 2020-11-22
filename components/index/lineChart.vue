<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data() {
    return {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'line label A',
            data: [10, 20, 30, 40, 50, 30],
            fill: false,
          },
          {
            label: 'line label B',
            data: [10, 50, 20, 30, 30, 40],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 5,
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
}
</script>

<style></style>
