<template>
  <div>
    <a-card title="推荐记录" :bordered="false" style="width: 100%">
      <a-select
        v-model:value="value"
        label-in-value
        style="width: 120px"
        :options="options"
        @change="handleChange"
      ></a-select>
      <a-empty :image="simpleImage" />
      <a-button type="primary" style="left: 50%; transform: translateX(-50%)"
        >快来推荐资源吧</a-button
      >
      <a-pagination
        style="margin-top: 50px; text-align: right"
        v-model:current="current"
        :total="50"
        show-less-items
      />
    </a-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Empty } from "ant-design-vue";
export default defineComponent({
  setup() {
    const options = ref([
      {
        value: "已发布",
        label: "已发布",
      },
      {
        value: "已审核",
        label: "已审核",
      },
      {
        value: "拒绝",
        label: "拒绝",
      },
    ]);

    const handleChange = (value) => {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };

    return {
      value: ref({
        value: "推荐资源",
      }),
      options,
      handleChange,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      current: ref(2),
    };
  },
});
</script>