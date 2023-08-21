<template>
	<el-menu
		class="el-menu-vertical-demo"
		:default-active="defaultActive"
		:collapse="collapse"
		@select="menuSelect"
	>
		<tempate v-for="item in menuList">
			<template
				v-if="!item.hidden && item.children && item.children.length > 0"
			>
				<!-- 有子菜单 -->
				<SubMenu
					v-if="item.children.length > 1"
					:route="item"
					:collapse="collapse"
				></SubMenu>
				<!-- 没有子菜单 -->
				<el-menu-item
					v-else-if="!item.children[0].hidden"
					:index="item.path"
				>
					<i
						v-if="item.children[0].meta?.icon"
						:class="item.children[0].meta.icon"
					></i>
					<span slot="title" v-show="!collapse">{{
						item.children[0].meta?.title
					}}</span>
				</el-menu-item>
			</template>
			<el-menu-item v-else-if="!item.hidden" :index="item.path">
				<i v-if="item.meta?.icon" :class="item.meta.icon"></i>
				<span slot="title" v-show="!collapse">{{
					item.meta?.title
				}}</span>
			</el-menu-item>
		</tempate>
	</el-menu>
</template>

<script lang="ts" setup>
import SubMenu from "./SubMenu/index.vue";
import { useGlobalStore } from "@/store/modules/globalStore";
import { ref } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";
const router = useRouter();
defineProps({
	collapse: {
		//控制展开/收缩路由菜单
		type: Boolean,
	},
});
const globalStore = useGlobalStore();

//路由菜单列表
const menuList: any = globalStore.getPermissionRoutes;

const defaultActive = ref(router.currentRoute.value.path);
//点击菜单后触发-跳转至对应路由
const menuSelect = (index: RouteRecordRaw) => {
	router.push(index);
};
</script>

<style lang="scss" scoped></style>
