import { LOGIN_TOKEN } from '@/global/constants';
import router from '@/router';
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login';
import type { IAccount } from '@/types';
import { localCache } from '@/utils/cache';
import { defineStore } from 'pinia';
import { mapMenusToRoutes } from '@/utils/map-menus';
import userMainStore from '../main/main';

interface ILoginState {
	token: string;
	userInfo: any;
	userMenus: any;
}

const useLoginStore = defineStore('login', {
	state: (): ILoginState => ({
		token: localCache.getCache(LOGIN_TOKEN) ?? '',
		userInfo: localCache.getCache('userInfo') ?? '',
		userMenus: localCache.getCache('userMenus') ?? '',
	}),
	actions: {
		async loginAccountAction(account: IAccount) {
			// 1.账号登录，获取token等信息
			const loginRes = await accountLoginRequest(account);
			const id = loginRes.data?.id;
			this.token = loginRes.data?.token;

			// 2.本地缓存
			localCache.setCache(LOGIN_TOKEN, this.token);

			// 3.获取登录用户的详细信息-角色信息
			const userInfoRes = await getUserInfoById(id);
			this.userInfo = userInfoRes.data;

			// 4.根据角色请求用户的权限（菜单menus）
			const userMenuRes = await getUserMenuByRoleId(this.userInfo.role.id);

			this.userMenus = userMenuRes.data;
			console.log('userMenus', this.userMenus);

			// 缓存
			localCache.setCache('userInfo', this.userInfo);
			localCache.setCache('userMenus', this.userMenus);

			// 请求roles/departments数据
			const mainStore = userMainStore();
			mainStore.fetchEntireDataAction();

			// 动态添加路由
			const routes = mapMenusToRoutes(this.userMenus);
			routes.forEach((route) => router.addRoute('main', route));

			// 5.路由跳转
			router.push('/main');
		},

		loadLocalCacheAction() {
			const token = localCache.getCache(LOGIN_TOKEN);
			const userInfo = localCache.getCache('userInfo');
			const userMenus = localCache.getCache('userMenus');
			if (token && userInfo && userMenus) {
				this.token = token;
				this.userMenus = userMenus;
				this.userInfo = userInfo;

				// 请求roles/departments数据
				const mainStore = userMainStore();
				mainStore.fetchEntireDataAction();

				// 动态添加路由
				const routes = mapMenusToRoutes(userMenus);
				routes.forEach((route) => router.addRoute('main', route));
			}
		},
	},
});

export default useLoginStore;
