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
      <a-menu theme="dark" 
        :selectedKeys="selectedKeys" 
        mode="inline" 
        v-for="item in menuList" 
        :key="item.menu_route"
        @click="selectItem">
        <a-sub-menu v-if="item.children && item.children.length !== 0" :key="item.menu_route">
          <template #title>{{ item.name }}</template>
            <a-menu-item  v-for="subItem in item.children" :key="subItem.menu_route">
              <span>{{ subItem.name }}</span>
            </a-menu-item>
        </a-sub-menu>
        
        <a-menu-item :key="item.menu_route" v-else>
          <pie-chart-outlined />
          <span>{{ item.name }}</span>
        </a-menu-item>
        
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;" class="header">
      <a-tooltip title="登录享受更多惊喜" :color="color" :arrowPointAtCenter="true">
        <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 42, xl: 45, xxl: 70 }" 
        class="userAvatar" @click="goToLogin">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </a-tooltip>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
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
  // DesktopOutlined,
  UserOutlined,
  // TeamOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    PieChartOutlined,
    // DesktopOutlined,
    UserOutlined,
    // TeamOutlined,
    // FileOutlined,
  },

  setup() {
    const router = useRouter();
    const goToLogin = () => {
      router.push('/login');
    };
    const color = 'blue';
    return {
      color,
      goToLogin,
    }
  },

  data() {
    const menuList = [];
    return {
      menuList,
      collapsed: ref(false),
      selectedKeys: ref(["1"]),
    };

  },

  created() {
    this.getMenulist();
  },

  methods: {
    // 点击tirgger按钮时触发的侧边栏收起
    collapseSider() {
      this.collapsed = !this.collapsed;
      let logoName = document.getElementById("logoName");
      logoName.style.display =  logoName.style.display == "none" ? "":"none";
    },

    async getMenulist () {
      let {data} = await this.$axios.get('/');
      this.menuList = data;
      console.log(this.menuList);
    },

    selectItem(item) {
      this.selectedKeys = [];
      this.selectedKeys.push(item.key);
      this.$router.push(item.key);
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

.page_header {
  background-color: #fff;
  margin: 10px auto 20px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>