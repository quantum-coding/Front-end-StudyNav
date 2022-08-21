<template>
  <a-layout style="min-height: 100vh">
    <a-layout-content style="position: relative">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="loginBox"
        :rules="rules"
      >
        <a-form-item label="Username" name="username" class="userNameInput">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Password" name="password" class="psdInput">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item class="loginBtn">
          <a-button
            type="primary"
            html-type="submit"
            style="margin-right: 100px"
            >登录</a-button
          >
          <a-button @click="goToRegister">注册</a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
    >

    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { login } from "../util/login";
import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const formState = reactive({
      username: "",
      password: "",
    });

    // 注册路由跳转
    const goToRegister = () => {
      router.push("/register");
    };

    const rules = {
      username: [
        {
          required: true,
          message: "用户名不能为空！",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空！",
        },
        {
          min: 6,
          message: "密码不能小于6位！",
        },
        {
          max: 12,
          message: "密码不能大于12位！",
        },
      ],
    };

    const onFinish = async (values) => {
      let { data } = await login(values);
      if (data.success) {
        message.success(data.msg);
        store.state.user.user_id = data.userId;
        sessionStorage.setItem("userId", data.userId);
        router.push("/user");
      } else {
        message.error(data.msg);
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formState,
      rules,
      goToRegister,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style lang="less" scoped>
.loginBox {
  position: absolute;
  height: 300px;
  width: 450px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1%;
}

.userNameInput {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 25%;
  transform: translate(-50%, 0);
}

.psdInput {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 43%;
  transform: translate(-50%, 0);
}

.loginBtn {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 70%;
}

body {
  height: 100%;
}

html {
  height: 100%;
}
</style>