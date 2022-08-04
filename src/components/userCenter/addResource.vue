<template>
  <div>
    <a-card title="我要推荐">
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item
          :name="['user', 'name']"
          label="名称"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.user.name" />
        </a-form-item>
        <a-form-item
          :name="['user', 'email']"
          label="描述"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model:value="formState.user.email" />
        </a-form-item>
        <a-form-item :name="['user', 'website']" label="链接">
          <a-input v-model:value="formState.user.website" />
        </a-form-item>
        <a-form-item :name="['user', 'labels']" label="标签">
          <a-input v-model:value="formState.user.labels" />
        </a-form-item>
        <a-form-item label="资源封面">
          <a-upload
            v-model:file-list="fileList"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 8">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :title="previewTitle"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="详情">
          <a-textarea v-model:value="formState.user.introduction" />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { PlusOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
}

export default defineComponent({
  components: {
    PlusOutlined,
  },
  setup() {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    const formState = reactive({
      user: {
        name: "",
        email: "",
        website: "",
        labels: "",
        introduction: "",
      },
    });

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const previewVisible = ref(false);
    const previewImage = ref("");
    const previewTitle = ref("");
    const fileList = ref([]);

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = "";
    };

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };

    return {
      formState,
      onFinish,
      layout,
      validateMessages,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
    };
  },
});
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>