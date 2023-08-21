import NProgress from "nprogress"; // 进度条
import "@/assets/css/nprogress.css"; // 进度条样式
import router from "@/router";
import { getMenuList } from "@/api/permissionMenu/index";
import { useGlobalStore } from "@/store/modules/globalStore";
NProgress.configure({ showSpinner: false, easing: "ease", speed: 1000 });

//转换文件路径
const _import = (file: string) => () => import(`..${file}`);
//转换动态权限菜单的数据格式
const transformPermissionRoutes = (data: any[]) => {
	const fn = (data: any[]) => {
		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			item.component = _import(item.component);
			item.meta = {
				title: item.name,
				icon: item.icon,
			};
			item.name = item.path;
			item.path = item.path;
			delete item.icon;
			if (item.children && item.children.length > 0) {
				if (item.children[0].component) {
					item.redirect = item.children[0].path;
					fn(item.children);
				} else {
					item.meta.btns = item.children;
					delete item.children;
				}
			}
		}
	};
	fn(data);
	return data;
};
//添加动态权限路由的方法
export const addPermissionRoutes = async () => {
	//1. 请求动态权限菜单
	const res = await getMenuList();
	//2. 转换动态权限菜单的数据格式
	const permissionRoutes = transformPermissionRoutes(res.data);
	//3. 保存动态权限菜单至pinia
	useGlobalStore().setPermissionRoutes(permissionRoutes);
	//4. 动态权限菜单添加至路由
	permissionRoutes.forEach((route) => router.addRoute(route));
};

//全局前置守卫
export const beforeEach = async (to: any, from: any, next: any) => {
	NProgress.start(); //进度条加载
	const globalStore = useGlobalStore();

	if (!globalStore.getToken) {
		//1. token不存在，就跳转至登录页

		if (to.name === "login") {
			next();
		} else {
			next({ path: "/login" });
		}
	} else if (globalStore && globalStore.getPermissionRoutes.length === 0) {
		//2. pinia没有权限菜单的缓存，就请求权限菜单数据

		//请求权限菜单，并添加进路由、pinia
		await addPermissionRoutes();
		next({ path: to.path });
	} else if (!to.name) {
		//3. 没有权限的菜单，跳转401

		next({ path: "/401" });
	} else if (
		to.name === "home" &&
		globalStore.getPermissionRoutes.length > 0
	) {
		//4. 当 path = '/' 时重新定向到"/home"，如果后端返回的权限菜单有数据，跳转第一个菜单，没有则跳转至home空的框架,

		next({ path: globalStore.getPermissionRoutes[0]["path"] });
	} else {
		//5. 以上条件不符合就可以跳转

		next();
	}
};
