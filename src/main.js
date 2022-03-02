import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/index.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import User from './components/userCenter/user.vue'
import { Layout, Button, Menu, Breadcrumb, Avatar, Tooltip, Form, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index', component: Index,
  },
  {
    path:'/login', component: Login,
  },
  {
    path:'/register', component: Register,
  },
  {
    path:'/user', component: User,
  },

]

const router = new createRouter({
  history: createWebHistory(), // history为必填项
  routes
})



createApp(App).
  use(router).
  use(Layout).
  use(Menu).
  use(Breadcrumb).
  use(Button).
  use(Avatar).
  use(Tooltip).
  use(Form).
  use(Input).
  mount('#app')
