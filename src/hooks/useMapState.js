import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
    const store = useStore()

    // 获取对应对象对应的function，返回值形式为functions:{"属性名"：function,...}
    const storeStateFns = mapState(mapper)
    console.log("storeStateFns", storeStateFns)
    // 为函数绑定this
    const storeState = {}
    Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({ $store: store })
        storeState[fnKey] = computed(fn)
    })

    return storeState
}