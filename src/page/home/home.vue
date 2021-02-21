<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import * as echarts from "echarts"
export default {
  data() {
    return {
      dataArr: []
    }
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqChangeList: "cate/reqChangeList"
    }),
  },
  watch: {
    list: {
      handler() {
        for(let i=0; i<this.list.length; i++) {
          var obj = {};
          obj.value = this.list[i].children.length;
          obj.name = this.list[i].catename;
          this.dataArr.push(obj);
        }

        var myChart = echarts.init(document.getElementById('main'));
        var option = {
          tooltip: {
              trigger: 'item'
          },
          legend: {
              top: '5%',
              left: 'center'
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                      borderRadius: 10,
                      borderColor: '#fff',
                      borderWidth: 2
                  },
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '40',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: this.dataArr
              }
          ]
      };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true
    },
  },
  mounted() {
    this.reqChangeList()
  }
}
</script>

<style scoped>
  #main {
    width: 80%;
    height: 400px;
  }
</style>