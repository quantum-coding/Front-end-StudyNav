import { validateName } from "../util/validateName";
import store from "../store/index";

export async function validateUserName(_rule, value) {
    console.log("store.state", store.state.user)
    let info = store.state.user.user_id ? { name: value, id: store.state.user.user_id } : { name: value }
    let { data } = await validateName(info);
    console.log(data);
    if (data.isExist) {
        return Promise.reject("用户名已存在，请重新输入！");
    } else {
        return Promise.resolve();
    }
}