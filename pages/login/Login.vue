<template>
	<div class="login">
		<view class="title">
			登陆页面
		</view>
		<button type="primary" @click="handleLogin">登陆</button>
	</div>
</template>

<script setup>
	const handleLogin = () => {
		const userInfo = {
			name: '天月飞鸟',
			age: '18'
		}
		// 存储用户信息
		// uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		uni.$push('/pages/index/index')
	}
</script>

<style lang="scss">
	.login {
		
	}
</style>