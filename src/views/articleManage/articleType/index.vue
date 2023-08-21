<template>
	<div class="btns">
		<el-button v-hasPermission="'202001'" type="primary">新增</el-button>
		<el-button v-hasPermission="'202003'" type="danger">删除</el-button>
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
							v-hasPermission="'202003'"
							link
							type="primary"
							size="small"
						>
							删除
						</el-button>

						<el-button
							v-hasPermission="'202002'"
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
const tableColumn: TableColumn = [
	{
		type: "selection",
	},
	{
		prop: "id",
		label: "类型编号",
	},
	{
		prop: "code",
		label: "类型代码",
	},
	{
		prop: "name",
		label: "类型名称",
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
	code: number;
	name: string;
	createTime: string;
}
const tableData: TableData[] = [
	{
		id: "1",
		code: 100,
		name: "前端知识",
		createTime: "2023-2-20",
	},
	{
		id: "2",
		code: 200,
		name: "后端知识",
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
