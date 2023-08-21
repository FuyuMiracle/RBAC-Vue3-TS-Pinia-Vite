<template>
	<div class="btns">
		<el-button v-hasPermission="'102001'" type="primary">新增</el-button>
	</div>
	<div class="container">
		<el-table
			:data="tableData"
			style="width: 100%"
			:border="true"
			row-key="permission"
		>
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
						<div v-if="item.slot === 'btns'">
							<el-tag
								v-for="role in params.row.btns"
								type="primary"
								style="margin-right: 10px"
							>
								{{ role }}
							</el-tag>
						</div>
						<div v-if="item.slot === 'actions'">
							<el-button
								v-hasPermission="'102001'"
								link
								type="primary"
								size="small"
							>
								新增
							</el-button>

							<el-button
								v-hasPermission="'102003'"
								link
								type="primary"
								size="small"
							>
								删除
							</el-button>

							<el-button
								v-hasPermission="'102002'"
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
interface TableColumn {
	prop: string;
	label: string;
	[key: string]: any;
}
const tableColumn: TableColumn[] = [
	{
		prop: "name",
		label: "菜单名称",
	},
	{
		prop: "permission",
		label: "权限编码",
	},
	{
		prop: "path",
		label: "菜单路径",
	},
	{
		prop: "component",
		label: "组件路径",
	},
	{
		prop: "icon",
		label: "菜单图标",
	},
	{
		prop: "actions",
		label: "操作",
		fixed: "right",
		slot: "actions",
	},
];

interface TableData {
	name: string;
	path?: string;
	component?: string;
	permission?: string;
	icon?: string;
	children?: Array<TableData>;
}
const tableData: TableData[] = [
	{
		name: "系统管理",
		path: "/systemManage",
		component: "/layout/index.vue",
		icon: "ri-ubuntu-line",
		permission: "10",
		children: [
			{
				name: "角色管理",
				path: "/systemManage/roleManage",
				component: "/views/systemManage/roleManage/index.vue",
				icon: "ri-file-user-line",
				permission: "1010",
				children: [
					{
						name: "添加角色",
						permission: "101001",
					},
					{
						name: "修改角色",
						permission: "101002",
					},
					{
						name: "删除角色",
						permission: "101003",
					},
				],
			},
			{
				name: "菜单管理",
				path: "/systemManage/menuManage",
				component: "/views/systemManage/menuManage/index.vue",
				icon: "ri-menu-2-line",
				permission: "1020",
				children: [
					{
						name: "添加菜单",
						permission: "102001",
					},
					{
						name: "修改菜单",
						permission: "102002",
					},
					{
						name: "删除菜单",
						permission: "102003",
					},
				],
			},
			{
				name: "用户管理",
				path: "/systemManage/userManage",
				component: "/views/systemManage/userManage/index.vue",
				icon: "ri-user-line",
				permission: "1030",
				children: [
					{
						name: "添加用户",
						permission: "103001",
					},
					{
						name: "修改用户",
						permission: "103002",
					},
					{
						name: "删除用户",
						permission: "103003",
					},
				],
			},
		],
	},
	{
		name: "文章管理",
		path: "/articleManage",
		component: "/layout/index.vue",
		icon: "ri-file-text-fill",
		permission: "20",
		children: [
			{
				name: "文章列表",
				path: "/articleManage/articleList",
				component: "/views/articleManage/articleList/index.vue",
				icon: "ri-file-text-line",
				permission: "2010",
				children: [
					{
						name: "添加文章",
						permission: "201001",
					},
					{
						name: "修改文章",
						permission: "201002",
					},
					{
						name: "删除文章",
						permission: "201003",
					},
				],
			},
			{
				name: "文章类型",
				path: "/articleManage/articleType",
				component: "/views/articleManage/articleType/index.vue",
				icon: "ri-clipboard-line",
				permission: "2020",
				children: [
					{
						name: "添加文章类型",
						permission: "202001",
					},
					{
						name: "修改文章类型",
						permission: "202002",
					},
					{
						name: "删除文章类型",
						permission: "202003",
					},
				],
			},
		],
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
