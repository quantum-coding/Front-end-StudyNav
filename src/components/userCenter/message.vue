<template>
  <a-card title="消息">
    <template #extra>
      <a-button style="margin-right: 10px">全部已读</a-button>
      <a-button>清除</a-button>
    </template>
    <a-select
      v-model:value="value"
      label-in-value
      style="width: 120px"
      :options="options"
      @change="handleChange"
    ></a-select>
    <a-empty :image="simpleImage" />
    <a-pagination
      style="margin-top: 50px; text-align: right"
      v-model:current="current"
      :total="50"
      show-less-items
    />
  </a-card>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Empty } from "ant-design-vue";
export default defineComponent({
  setup() {
    const options = ref([
      {
        value: "已读",
        label: "已读",
      },
      {
        value: "未读",
        label: "未读",
      },
    ]);

    const handleChange = (value) => {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };

    return {
      value: ref({
        value: "消息状态",
      }),
      options,
      handleChange,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      current: ref(2),
    };
  },
});
</script>