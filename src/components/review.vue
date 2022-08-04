<template>
  <a-page-header
    class="page_header"
    style="border: 1px solid rgb(235, 237, 240)"
    title="漫天面经"
    sub-title="多学习别人的面试经验有助于提高面试通过率哦！"
  />
  <a-layout-content class="content_card">
    <a-card>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <template #title>
                <a href="https://www.antdv.com/">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <a-pagination v-model:current="current" :total="50" show-less-items />
    </a-card>
  </a-layout-content>
</template>

<script>
import { defineComponent, ref } from "vue";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
export default defineComponent({
  setup() {
    return {
      data,
      current: ref(2),
    };
  },
});
</script>

<style lang="less" scoped>
.page_header {
  position: relative;
  margin: 10px auto 10px;
  background-color: #fff;
}
</style>
