import { createApp } from 'vue';
<template>
	<div class="btns">
		<el-button v-hasPermission="'201001'" type="primary">新增</el-button>
		<el-button v-hasPermission="'201003'" type="danger">删除</el-button>
	</div>
	<div class="container">
		<el-table :data="tableData" style="width: 100%" :border="true">
			<el-table-column
				v-for="item in tableColumn"
				:prop="item.prop"
				:label="item.label"
				:type="item.type"
			>
				<template v-if="item.slot" #default>
					<div v-if="item.slot === 'actions'">
						<el-button
							v-hasPermission="'201003'"
							link
							type="primary"
							size="small"
						>
							删除
						</el-button>

						<el-button
							v-hasPermission="'201002'"
							link
							type="primary"
							size="small"
						>
							编辑
						</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
interface TableColumn {
	[key: string]: any;
}
const tableColumn: TableColumn[] = [
	{
		type: "selection",
	},
	{
		prop: "id",
		label: "文章编号",
	},
	{
		prop: "type",
		label: "文章类型",
	},
	{
		prop: "title",
		label: "标题",
	},
	{
		prop: "content",
		label: "内容",
	},
	{
		prop: "createTime",
		label: "创建时间",
	},
	{
		prop: "actions",
		label: "操作",
		fixed: "right",
		slot: "actions",
	},
];
interface TableData {
	id: string;
	type: string;
	title: string;
	content: string;
	createTime: string;
}
const tableData: TableData[] = [
	{
		id: "1",
		type: "前端知识",
		title: "前端三要素",
		content: "HTML、CSS、JavaScript",
		createTime: "2023-2-20",
	},
	{
		id: "2",
		type: "后端知识",
		title: "Java线程内存模型",
		content:
			"Java线程内存模型划分为两部分：主内存和线程工作内存，主内存是多个线程共享的内存，线程工作内存是每个线程独享的内存。",
		createTime: "2023-2-20",
	},
];
</script>

<style lang="scss" scoped>
.btns {
	display: flex;
	margin-bottom: 20px;
}
.container {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border-radius: 4px;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.06);
}
</style>
