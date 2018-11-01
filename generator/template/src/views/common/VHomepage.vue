<template>
  <div>
    <div style="text-align:center; margin-bottom:70px;">
      <h2>Hello, Welcome to come here.</h2>
      <h3>TIP: This is a beta version.</h3>
      <h3>Start your creation as much as you can.</h3>
    </div>
    <%_ if (ui === 'element' && echarts) { _%>
    <div style="display:flex; justify-content:center;">
      <v-chart
        :options="chartOption"
        style="width:100%;"
        auto-resize/>
    </div>
    <%_ } _%>
    <%_ if (ui === 'vuetify') { _%>
    <v-layout column>
      <v-flex justify-center>
        <v-tooltip right>
          <v-btn
            icon
            large
            :href="source"
            target="_blank"
            slot="activator">
            <v-icon large>code</v-icon>
          </v-btn>
          <span>Source</span>
        </v-tooltip>
      </v-flex>
      <%_ if (echarts) { _%>
      <v-flex>
        <v-chart
          style="width:100%;"
          :options="chartOption"
          auto-resize/>
      </v-flex>
      <%_ } _%>
    </v-layout>
    <%_ } _%>
  </div>
</template>

<script>
<%_ if (echarts) { _%>
/* eslint-disable import/no-extraneous-dependencies */
import echarts from 'echarts/lib/echarts';

<%_ } _%>
export default {
  name: 'Homepage',
  data() {
    return {
      <%_ if (ui === 'vuetify') { _%>
      source: 'https://github.com/vasttian/vue-cli-plugin-basis/blob/master/generator/template/src/views/common/VHomepage.vue',
      <%_ } _%>
      <%_ if (echarts) { _%>
      chartOption: {
        backgroundColor: '#394056',
        title: {
          text: 'DEMO',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3',
          },
          left: 10,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['A', 'B', 'C'],
          right: 20,
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3',
          },
        },
        grid: {
          left: '3%',
          right: 20,
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
            data: [
              '14:00',
              '14:10',
              '14:20',
              '14:30',
              '14:40',
              '14:50',
              '15:00',
              '15:10',
              '15:20',
              '15:30',
              '15:40',
              '15:50',
              '16:00',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '（%）',
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14,
              },
            },
            splitLine: {
              lineStyle: {
                color: '#57617B',
              },
            },
          },
        ],
        series: [
          {
            name: 'A',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)',
                    },
                  ],
                  false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(137, 189, 27)',
                borderColor: 'rgba(137, 189, 2, 0.27)',
                borderWidth: 12,
              },
            },
            data: [200, 182, 180, 194, 140, 150, 110, 125, 165, 130, 160, 120, 156],
          },
          {
            name: 'B',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 136, 212, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)',
                    },
                  ],
                  false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(0, 136, 212)',
                borderColor: 'rgba(0, 136, 212, 0.2)',
                borderWidth: 12,
              },
            },
            data: [120, 100, 125, 125, 152, 165, 132, 213, 182, 191, 134, 150, 146],
          },
          {
            name: 'C',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.3)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)',
                    },
                  ],
                  false,
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(219, 50, 51)',
                borderColor: 'rgba(219, 50, 51, 0.2)',
                borderWidth: 12,
              },
            },
            data: [200, 182, 135, 145, 132, 200, 154, 150, 120, 130, 180, 132, 140],
          },
        ],
      },
      <%_ } _%>
    };
  },
  methods: {
  },
};
</script>

