<template>
	<div class="btns">
		<el-button v-hasPermission="'101001'" type="primary">新增</el-button>
		<el-button v-hasPermission="'101003'" type="danger">删除</el-button>
	</div>
	<div class="container">
		<el-table :data="tableData" style="width: 100%" :border="true">
			<el-table-column
				v-for="item in tableColumn"
				:prop="item.prop"
				:label="item.label"
				:type="item.type"
			>
				<template v-if="item.render || item.slot" #default="params">
					<render
						v-if="item.render"
						:render="item.render"
						:data="params"
					></render>
					<div v-else>
						<div v-if="item.slot === 'permission'">
							<el-tag
								v-for="role in params.row.permission"
								type="primary"
								style="margin-right: 10px; margin-bottom: 10px"
							>
								{{ role }}
							</el-tag>
						</div>
						<div v-if="item.slot === 'actions'">
							<el-button
								v-hasPermission="'101003'"
								link
								type="primary"
								size="small"
							>
								删除
							</el-button>

							<el-button
								v-hasPermission="'101002'"
								link
								type="primary"
								size="small"
							>
								编辑
							</el-button>
						</div>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { h } from "vue";

interface TableColumn {
	[key: string]: any;
}
const tableColumn: TableColumn[] = [
	{
		type: "selection",
	},
	{
		prop: "id",
		label: "角色编号",
	},
	{
		prop: "name",
		label: "角色名称",
	},
	{
		prop: "status",
		label: "启用状态",
		render: (row: TableData) => {
			return h("span", row.status ? "启用" : "禁用");
		},
	},
	{
		prop: "permission",
		label: "菜单权限代码",
		slot: "permission",
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
	name: string;
	permission: Array<number>;
	status: boolean;
}
const tableData: TableData[] = [
	{
		id: "1",
		name: "管理员",
		permission: [
			10, 1010, 101001, 101002, 101003, 1020, 102001, 102002, 102003,
			1030, 103001, 103002, 103003, 20, 2010, 201001, 201002, 201003,
			2020, 202001, 202002, 202003,
		],
		status: true,
	},
	{
		id: "2",
		name: "作者",
		permission: [
			20, 2010, 201001, 201002, 201003, 2020, 202001, 202002, 202003,
		],
		status: true,
	},
	{
		id: "3",
		name: "读者",
		permission: [20, 2010, 2020],
		status: true,
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
