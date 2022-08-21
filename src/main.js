import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './components/index.vue'
import Recommend from './components/recommend.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import User from './components/userCenter/user.vue'
import Network from './components/preCourse/network.vue'
import Algorithm from './components/preCourse/algorithm.vue'
import OS from './components/preCourse/os.vue'
import React from './components/Frames/react.vue'
import Vue from './components/Frames/vue.vue'
import Angular from './components/Frames/angular.vue'
import htmlCss from './components/Base/htmlcss.vue'
import JS from './components/Base/js.vue'
import NodeJS from './components/backDev/nodeJS.vue'
import SpringBoot from './components/backDev/springBoot.vue'
import Info from './components/userCenter/info.vue'
import Like from './components/userCenter/like.vue'
import Share from './components/userCenter/share.vue'
import AddResource from './components/userCenter/addResource.vue'
import Messages from './components/userCenter/message.vue'
import Write from "./components/userCenter/write.vue"
import Tools from "./components/tools.vue"
import Review from "./components/review.vue"
import ReSource from "./components/reSource.vue"

import store from "./store/index"

import {
  Layout, Button, Menu, Breadcrumb, Avatar, Tooltip, Form, Input,
  PageHeader, Card, Row, Col, Image, Tag, Modal, Upload, Select,
  List, Pagination, Empty, Typography, Divider, Comment, Dropdown
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index', component: Index,
    children: [
      { path: '/recommend', component: Recommend, },
      { path: '/precourse/network', component: Network, },
      { path: '/precourse/algorithm', component: Algorithm, },
      { path: '/precourse/os', component: OS, },
      { path: '/frameset/react', component: React, },
      { path: '/frameset/vue', component: Vue, },
      { path: '/frameset/angular', component: Angular, },
      { path: '/developbase/htmlandcss', component: htmlCss, },
      { path: '/developbase/js', component: JS, },
      { path: '/backdev/nodejs', component: NodeJS, },
      { path: '/backdev/springboot', component: SpringBoot, },
      { path: '/resource', component: ReSource },
      { path: '/tools', component: Tools },
      { path: '/reviews', component: Review },
    ]
  },
  {
    path: '/login', component: Login,
  },
  {
    path: '/register', component: Register,
  },

  {
    path: '/user', component: User,
    children: [
      { path: '/user/info', component: Info },
      { path: '/user/like', component: Like },
      { path: '/user/share', component: Share },
      { path: '/user/addResource', component: AddResource },
      { path: '/user/message', component: Messages },
      { path: '/user/write', component: Write }
    ]
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
  use(Card).
  use(Row).
  use(Col).
  use(Image).
  use(Tag).
  use(Modal).
  use(Upload).
  use(Select).
  use(List).
  use(Pagination).
  use(Empty).
  use(Typography).
  use(Divider).
  use(Comment).
  use(Dropdown).
  use(store).
  mount('#app')
