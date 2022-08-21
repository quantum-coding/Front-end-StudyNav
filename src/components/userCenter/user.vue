<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header :style="{ background: '#fff', padding: 0 }" class="header">
      <div class="logo">
        <img src="../../assets/网站logo.png" alt="" />
        <h1 id="logoName">前端导航</h1>
      </div>
      <a-dropdown>
        <a-avatar
          :size="{ xs: 24, sm: 32, md: 40, lg: 42, xl: 45, xxl: 70 }"
          class="userAvatar"
        >
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu class="dropMenu_style">
            <a-menu-item>
              <user-outlined />
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <bell-outlined />
              <a href="javascript:;">消息通知</a>
            </a-menu-item>
            <a-divider style="height: 1px; margin: 0" />
            <a-menu-item>
              <logout-outlined style="color: rgba(255, 51, 0, 0.85)" />
              <a href="javascript:;" style="color: rgba(255, 51, 0, 0.85)"
                >退出登录</a
              >
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        theme="light"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="light"
          mode="inline"
          @click="selectItem"
        >
          <a-menu-item key="/user/info" class="menu_item">
            <user-outlined />
            <span class="nav-text">个人资料</span>
          </a-menu-item>
          <a-menu-item key="/user/like">
            <video-camera-outlined />
            <span class="nav-text">我的收藏</span>
          </a-menu-item>
          <a-menu-item key="/user/share">
            <upload-outlined />
            <span class="nav-text">推荐资源</span>
          </a-menu-item>
          <a-menu-item key="/user/message">
            <user-outlined />
            <span class="nav-text">消息通知</span>
          </a-menu-item>
          <a-menu-item key="/user/write">
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
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BellOutlined,
    LogoutOutlined,
  },

  setup() {
    const router = useRouter();
    const selectedKeys = reactive([]);

    const onCollapse = (collapsed, type) => {
      console.log(collapsed, type);
    };

    const onBreakpoint = (broken) => {
      console.log(broken);
    };

    const selectItem = (item) => {
      selectedKeys[0] = [];
      selectedKeys[0] = item.key;
      console.log(item.key);
      router.push(item.key);
    };

    return {
      selectedKeys,
      selectItem,
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

.dropMenu_style {
  a {
    color: rgba(0, 0, 0, 0.85);
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