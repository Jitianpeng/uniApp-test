<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<span class="iconfont icon-denglu color"></span>
			<button type="primary" @click="handleTurnPage">去测试页面</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			handleTurnPage() {
				uni.$push('/pages/test/Test')
			}
		}
	}
</script>

<style>
	.color {
		background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
		font-size: 60rpx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 40rpx;
		color: #8f8f94;
	}
</style>
