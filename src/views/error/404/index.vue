<template>
	<div class="err-page">
		<div>
			<div class="state">
				<i class="ri-emotion-unhappy-line"></i>
				<span>404</span>
			</div>
			<div class="title">{{ $route.matched[0].meta.title }}</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/style/global.scss";
.err-page {
	width: 100vw;
	height: 100vh;
	background-color: $viewBg;
	display: flex;
	align-items: center;
	justify-content: center;
	.state {
		.ri-emotion-unhappy-line {
			font-size: 180px;
		}
		font-size: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.title {
		font-size: 60px;
		color: var(--el-color-info);
	}
}
</style>
