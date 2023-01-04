import {
	getAmountListData,
	getGoodsGategoryCount,
	getGoodsGategorySale,
	getGoodsAddressSale,
} from '@/service/main/analysis/analysis';
import { defineStore } from 'pinia';

interface IAnalysisState {
	amountList: any[];
	goodsGategoryCount: any[];
	goodsCategorySale: any[];
	goodsAddressSale: any[];
}

const useAnalysisStore = defineStore('analysis', {
	state: (): IAnalysisState => ({
		amountList: [],
		goodsGategoryCount: [],
		goodsCategorySale: [],
		goodsAddressSale: [],
	}),
	actions: {
		fetchAnalysisDataAction() {
			getAmountListData().then((res) => {
				this.amountList = res.data;
			});
			getGoodsGategoryCount().then((res) => {
				this.goodsGategoryCount = res.data;
			});
			getGoodsGategorySale().then((res) => {
				this.goodsCategorySale = res.data;
			});

			getGoodsAddressSale().then((res) => {
				this.goodsAddressSale = res.data;
			});
		},

		fetch,
	},
});

export default useAnalysisStore;
