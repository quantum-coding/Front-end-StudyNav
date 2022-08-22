<template>
  <a-layout style="min-height: 100vh">
    <a-layout-content style="position: relative">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        :rules="rules"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="registerBox"
      >
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item label="确认密码" name="checkPass">
          <a-input-password v-model:value="formState.checkPass" />
        </a-form-item>

        <a-button type="primary" html-type="submit" class="registerBtn"
          >注册</a-button
        >
      </a-form>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { register } from "../util/register";
import { validateUserName } from "../hooks/validateUserName";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const formState = reactive({
      username: "",
      password: "",
      checkPass: "",
    });

    // let validateUserName = async (_rule, value) => {
    //   console.log("value:", value);
    //   let { data } = await validateName({ name: value });
    //   console.log(data);
    //   if (data.isExist) {
    //     return Promise.reject("用户名已存在，请重新输入！");
    //   } else {
    //     return Promise.resolve();
    //   }
    // };

    let validatePass2 = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请再次输入密码！");
      } else if (value !== formState.password) {
        return Promise.reject("两次输入的密码不匹配！");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      username: [
        {
          required: true,
          message: "用户名不能为空！",
        },
        {
          validator: validateUserName,
          trigger: "onblur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
        {
          min: 6,
          message: "密码长度不能小于6位",
        },
      ],
      checkPass: [
        {
          validator: validatePass2,
          trigger: "change",
        },
      ],
    };

    const onFinish = async (values) => {
      let user = {};
      // 获取用户提交的用户名、密码和注册时间
      user.username = values.username;
      user.password = values.password;
      user.registerTime = new Date().toJSON().slice(1, 10);
      let res = await register(user);

      console.log(res);
      if (res.status == 200) {
        router.push("/user");
        message.success("注册成功！快来学习叭！");
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formState,
      rules,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style lang="less" scoped>
.registerBox {
  position: absolute;
  height: 300px;
  width: 450px;
  padding-top: 40px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1%;
}

.registerBtn {
  width: 300px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>
