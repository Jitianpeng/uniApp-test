/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
    const params = {}
    if (!url || url === '' || typeof url !== 'string') {
        return params
    }
    const paramsStr = url.split('?')[1]
    if (!paramsStr) {
        return params
    }
    const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
    for (let i = 0; i < paramsArr.length / 2; i++) {
        const value = paramsArr[i * 2 + 1]
        params[paramsArr[i * 2]] = value === 'true' ? true : (value === 'false' ? false : value)
    }
    return params
}

export {
	parseUrlParams
}