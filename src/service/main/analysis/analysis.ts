import hyRequest from '@/service';

export function getAmountListData() {
	return hyRequest.get({
		url: '/goods/amount/list',
	});
}

export function getGoodsGategoryCount() {
	return hyRequest.get({
		url: '/goods/category/count',
	});
}

export function getGoodsGategorySale() {
	return hyRequest.get({
		url: '/goods/category/sale',
	});
}
export function getGoodsAddressSale() {
	return hyRequest.get({
		url: '/goods/address/sale',
	});
}
