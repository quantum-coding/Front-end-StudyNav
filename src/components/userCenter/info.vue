<template>
  <div>
    <a-card>
      <a-avatar :size="96" :src="formState.user.avatar"></a-avatar>
    </a-card>
    <a-card class="info_form" title="信息">
      <template #extra>
        <a href="#" @click="showModal"><edit-two-tone />编辑</a>
      </template>
      <table>
        <tr>
          <td>用户名</td>
          <td>{{ formState.user.username }}</td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td>
            {{ formState.user.email ? formState.user.email : "暂无" }}
          </td>
        </tr>
        <tr>
          <td>兴趣</td>
          <td>
            {{ formState.user.hobbies ? formState.user.hobbies : "暂无" }}
          </td>
        </tr>
        <tr>
          <td>个人简介</td>
          <td>
            {{
              formState.user.introduction ? formState.user.introduction : "暂无"
            }}
          </td>
        </tr>
        <tr>
          <td>地区</td>
          <td>
            {{ formState.user.area ? formState.user.area : "未知" }}
          </td>
        </tr>
      </table>
    </a-card>
    <a-modal
      v-model:visible="visible"
      title="修改信息"
      :confirm-loading="confirmLoading"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form
        :model="modalFormState"
        v-bind="layout"
        ref="formRef"
        name="nest-messages"
        @finish="onFinish"
      >
        <a-form-item
          :name="['user', 'username']"
          label="用户名"
          :rules="[
            { required: true, message: '用户名不能为空' },
            {
              validator: validateUserName,
              trigger: 'onblur',
            },
          ]"
        >
          <a-input v-model:value="modalFormState.user.username" />
        </a-form-item>
        <a-form-item
          :name="['user', 'email']"
          label="邮箱"
          :rules="[{ type: 'email' }]"
        >
          <a-input v-model:value="modalFormState.user.email" />
        </a-form-item>
        <a-form-item :name="['user', 'avatar']" label="用户头像">
          <a-upload
            v-model:file-list="fileList"
            :beforeUpload="beforeUpload"
            :customRequest="uploadImage"
            list-type="picture-card"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 1">
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
          <a-textarea v-model:value="modalFormState.user.hobbies" />
        </a-form-item>
        <a-form-item :name="['user', 'introduction']" label="个人简介">
          <a-textarea v-model:value="modalFormState.user.introduction" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { validateUserName } from "../../hooks/validateUserName";
// import { useState } from "../../hooks/useMapState";
import { getInfo, updateInfo } from "../../util/Info";
import { uploadAvatar } from "../../util/uploadAvatar";

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
    const store = useStore();
    const modalText = ref("Content of the modal");
    const visible = ref(false);
    const confirmLoading = ref(false);
    const formRef = ref();
    const formData = new FormData();

    // 绑定用户信息的绑定对象
    const formState = reactive({
      user: {
        username: "",
        email: "",
        hobbies: "",
        avatar: "",
        introduction: "",
        area: "",
      },
    });

    // 绑定上传信息的表单对象
    const modalFormState = reactive({
      user: {
        id: undefined,
        username: "",
        email: "",
        hobbies: "",
        avatar: "",
        introduction: "",
        area: "",
      },
    });

    // 面试的难点，后期可以研究写在简历上
    onMounted(async () => {
      // 获取用户的信息
      let { data } = await getInfo(store.state.user.user_id);
      console.log(data);
      formState.user.username = data.user.user_name;
      formState.user.email = data.user.user_email;
      formState.user.hobbies = data.user.user_hobbies;
      formState.user.avatar = data.user.user_avatar;
      formState.user.introduction = data.user.user_introduction;
      formState.user.area = data.user.user_area;
      // console.log(formRef);
    });

    const showModal = () => {
      visible.value = true;
      let user = { ...formState.user, id: Number(store.state.user.user_id) };
      modalFormState.user = user;
      if (modalFormState.user.avatar) {
        fileList.value[0] = {
          uid: "1",
          status: "done",
          url: modalFormState.user.avatar,
        };
      }
    };

    const beforeUpload = (file) => {
      const reader = new FileReader();
      //获取还未上传文件的路径，并将其保存到缩略图路径当中
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file.thumbUrl = e.target.result;
        fileList.value[0] = file;
      };
    };

    const uploadImage = (file) => {
      // console.log(file);
      formData.delete("file");
      formData.append("file", file.file);
      // formData对象需要利用get方法访问添加的对象，直接输出对象是无法访问的
      console.log(formData.get("file"));
    };

    const handleOk = () => {
      formRef.value.validateFields().then(async () => {
        confirmLoading.value = true;
        // 如果没有需要上传的头像，就不需要上传头像
        if (fileList.value.length == 0) {
          modalFormState.user.avatar = "";
        } else {
          // 上传头像,获取头像的imageUrl
          let { data } = await uploadAvatar(formData);
          modalFormState.user.avatar = data.data.imageUrl;
        }

        let { data } = await updateInfo(modalFormState);
        if (data.code == 200) {
          formState.user = { ...modalFormState.user };
          console.log(formState.user);
          confirmLoading.value = false;
          visible.value = false;
        }

        // let user = {
        //   username: formState.user.username,
        //   email: formState.user.email,
        //   hobbies: formState.user.hobbies,
        //   avater: "",
        //   introduction: formState.user.introduction,
        //   area: formState.user.area,
        // };
        // console.log(user);
      });
    };

    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };

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
        file.preview = await getBase64(file);
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };

    const afterClose = () => {
      // 弹出已经上传的文件
      fileList.value.pop();
    };

    return {
      store,
      modalText,
      formRef,
      visible,
      confirmLoading,
      validateUserName,
      uploadImage,
      showModal,
      handleOk,
      beforeUpload,
      formState,
      modalFormState,
      onFinish,
      layout,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
      afterClose,
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
