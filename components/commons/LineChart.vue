<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    title: {
      type: String,
      required: true
    },
    labels: {
      type: Array,
      required: true
    },
    dataSets: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    baseData: {} // { '2020-10-10': 1000, '2020-10-11: 2000 }
  }),
  computed: {
    chartData() {
      return {
        data: {
          labels: this.labels,
          datasets: this.dataSets
        },
        options: {
          title: {
            display: true,
            text: this.title
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ scaleLabel: { display: true }, ticks: { autoSkip: false } }],
            yAxes: [{ ticks: { beginAtZero: false } }]
          }
        }
      }
    }
  },
  watch: {
    chartData: {
      handler() {
        this.renderChart(this.chartData.data, this.chartData.options)
      }
    }
  }
}
</script>

<style></style>
