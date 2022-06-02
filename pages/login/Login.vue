<template>
	<div class="login">
		<view class="title">
			登陆页面
		</view>
		<button type="primary" @click="handleLogin">登陆</button>
	</div>
</template>

<script setup>
	import { Login } from '@/services/modules/user'
	import { mutationMapper } from '@/utils/useMapper'
	const { setUser } = mutationMapper('user',['setUser'])
	
	const handleLogin = () => {
		const params = {
			busId: 1,
			password: "4ff0116e44e3ecf691dead3c7a1a8bd8af720b9c860df88817645c4577e7a665",
			username: "admin"
		}
		Login(params).then(res => {
			if(res.success) {
				const userInfo = res.data.user
				setUser(userInfo)
				uni.$push('/pages/index/index')
			}
		})
	}
</script>

<style lang="scss">
	.login {
		
	}
</style>