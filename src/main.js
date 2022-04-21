import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/index.vue'
import Recommend from './components/recommend.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import User from './components/userCenter/user.vue'
import { Layout, Button, Menu, Breadcrumb, Avatar, Tooltip, Form, Input,
         PageHeader } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App)
app.config.globalProperties.$axios = axios

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index', component: Index,
    children: [
      { path:'/recommend', component: Recommend, },
    ]
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



app.
  use(router).
  use(Layout).
  use(Menu).
  use(Breadcrumb).
  use(Button).
  use(Avatar).
  use(Tooltip).
  use(Form).
  use(Input).
  use(PageHeader).
  mount('#app')
