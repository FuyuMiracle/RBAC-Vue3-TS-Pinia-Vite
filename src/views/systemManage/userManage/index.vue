<template>
	<div class="btns">
		<el-button v-hasPermission="'103001'" type="primary">新增</el-button>
		<el-button v-hasPermission="'103003'" type="danger">删除</el-button>
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
						<div v-if="item.slot === 'roles'">
							<el-tag
								v-for="role in params.row.roles"
								:type="role == 'admin' ? 'primary' : 'info'"
								style="margin-right: 10px"
							>
								{{ role }}
							</el-tag>
						</div>
						<div v-if="item.slot === 'actions'">
							<el-button
								v-hasPermission="'103003'"
								link
								type="primary"
								size="small"
							>
								删除
							</el-button>

							<el-button
								v-hasPermission="'103002'"
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
		label: "用户编号",
	},
	{
		prop: "name",
		label: "用户名称",
	},
	{
		prop: "avator",
		label: "用户头像",
		render: (row: TableData) => {
			if (row.avator) {
				return h("img", {
					scr: row.avator,
					style: {
						width: "50px",
						height: "50px",
						borderRadius: "100px",
						border: "none",
					},
				});
			}
		},
	},
	{
		prop: "status",
		label: "用户状态",
		render: (row: TableData) => {
			return h("span", row.status ? "启用" : "禁用");
		},
	},
	{
		prop: "roles",
		label: "用户角色",
		slot: "roles",
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
	name: string;
	avator: string;
	status: boolean;
	createTime: string;
	roles: Array<string>;
}
const tableData: TableData[] = [
	{
		id: "1",
		name: "小白",
		avator: "",
		status: true,
		createTime: "2023-2-20",
		roles: ["读者"],
	},
	{
		id: "2",
		name: "小红",
		avator: "",
		status: true,
		createTime: "2023-2-20",
		roles: ["作者"],
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
