import {
  getAmountListData,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale,
} from "@/service/system/analysis/analysis";
import { defineStore } from "pinia";
interface AnalysisState {
  amount: any[];
  goodsCategoryCount: any[];
  goodsCategorySale: any[];
  goodsCategoryFavor: any[];
  goodsAddressSale: any[];
}
const useAnalysisStore = defineStore("analysis", {
  state: (): AnalysisState => ({
    amount: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: [],
  }),
  actions: {
    getAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amount = res.data;
      });
      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data;
      });
      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data;
      });
      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data;
      });
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data;
      });
    },
  },
});
export default useAnalysisStore;
