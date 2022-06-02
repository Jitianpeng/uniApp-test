import { useStore, createNamespacedHelpers, mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { computed } from "vue"

/**
 * 自动映射store对应的state属性
 * @arguments [0] String|Array arguments.length为2时 此参数作为模块名称
 * @arguments [1] String|Array 
 */
export function stateMapper() {
    const store = useStore()
    let mapperFn = mapState
    const mapper = arguments.length === 1 ? arguments[0] : arguments[1]
    if(arguments.length === 2) {
        mapperFn = createNamespacedHelpers(arguments[0]).mapState
    }
    const storeStateFns = mapperFn(mapper)
    const storeStates = {}
    Object.keys(storeStateFns).forEach(item => {
        const fn = storeStateFns[item].bind({ $store: store })
        storeStates[item] = computed(fn)
    })
    return storeStates
}

/**
 * 自动映射store对应的state属性
 * @arguments [0] String|Array arguments.length为2时 此参数作为模块名称
 * @arguments [1] String|Array store中的getter 名称
 */
export function getterMapper() {
    const store = useStore()
    let mapperFn = mapGetters
    const mapper = arguments.length === 1 ? arguments[0] : arguments[1]
    if(arguments.length === 2) {
        mapperFn = createNamespacedHelpers(arguments[0]).mapGetters
    }
    const getterFns = mapperFn(mapper)
    const storeGetters = {}
    Object.keys(getterFns).forEach(item => {
        const fn = getterFns[item].bind({ $store: store })
        storeGetters[item] = computed(fn)
    })
    return storeGetters 
}

/**
 * 自动映射 store 对应的 Mutation 方法
 * @returns {(function(*): void)|*|UnwrapNestedRefs<{}>|UnwrapNestedRefs<{}>}
 * @example const { testMutation } = mutationMapper('setting', ["testMutation"])
 */
export function mutationMapper() {
    const store = useStore()
    let mapperFn = mapMutations
    const mapper = arguments.length === 1 ? arguments[0] : arguments[1]
    if(arguments.length === 2) {
        mapperFn = createNamespacedHelpers(arguments[0]).mapMutations
    }
    // 获取 mutation 中的api 并存放在 mutationFns 对象中
    const mutationFns = mapperFn(mapper)

    const storeMutatons = {}
    Object.keys(mutationFns).forEach(item => {
        const fn = mutationFns[item].bind({ $store: store })
        storeMutatons[item] =  params => fn(params)
    })
    return storeMutatons
}
