<template>
	<el-sub-menu :index="route.path">
		<template #title>
			<i v-if="route.meta?.icon" :class="route.meta.icon"></i>
			<span v-show="!collapse">{{ route.meta?.title }}</span>
		</template>
		<template v-for="item in route.children">
			<!-- 不是叶子节点，递归此组件 -->
			<SubMenu
				v-if="!item.hidden && item.children && item.children.length > 0"
				:route="item"
			></SubMenu>
			<!-- 是叶子节点，直接显示 -->
			<el-menu-item v-else-if="!item.hidden" :index="item.path">
				<i v-if="item.meta?.icon" :class="item.meta.icon"></i>
				<span :style="{ marginLeft: collapse ? '8px' : '0px' }">{{
					item.meta?.title
				}}</span>
			</el-menu-item>
		</template>
	</el-sub-menu>
</template>

<script lang="ts" setup>
import SubMenu from "./index.vue";

//定义 Props类型
interface Props {
	route: any;
	collapse?: Boolean; //控制展开/收缩路由菜单
}
//使用 defineProps 注解类型
defineProps<Props>();
</script>

<style lang="scss" scoped></style>
