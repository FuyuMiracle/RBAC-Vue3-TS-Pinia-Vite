<template>
	<div class="header-left"></div>
	<div class="header-right">
		<div
			class="action-item"
			v-for="item in rightActions"
			@click="onActions(item.type)"
		>
			<i v-if="item.icon" :class="item.icon"></i>
			<span v-if="item.name">{{ item.name }}</span>
		</div>
		<div class="action-item">
			<img
				v-if="userInfo.avator"
				class="head-img"
				:src="userInfo.avator"
				alt=""
			/>
			<div v-else class="head-img">{{ userInfo.username }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
// import { ElMessageBox, ElMessage } from 'element-plus';
import { useGlobalStore } from "@/store/modules/globalStore";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref } from "vue";
import type { Ref } from "vue";
const globalStore = useGlobalStore();
const userInfo: any = globalStore.userInfo;

interface ActionItem {
	type?: string; //类型
	icon?: string; //图标
	name: string; //名称
}

//头部右侧可操作数据
const rightActions: Ref<ActionItem[]> = ref([
	{
		type: "refresh",
		icon: "ri-refresh-line",
		name: "刷新",
	},
	{
		type: "logout",
		icon: "ri-logout-box-line",
		name: "退出登录",
	},
	{
		name: userInfo.username,
	},
]);

//点击右侧头部操作项时触发
const onActions = (type: string | undefined) => {
	switch (type) {
		case "refresh":
			window.location.reload();
			break;
		case "logout":
			ElMessageBox.confirm("您确定要退出登录吗?", "提示", {
				confirmButtonText: "退出登录",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					globalStore.logout();
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "取消退出登录",
					});
				});
			break;
	}
};
</script>

<style></style>
