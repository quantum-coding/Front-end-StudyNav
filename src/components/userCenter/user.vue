<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header :style="{ background: '#fff', padding: 0 }" class="header">
      <div class="logo">
        <img src="../../assets/网站logo.png" alt="" />
        <h1 id="logoName">前端导航</h1>
      </div>
      <a-avatar
        :size="{ xs: 24, sm: 32, md: 40, lg: 42, xl: 45, xxl: 70 }"
        class="userAvatar"
        @click="goToLogin"
      >
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        theme="light"
      >
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
          <a-menu-item key="/user/info">
            <user-outlined />
            <span class="nav-text">个人资料</span>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <span class="nav-text">我的收藏</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span class="nav-text">推荐资源</span>
          </a-menu-item>
          <a-menu-item key="4">
            <user-outlined />
            <span class="nav-text">消息通知</span>
          </a-menu-item>
          <a-menu-item key="5">
            <user-outlined />
            <span class="nav-text">写面经</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '24px 16px 0' }">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  },

  setup() {
    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type);
    };

    const onBreakpoint = (broken) => {
      console.log(broken);
    };

    return {
      selectedKeys: ref(["4"]),
      onCollapse,
      onBreakpoint,
    };
  },
});
</script>
<style lang="less" scoped>
.header {
  border-bottom: 2px solid #dee2e6;
}

.logo {
  height: 32px;
  width: 168px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.logo {
  position: relative;
  height: 32px;
  line-height: 32px;
  margin: 16px;
  padding: 0;
}

.logo img {
  float: left;
}

.logo h1 {
  float: left;
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  color: #000;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .userAvatar {
    margin-right: 60px;
  }

  .userAvatar:hover {
    cursor: pointer;
  }
}

.ant-layout-sider {
  background: #fff;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout-sub-header-background {
  background: #141414;
}
</style>