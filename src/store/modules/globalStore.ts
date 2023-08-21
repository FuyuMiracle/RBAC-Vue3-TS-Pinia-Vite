import { defineStore } from "pinia";
import router from "@/router/index";
export const useGlobalStore = defineStore("globalStore", {
	state: () => {
		return {
			userInfo: {}, //用户信息
			permissionRoutes: [], //权限路由
			token: "", //token
		};
	},
	getters: {
		getUserInfo: (state) => {
			return state.userInfo;
		},
		getPermissionRoutes: (state) => {
			return state.permissionRoutes;
		},
		getToken: (state) => {
			return state.token;
		},
	},
	actions: {
		setPermissionRoutes(routes: any) {
			this.permissionRoutes = routes;
		},
		logout() {
			this.userInfo = {};
			this.permissionRoutes = [];
			this.token = "";
			router.push("/login");
		},
	},
	// persist:true,//全部持久化
	persist: {
		//部分持久化
		key: "globalStore", //缓存key
		storage: window.localStorage, //缓存方式
		// 部分持久化状态的点符号路径数组，默认持久化所有数据
		paths: [
			//持久化windowWidth 字段
			"userInfo",
			"token",
		],
	},
});
