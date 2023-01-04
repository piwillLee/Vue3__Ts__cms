import type { RouteRecordRaw } from 'vue-router';

function loadLocalRoutes() {
	// 1.动态获取所有的路由对象，放到数组中
	//   路由对象都在独立的文件中
	//   从文件中将所有的路由对象先读取数组中
	const localRoutes: RouteRecordRaw[] = [];

	// 1.1读取router/main所有的ts文件
	const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
		eager: true,
	});

	// 1.2将加载的对象放到localRouters
	for (const key in files) {
		const module = files[key];
		localRoutes.push(module.default);
	}

	console.log(localRoutes);

	return localRoutes;
}

export let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]) {
	// 1.加载本地路由
	const localRoutes = loadLocalRoutes();

	// 2.根据菜单去匹配正确的路由
	const routes: RouteRecordRaw[] = [];
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			const route = localRoutes.find((item) => item.path === submenu.url);
			if (route) {
				// 1.给route的顶层菜单添加重定向功能（但是只需要添加一次）
				if (!routes.find((item) => item.path === menu.url)) {
					routes.push({ path: menu.url, redirect: route.path });
				}
				// 2.二级菜单对应的路径
				routes.push(route);
			}

			// 记录第一个被匹配到的菜单
			if (!firstMenu && route) firstMenu = submenu;
		}
	}

	return routes;
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 * @returns 返回submenu
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				console.log(submenu);
				return submenu;
			}
		}
	}
}

interface IBreadcrumbs {
	name: string;
	path?: string;
}

export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
	// 1.定义面包屑
	const breadcrumbs: IBreadcrumbs[] = [];

	// 2.遍历获取面包屑的层级
	for (const menu of userMenus) {
		for (const submenu of menu.children) {
			if (submenu.url === path) {
				// 1.顶层菜单
				breadcrumbs.push({ name: menu.name, path: menu.url });
				// 2.匹配菜单
				breadcrumbs.push({ name: submenu.name, path: submenu.url });
			}
		}
	}

	return breadcrumbs;
}
