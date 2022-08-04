<template>
  <div>
    <a-card title="收藏" :bordered="false" style="width: 100%">
      <a-select
        v-model:value="value"
        show-search
        placeholder="input search text"
        style="width: 200px"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="null"
        :options="data"
      ></a-select>

      <a-list item-layout="horizontal" :data-source="data" class="like_list">
        <template #renderItem="{ item }">
          <a-list-item class="like_list_item">
            <template #actions>
              <a key="list-loadmore-edit">
                <export-outlined
                  :style="{ fontSize: '18px', color: '#262626' }"
                />
              </a>
              <a key="list-loadmore-more">
                <star-filled :style="{ fontSize: '18px', color: 'gold' }" />
              </a>
            </template>
            <a-list-item-meta description="前端">
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
      <a-pagination
        v-model:current="current"
        :total="50"
        show-less-items
        style="margin-top: 50px; text-align: right"
      />
    </a-card>
  </div>
</template>

<script>
import { ExportOutlined, StarFilled } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
const data = [
  {
    title: "java技术图谱",
  },
  {
    title: "CSS权威指南",
  },
  {
    title: "你不知道的JavaScript",
  },
  {
    title: "深入浅出nodejs",
  },
];
export default defineComponent({
  setup() {
    return {
      data,
      current: ref(2),
    };
  },
  components: {
    ExportOutlined,
    StarFilled,
  },
});
</script>

<style lang="less" scoped>
.like_list {
  margin-top: 30px;
}

.like_list_item {
  height: 70px;
}
</style>