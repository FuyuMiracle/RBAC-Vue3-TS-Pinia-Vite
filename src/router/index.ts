import NProgress from "nprogress";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { beforeEach } from "@/router/checkRouter";

//constantRoutes为不需要动态判断权限的路由
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "index",
		redirect: "/home",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
	},
	{
		path: "/401",
		name: "401",
		meta: {
			title: "Not Permission",
		},
		component: () => import("@/views/error/401/index.vue"),
	},
	{
		path: "/:pathMatch(.*)",
		name: "404",
		meta: {
			title: "Not Found",
		},
		component: () => import("@/views/error/404/index.vue"),
	},

	{
		path: "/home",
		name: "home",
		component: () => import("@/layout/index.vue"),
	},
];

//创建路由模式，采用hash模式有“#”
const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
});

//在用户点击前，进入beforeEach去判断用户是否有权限
router.beforeEach(beforeEach);
router.afterEach(() => {
	NProgress.done();
});
export default router;
