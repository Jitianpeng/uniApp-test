import { METHOD, request } from '@/utils/request'
import { USER_LOGIN } from '@/services/apis/user'
/**
 * 登录服务
 * @param params 登录信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function Login(params) {
  return request(USER_LOGIN, METHOD.POST, params)
}