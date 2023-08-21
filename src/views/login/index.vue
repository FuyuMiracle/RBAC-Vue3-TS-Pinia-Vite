<template>
	<div class="login-div">
		<div class="left-div">
			<div class="container">
				<h2>基于RBAC思想的权限菜单管理系统（纯前端）</h2>
				<div class="describe">
					<h3>一、技术栈</h3>
					<p>vue3、router、vite、pinia、element-plus、axios</p>
				</div>
				<div class="describe">
					<h3>二、系统介绍</h3>
					<p>系统角色：系统管理员（admin）、作者（小红）、读者（小白）</p>
					<p>系统用户：
						<p style="margin-left: 80px;">小红 (作者角色)</p>
						<p style="margin-left: 80px;">小白 (读者角色)</p>
					</p>
					<p>系统菜单：
						<p style="margin-left: 80px;">系统管理(角色管理、菜单管理、用户管理)</p>
						<p style="margin-left: 80px;">文章管理(文章列表、文章类型)</p>
					</p>
				</div>
			</div>
			
		</div>
		<div class="right-div">
			<div class="login-container">
				<div class="input-div">
					<i class="ri-user-line"></i>
					<el-input v-model="username" placeholder="请输入账号">
					</el-input>
				</div>
				<div class="input-div">
					<i class="ri-lock-line"></i>
					<el-input v-model="password" placeholder="请输入密码"></el-input>
				</div>
				
				<el-button type="primary" class="login-btn" @click="onLogin">登 录</el-button>
			</div>
			
		</div>
	</div>
</template>

<script lang="ts" setup> 
 	import {ref} from "vue";
	import type {Ref} from "vue";
	import { postLogin } from '@/api/login/index';
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '@/store/modules/globalStore';
	const router = useRouter()
	const globalStore = useGlobalStore();
	
	const username:Ref<string> = ref('admin');//账号
	const password:Ref<string>= ref('123456');//密码
	
	//登录按钮点击事件
	const onLogin = async () => {
		
		const sendData = {
			username: username.value,
			password: password.value
		}
		const res = await postLogin(sendData)
		
		globalStore.$patch((state) => { //保存用户信息
			state.userInfo = {
				username: res.data.username,
				avator: res.data.avator,
			},
			state.token = res.data.token;//存储token
		})
		router.push('/')
		
	}
</script>

<style lang="scss" scoped>
	.login-div {
		width: 100vw;
		height: 100vh;
		display: flex;
		.left-div{
			width: 60%;
			background-color: var(--el-color-primary);
			transform: skew(-10deg,180deg);
			margin-left: -180px;
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			.container{
				color: #fff;
				margin-top: 50px;
				width:500px;
				transform: skew(10deg,180deg);
				
				.describe{
					text-align: left;
				}
			}
			
		}
		.right-div{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			.login-container{
				width: 40%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				.input-div{
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 20px;
					border-bottom: solid 1px #eee;
					i{
						flex-shrink: 0;
						color: rgba(34,41,47,.4);
						font-size: 20px;
					}
					:deep(.el-input){
						height: 40px;
						font-size: 16px;
						box-shadow: none;
						.is-focus{
							box-shadow: none;
						}
						.el-input__wrapper{
							box-shadow: none !important;
						}
						:hover{
							box-shadow: none;
						}
					}
				}
				.login-btn{
					width: 100%;
					margin-top: 20px;
					border-radius: 30px;
					height: 40px;
					line-height: 40px;
					font-size: 16px;
				}
			}
			
		}
	}
</style>