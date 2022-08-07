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
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
          class="userNameInput"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
          class="psdInput"
        >
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
export default defineComponent({
  setup() {
    const router = useRouter();
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });

    // 注册路由跳转
    const goToRegister = () => {
      router.push("/register");
    };

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      formState,
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