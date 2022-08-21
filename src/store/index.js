import { createStore } from "vuex";

const store = createStore({
    state() {
        const user = {
            user_id: window.sessionStorage.getItem("userId"),
        }
        return {
            user
        }
    },
    mutations: {

    },
    actions: {

    }
})

export default store