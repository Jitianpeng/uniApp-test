export default {
    namespaced: true,
    state: {
        user: undefined,
    },
    getters: {
        user: state => {
            if (!state.user) {
                try {
                    const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
                    state.user = JSON.parse(user)
                } catch (e) {
                    console.error(e)
                }
            }
            return state.user
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
			uni.setStorageSync('userInfo', JSON.stringify(user))
        }
    },
    actions: {
        // async loadAccountInfo({state}) {
        //     if (state.user == undefined) {
        //         const moduleId = process.env.VUE_APP_MODULEID // 平台：100
        //         getAccountInfo(moduleId).then(result => {
        //             const {data} = result

        //             this.commit('account/setUser', data.user)
        //             this.commit('account/setPermissions', data.permissions)
        //             this.commit('account/setRoles', data.roles)
        //             setAuthorization({token: data.token, expireAt: data.expireAt})

        //         }).catch((error) => {
        //             console.warn('Result error: ', error)
        //         })

        //     }
        // }
    }
}
