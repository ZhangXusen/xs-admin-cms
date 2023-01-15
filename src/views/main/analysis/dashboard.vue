<!--
 *
 * @author: ZhangXusen
 * @since: 2023-01-09
 * dashboard.vue
-->
<template>
  <div class="dashboard">
    <!-- 顶部数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amount" :key="item">
        <el-col :span="6" :xs="24"><NumberData v-bind="item" /> </el-col
      ></template>
    </el-row>
    <!-- 中间数据 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <Card title="分类商品数量(饼图)">
          <PieEcharts :Data="GoodsCategoryCount" /> </Card
      ></el-col>
      <el-col :span="10"
        ><Card title="不同城市商品销量">
          <MapCharts :Data="GoodsAddressSale" /></Card
      ></el-col>
      <el-col :span="7"
        ><Card title="分类商品数量(玫瑰图)">
          <RoseEcharts :Data="GoodsCategoryCount" /> </Card
      ></el-col>
    </el-row>
    <!-- 底部 -->
    <el-row :gutter="10">
      <el-col :span="12"
        ><Card title="分类商品销量">
          <LineEcharts
            :labels="GoodsCategorySale.labels"
            :values="GoodsCategorySale.values"
          /> </Card></el-col
      ><el-col :span="12"
        ><Card title="分类商品收藏量">
          <BarEcharts
            :Labels="GoodsCategoryFavor.labels"
            :values="GoodsCategoryFavor.values"
          /> </Card></el-col
    ></el-row>
  </div>
</template>

<script setup lang="ts">
import Card from "@/base-ui/Card/card.vue";
import LineEcharts from "@/components/Charts/src/lineEcharts.vue";
import MapCharts from "@/components/Charts/src/mapCharts.vue";
import PieEcharts from "@/components/Charts/src/pieEcharts.vue";
import RoseEcharts from "@/components/Charts/src/roseEcharts.vue";
import useAnalysisStore from "@/stores/analysis/analysis";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const analysisStore = useAnalysisStore();
analysisStore.getAnalysisDataAction();

//analysisData
const {
  amount,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale,
} = storeToRefs(analysisStore);

const GoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item: any) => {
    return { name: item.name, value: item.goodsCount };
  });
});
const GoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item: any) => {
    return item.name;
  });
  const values = goodsCategorySale.value.map((item: any) => {
    return item.goodsCount;
  });
  return {
    labels,
    values,
  };
});
const GoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item: any) => item.name);
  const values = goodsCategoryFavor.value.map((item: any) => item.goodsFavor);
  return {
    labels,
    values,
  };
});
const GoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count };
  });
});
</script>

<style scoped lang="scss">
.el-col {
  margin-bottom: 20px;
}
</style>
