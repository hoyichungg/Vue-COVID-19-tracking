<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-container>
            <h1>COVID-19 Tracking Dashboard</h1>

            <v-tabs v-model="tab" background-color="black" dark>
              <v-tab v-for="item in labels" :key="item" :href="`#${item}`">
                {{ item }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="chartData in renderData"
                :key="chartData.id"
                :value="chartData.label"
              >
                <v-card flat>
                  <v-row v-if="arrPositive.length">
                    <v-col cols="12">
                      <h2>{{ chartData.label }}</h2>
                      <LineChart
                        :chartData="chartData.data"
                        :options="chartOptions"
                        :label="chartData.label"
                        :chartColorOptions="chartData.chartColorOptions"
                      />
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LineChart from "./components/LineChart";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "App",

  components: {
    LineChart,
  },

  data() {
    return {
      arrPositive: [],
      arrHoptialized: [],
      arrInIcu: [],
      arrOnVentilators: [],
      arrRecovered: [],
      arrDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      tab: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" },
        { tab: "Three", content: "Tab 3 Content" },
        { tab: "Four", content: "Tab 4 Content" },
        { tab: "Five", content: "Tab 5 Content" },
        { tab: "Six", content: "Tab 6 Content" },
        { tab: "Seven", content: "Tab 7 Content" },
        { tab: "Eight", content: "Tab 8 Content" },
        { tab: "Nine", content: "Tab 9 Content" },
        { tab: "Ten", content: "Tab 10 Content" },
      ],
      labels: [
        "Positive",
        "Hoptialized",
        "InIcu",
        "OnVentilators",
        "Recovered",
        "Deaths",
      ],
    };
  },
  async created() {
    // 利用解構的方式取出axios拿到的data
    let { data } = await axios.get("/api");
    
    console.log(data)
    // 只取最近一個月的資料
    data = data.slice(0, 30);

    // 迭代陣列中的每個元素
    data.forEach((item) => {
      const date = dayjs(`${item.date}`).format("YYYY/MM/DD");

      // 利用解構的方式取出data內我們需要的值
      const {
        positive,
        hospitalizedCurrently,
        inIcuCurrently,
        recovered,
        onVentilatorCurrently,
        death,
      } = item;

      // 將值推進對應的陣列，每一個值都需要對應一個日期，所以要以物件的方式傳入
      this.arrPositive.push({ date, total: positive });
      this.arrHoptialized.push({ date, total: hospitalizedCurrently });
      this.arrDeaths.push({ data, total: death });
      this.arrRecovered.push({ date, total: recovered });
      this.arrOnVentilators.push({ date, total: onVentilatorCurrently });
      this.arrInIcu.push({ data, total: inIcuCurrently });
    });
  },
  computed: {
    renderData() {
      // 利用解構的方式從this中取出我們要用到的所有陣列
      const {
        arrPositive,
        arrHoptialized,
        arrInIcu,
        arrOnVentilators,
        arrRecovered,
        arrDeaths,
        labels,
      } = this;

      // 將所有要輸出的陣列整理為一個，做為最終迭代的對象
      const displayedDataArr = [
        arrPositive,
        arrHoptialized,
        arrInIcu,
        arrOnVentilators,
        arrRecovered,
        arrDeaths,
      ];

      // 設置每個圖表的背景與邊界顏色
      const chartColorOptions = [
        {
          borderColor: "#EF5350",
          backgroundColor: "rgba(255, 56, 96, 0.1)",
        },
        {
          borderColor: "#FFF176",
          backgroundColor: "rgba(191, 182, 63, 0.1)",
        },
        {
          borderColor: "#FFB74D",
          backgroundColor: "rgba(239, 109, 9, 0.1)",
        },
        {
          borderColor: "#B3E5FC",
          backgroundColor: "rgba(9, 140, 239, 0.1)",
        },
        {
          borderColor: "#00E676",
          backgroundColor: "rgba(11, 227, 47, 0.1)",
        },
        {
          borderColor: "#E30B86",
          backgroundColor: "rgba(239, 9, 140, 0.1)",
        },
      ];

      // 最終整理成一個陣列，每一個元素都包含標籤名稱、資料以及圖表顏色的設定
      return displayedDataArr.map((data, index) => ({
        label: labels[index],
        data,
        chartColorOptions: chartColorOptions[index],
      }));
    },
  },
};
</script>
