<template>
	<div class="test">
		{{ data.pageTitle }}
		<button @click="handleGoback">返回</button>
	</div>
</template>

<script setup>
	import { reactive } from 'vue'
	const data = reactive({
		pageTitle: '测试页面'
	})
	const handleGoback = () => {
		uni.navigateBack({
			delta: 1
		})
	}
</script>

<style lang="scss">
	.test {
		font-size: 32rpm;
		font-weight: 700;
	}
</style>