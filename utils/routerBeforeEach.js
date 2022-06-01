/**
 * 路由跳转拦截 - 前置守卫
 * @param option 目标页面参数 required string | Object '/pages/index/index' | {url: '/pages/index/index'}
 * @param type 跳转方式 string 'navigateTo'
 */
const whiteList = [
	'/pages/login/Login'
]
function routerBeforeEach(option = '/pages/index/index', type = 'navigateTo') {
	// 打开的目标页面的参数
	const to = typeof option === 'string' ? { url: option } : option
	const next = uni[type]
	// 缓存用户信息
	const userInfo = uni.getStorageSync('userInfo')
	// 白名单页面 直接跳转
	if(whiteList.includes(to.url)) {
		next(to)
	}else if(to.url !== '/pages/login/Login' && !userInfo) { // 用户未登陆
		uni.showToast({
			title: '请重新登陆',
			duration: 2000,
			success: () => {
				uni.reLaunch({
					url: '/pages/login/Login'
				})
			}
		})
	} else {
		next(to)
	}
}

export {
	routerBeforeEach
}

