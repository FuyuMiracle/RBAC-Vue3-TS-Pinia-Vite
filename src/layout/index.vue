<template>
	<!-- 框架布局 -->
	<div class="layout-div">
		<!-- 左侧 -->
		<div class="layout-left">
			<!-- logo 标题 -->
			<div class="logo-title">
				<div v-if="!isCollapse" class="content">
					<div class="text">RBAC权限菜单</div>
					<i
						class="ri-menu-fold-line collapse-menu"
						@click="onCollapse(true)"
					></i>
				</div>
				<i
					class="ri-menu-fold-line collapse-menu"
					@click="onCollapse(false)"
				></i>
			</div>
			<!-- 菜单 -->
			<div class="menu-div">
				<Menu :collapse="isCollapse"></Menu>
			</div>
		</div>
		<!-- 右侧 -->
		<div class="layout-right">
			<!-- 右侧头部 -->
			<div class="layout-right-header">
				<Header></Header>
			</div>
			<!-- 右侧主容器 -->
			<div class="layout-right-container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Menu from "./components/Menu/index.vue";
import Header from "./components/Header/index.vue";
import { ref } from "vue";

//控制展开/收缩路由菜单
const isCollapse = ref(false);
const onCollapse = (status: boolean) => {
	isCollapse.value = status;
};
</script>

<style lang="scss" scoped>
@import "@/style/global.scss";
$headerHeight: 60px;
$box-shadow: 2px 2px 2px 1px #0000000f;
.layout-div {
	display: flex;
	width: 100vw;
	height: 100vh;
	.layout-left {
		display: flex;
		flex-direction: column;
		max-width: 250px;
		flex-shrink: 0;
		.logo-title {
			height: $headerHeight;
			line-height: $headerHeight;
			font-size: 24px;
			font-weight: 500;
			color: var(--el-color-primary);
			cursor: pointer;
			flex-shrink: 0;
			width: v-bind("isCollapse ? '54px' : '250px'");
			text-align: v-bind("isCollapse ? 'center' : 'left'");
			overflow: hidden;
			.content {
				padding: v-bind("isCollapse ? '0' : '0px 0px 0px 20px'");
				display: flex;
				.text {
					flex: 1;
					white-space: nowrap;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				.collapse-menu {
					flex-shrink: 0;
					margin-right: 25px;
				}
			}
			.collapse-menu {
				font-size: 20px;
				color: var(--el-text-color-primary);
				&:hover {
					color: var(--el-color-primary);
				}
			}
		}
		.menu-div {
			flex: 1;
			box-shadow: $box-shadow;
			z-index: 1;
			.el-menu-vertical-demo:not(.el-menu--collapse) {
				width: 250px;
				min-height: 400px;
				:deep(.el-sub-menu__icon-arrow) {
					display: inline-block !important;
				}
			}
			.el-menu--collapse {
				width: 54px;
			}
			:deep(.el-menu) {
				border: none;
				.el-menu-item,
				.el-sub-menu__title {
					overflow: hidden;
					box-shadow: none;
					i {
						margin-right: 8px;
						font-size: 17px;
					}
					.el-sub-menu__icon-arrow {
						display: none;
					}
				}
				ul {
					.is-active {
						background-color: var(--el-color-primary-light-9);
					}
				}
			}
		}
	}
	.layout-right {
		flex: 1;
		width: calc(100vw - 250px);
		display: flex;
		flex-direction: column;
		:deep(.layout-right-header) {
			width: 100%;
			height: $headerHeight;
			box-shadow: $box-shadow;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// padding: 0 24px;
			.header-left,
			.header-right {
				color: var(--el-text-color-primary);
				overflow: hidden;
				display: flex;
				.action-item {
					display: flex;
					align-items: center;
					cursor: pointer;
					margin-right: 20px;
					i {
						font-size: 22px;
						margin-right: 5px;
					}
					span {
						font-size: 14px;
					}
					.head-img {
						border-radius: 100%;
						width: 40px;
						height: 40px;
						background-color: var(--el-color-primary);
						color: #fff;
						line-height: 40px;
						font-size: 10px;
						text-align: center;
					}
					&:hover {
						color: var(--el-color-primary);
					}
				}
			}
		}
		.layout-right-container {
			flex: 1;
			background-color: $viewBg;
			padding: 24px;
			overflow-y: auto;
		}
	}
}
</style>
