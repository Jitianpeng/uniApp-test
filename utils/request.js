// import { requestInterceptors, responseInterceptors } from './http-interceptors'
// 请求类型
const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

// 请求默认路径
const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://172.16.238.50:8080'

// 请求拦截器
async function requestInterceptor(option) {
	const { url } = option
	const token =  uni.getStorageSync('token')
	if(!token && url.indexOf('login') === -1) {
		uni.showToast({
			title: '认证信息已过期，请重新登录',
			duration: 1000,
			success: () => {
				setTimeout(() => {
					uni.$push('/pages/login/Login')
				}, 600)
			}
		})
	}
	return option
}

// 响应拦截
function responseInterceptor(res, resolve) {
	resolve(res.data)
}

// 请求失败拦截
function errorInterceptor(err, reject) {
	uni.showToast({
		title: '请求失败！'
	})
	reject(err)
}

// 默认请求配置
const defaultRequestConfig = {
	header: {
		Authorization: uni.getStorageSync('token'),
		'Content-Type': 'application/json; charset=UTF-8'
	}, // Object 设置请求的 header，header 中不能设置 Referer。	App、H5端会自动带上cookie，且H5端不可手动修改
	timeout: 6000, // Number 超时时间，单位 ms	H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
	dataType: 'json', // String 如果设为 json，会尝试对返回的数据做一次 JSON.parse	
	responseType: 'text', // String 设置响应的数据类型。合法值：text、arraybuffer	支付宝小程序不支持
	sslVerify: true, // Boolean 验证 ssl 证书	仅App安卓端支持（HBuilderX 2.3.3+），不支持离线打包
	withCredentials: false, // Boolean 跨域请求时是否携带凭证（cookies）	仅H5支持（HBuilderX 2.6.15+）
	firstIpv4: false, // Boolean DNS解析时优先使用ipv4	仅 App-Android 支持 (HBuilderX 2.8.0+)
	// success: '', //	Function 收到开发者服务器成功返回的回调函数	
	// fail: '', // Function 接口调用失败的回调函数	
	// complete: '', // Function 接口调用结束的回调函数（调用成功、失败都会执行）
}

async function request(url, method, params, config = {}) {
	const options = {
		... defaultRequestConfig,
		url: baseUrl + url,
		method,
		data: params,
		header: Object.assign(defaultRequestConfig.header, config)
	}
	// 请求拦截器
	await requestInterceptor(options)
	
	return new Promise((resolve, reject) => {
		uni.request(options)
		// 响应拦截
		.then(res => responseInterceptor(res, resolve))
		.catch(err => errorInterceptor(err, reject))
	})
}

export {
	request,
	METHOD
}
