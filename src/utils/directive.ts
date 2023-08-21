import router from "@/router/index";
import { App } from "vue";
const directives: any = {
	hasPermission: {
		created(el: any, binding: any) {
			//当指令第一次绑定到元素并且在挂载父组件之前调用。
			//根据当前路由的meta中的btn按钮权限数组来判断是否有权限
			let btnsPermission = [];
			const btns: any = router.currentRoute?.value?.meta?.btns || [];

			btnsPermission = btns.map((item: any) => item.permission) || [];

			if (!btnsPermission.includes(binding.value)) {
				el.style.display = "none";
			}
		},
	},
};

export default (createApp: App) => {
	for (let _key in directives) {
		createApp.directive(_key, directives[_key]);
	}
};
