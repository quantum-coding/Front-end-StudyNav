<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider :collapsed="collapsed" :collapsible="true" @collapse="collapseSider">
      <div class="logo">
        <img
          src="../assets/网站logo.png"
          alt=""
        />
        <h1 id="logoName">前端导航</h1>
      </div>
      <a-menu theme="dark" :selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>今日推荐</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>开发基础</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>初学阶段</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>前端进阶</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="7">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="8">
          <file-outlined />
          <span>新鲜面经</span>
        </a-menu-item>
        <a-menu-item key="9">
          <file-outlined />
          <span>求助专区</span>
        </a-menu-item>
        <a-menu-item key="10">
          <file-outlined />
          <span>反馈角</span>
        </a-menu-item>
        <a-menu-item key="10">
          <file-outlined />
          <span>开发工具</span>
        </a-menu-item>
        <a-menu-item key="10">
          <file-outlined />
          <span>求学经验</span>
        </a-menu-item>
        <a-menu-item key="10">
          <file-outlined />
          <span>关于网站</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;" class="header">
      <a-tooltip title="登录享受更多惊喜" :color="color" arrowPointAtCenter=true>
        <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 42, xl: 45, xxl: 70 }" 
        class="userAvatar" @click="goToLogin">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </a-tooltip>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
const color = ['blue'];
export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },

  setup() {
    const router = useRouter();
    const goToLogin = () => {
      router.push('/login');
    }
    return {
      color,
      goToLogin,
    }
  },

  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(["1"]),
    };

  },

  methods: {
    // 点击tirgger按钮时触发的侧边栏收起
    collapseSider() {
      this.collapsed = !this.collapsed;
      let logoName = document.getElementById("logoName");
      logoName.style.display =  logoName.style.display == "none" ? "":"none";
    }

  }
});
</script>

<style lang="less" scoped>

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
  color: #fff;
}

.header {
  display:flex;
  align-items: center;

  .userAvatar {
    margin-left: auto;
    margin-right: 60px;
  }

  .userAvatar:hover {
    cursor: pointer;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>