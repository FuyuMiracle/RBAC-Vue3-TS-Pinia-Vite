import axios from "axios";
import { useGlobalStore } from "@/store/modules/globalStore";
import { ElMessageBox, ElMessage } from "element-plus";
//创建一个axios实例
const service = axios.create({
	baseURL: import.meta.env.VUE_APP_BASE_URL, // 所有请求地址的前缀部分
	timeout: 6000, //请求超时时间,单位是毫秒
	// withCredentials: true, // 异步请求携带cookie
});

//添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么

		//设置请求头的token
		config.headers["token"] = "Bearer " + useGlobalStore().getToken;

		return config;
	},
	(error) => {
		// 对请求错误做些什么
		console.log(error);
		return Promise.reject(error);
	}
);

//添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 2xx范围内的状态码都会触发该函数

		const res = response.data;
		console.log("响应结果", res);
		const { code } = res;
		if (code !== 200) {
			switch (code) {
				case 401:
					ElMessageBox({
						title: "提示",
						showClose: false,
						closeOnClickModal: false,
						closeOnPressEscape: false,
						confirmButtonText: "退出重新登录",
						message: "当前用户登入信息已失效，请重新登入再操作",
					}).then(() => {
						useGlobalStore().logout();
					});
					break;
				case -1:
					ElMessage({
						type: "error",
						message: res.msg,
						offset: 65,
					});
					break;
			}
			return Promise.reject(res);
		} else {
			return res;
		}
	},
	(error) => {
		// 超出2xx范围内的状态码都会触发该函数

		if (axios.isCancel(error)) {
			// 请求取消
			console.warn(error);
		} else {
			ElMessage({
				type: "error",
				message: error.message,
				offset: 65,
			});
		}
		return Promise.reject(error);
	}
);

export default service;
