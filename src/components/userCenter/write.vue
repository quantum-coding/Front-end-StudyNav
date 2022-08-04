<template>
  <a-card title="写面经">
    <a-form :model="formState" v-bind="layout" name="nest-messages">
      <a-form-item
        :name="['article', 'title']"
        label="文章标题"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.article.title" />
      </a-form-item>
      <a-form-item
        :name="['article', 'labels']"
        label="标签"
        :rules="[{ required: true }]"
      >
        <a-input v-model:value="formState.article.labels" />
      </a-form-item>
      <a-form-item label="类别" :rules="[{ required: true }]">
        <a-select
          v-model:value="value"
          label-in-value
          style="width: 120px"
          :options="options"
        ></a-select>
      </a-form-item>
      <a-form-item label="文章内容" :rules="[{ required: true }]">
        <QuillEditor theme="snow" style="height: 400px" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 2 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineComponent({
  components: {
    QuillEditor,
  },
  setup() {
    const layout = {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 20,
      },
    };
    const formState = reactive({
      article: {
        title: "",
        email: "",
        website: "",
        labels: "",
        introduction: "",
      },
    });

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
    return {
      layout,
      formState,
      options,
    };
  },
});
</script>

<style lang="less" scoped>
</style>