import Cookie from 'js-cookie'
import {Modal} from 'ant-design-vue'
import {refreshToken} from "@/utils/util"

/**
 * 定义影子错误码，不在页面中抛出 {message.error}
 * @type {number[]}
 */
const shadowCode = [
    401 // 账户名或密码无效
]

// 401拦截
const resp401 = {
    /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {*}
   */
    onFulfilled(response, options) {
        const {message} = options
        if (response.code === 401) {
            message.error('无此权限')
        }
        return response
    },
    /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {Promise<never>}
   */
    onRejected(error, options) {
        const {router} = options
        const {response} = error
        const data = response.data

        // Unauthorized
        if (response.status === 401) {
            Modal.error({
                title: '无权访问系统',
                content: `${data.message}`,
                okText: '去登录...',
                onOk: function () {
                    router.push('/login')
                }
            })
        }
        return Promise.reject(error)
    }
}

const resp403 = {
    onFulfilled(response, options) {
        const {message} = options
        if (response.code === 403) {
            message.error('请求被拒绝')
        }
        return response
    },
    onRejected(error, options) {
        const {message} = options
        const {response} = error
        if (response.status === 403) {
            message.error('请求被拒绝')
        }
        return Promise.reject(error)
    }
}

const resp500 = {
    onRejected(error) {

        const {response} = error
        const data = response.data
        if (response.status === 500) {
            // const h = this.$createElement;
            Modal.error({
                title: '服务器内部错误:',
                content: `${data.errorMsg}`,
                /*        content: h('div', {}, [
                  h('p', `${data.errorMsg}`),
                ]),*/
                width: 900,
                height: 900,
                okText: '关闭',
                onOk: function () {
                    // router.push('/login')
                }
            })
        }
        return Promise.reject(error)
    }
}

/**
 * 业务异常拦截器
 * @type {{onFulfilled(*, *): *}}
 */
const respBusiFail = {
    onFulfilled(response, options) {
        const {message} = options
        const data = response.data

        if (response.status === 200 && data.code > 0) {
            if (!shadowCode.includes(data.code)) {
                const errorMsg = `业务异常：${data.message}`
                message.error(errorMsg)
            }
            return Promise.reject(data)
        }

        refreshToken(data)
        return data
    }
}

const reqCommon = {
    /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, store, message}
   * @returns {*}
   */
    onFulfilled(config, options) {
        const {message} = options
        const {url, xsrfCookieName} = config
        if ((url.indexOf('login') === -1 && url.indexOf('sso') === -1) && xsrfCookieName && !Cookie.get(
            xsrfCookieName)) {
            message.warning('认证 token 已过期，请重新登录')
        }
        return config
    },
    /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, store, message}
   * @returns {Promise<never>}
   */
    onRejected(error, options) {
        const {message} = options
        message.error(error.message)
        return Promise.reject(error)
    }
}

export {
    requestInterceptors: [reqCommon], // 请求拦截
    responseInterceptors: [resp401, resp403, resp500, respBusiFail] // 响应拦截
}
