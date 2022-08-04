<template>
  <div>
    <a-card>
      <a-avatar :size="96"></a-avatar>
    </a-card>
    <a-card class="info_form" title="信息">
      <template #extra>
        <a href="#" @click="showModal"><edit-two-tone />编辑</a>
      </template>
      <table>
        <tr>
          <td>用户名</td>
          <td>maitreya</td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td>jxufe.maitreya@qq.com</td>
        </tr>
        <tr>
          <td>兴趣</td>
          <td>暂无</td>
        </tr>
        <tr>
          <td>个人简介</td>
          <td>暂无</td>
        </tr>
        <tr>
          <td>地区</td>
          <td>中国</td>
        </tr>
      </table>
    </a-card>
    <a-modal
      v-model:visible="visible"
      title="修改信息"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
      >
        <a-form-item
          :name="['user', 'name']"
          label="用户名"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.user.name" />
        </a-form-item>
        <a-form-item
          :name="['user', 'email']"
          label="邮箱"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model:value="formState.user.email" />
        </a-form-item>
        <a-form-item :name="['user', 'avatar']" label="用户头像">
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
        <a-form-item :name="['user', 'hobbies']" label="兴趣">
          <a-textarea v-model:value="formState.user.hobbies" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="个人简介">
          <a-textarea v-model:value="formState.user.introduction" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons-vue";

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
    EditTwoTone,
    PlusOutlined,
  },
  setup() {
    const modalText = ref("Content of the modal");
    const visible = ref(false);
    const confirmLoading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      modalText.value = "The modal will be closed after two seconds";
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 2000);
    };

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
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
        hobbies: "",
        avater: "",
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
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
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
.info_form {
  margin-top: 20px;
}

tr td {
  padding-bottom: 10px;
}

tr td:first-child {
  padding-right: 50px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
