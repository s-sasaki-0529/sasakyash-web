<script>
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs'

export default {
  extends: Line,
  props: {
    baseData: {
      type: Object, // { '2020-10-10': 1000, '2020-10-11: 2000 }
      required: true,
    },
  },
  computed: {
    dayLabels() {
      return Object.keys(this.baseData)
    },
    shortDayLabels() {
      return this.dayLabels.map((dayLabel) => dayjs(dayLabel).date())
    },
    realBalanceValues() {
      const today = dayjs().startOf('day')
      let balance = this.publicBudget

      return this.dayLabels.map((dayLabel) => {
        const day = dayjs(dayLabel)
        if (day <= today) {
          balance -= this.baseData[dayLabel]
          return balance
        } else {
          return null // 未来はグラフに描画しない
        }
      })
    },
    publicBudget() {
      return Number(process.env.publicBudget)
    },
    chartData() {
      return {
        data: {
          labels: this.shortDayLabels,
          datasets: [
            {
              label: '現実',
              data: this.realBalanceValues,
              fill: true,
              borderColor: 'rgba(239,39,91,0.3)',
              backgroundColor: 'rgba(239,39,91,0.3)',
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '[公費] 今月の支出状況',
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ scaleLabel: { display: true } }],
            yAxes: [{ ticks: { beginAtZero: false } }],
          },
        },
      }
    },
  },
  mounted() {
    this.renderChart(this.chartData.data, this.chartData.options)
  },
}
</script>

<style></style>
