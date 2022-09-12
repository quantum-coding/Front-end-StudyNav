<template>
  <div>
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
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

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
    const fileList = ref([]);
    const previewVisible = ref(false);
    const previewImage = ref("");
    const previewTitle = ref("");
    const formData = new FormData();

    const beforeUpload = (file) => {
      const reader = new FileReader();
      //获取还未上传文件的路径，并将其保存到缩略图路径当中
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file.thumbUrl = e.target.result;
        fileList.value[0] = file;
      };
      console.log("上传前");
    };

    const uploadImage = (file) => {
      formData.delete("file");
      formData.append("file", file.file);
      console.log("file", file);
    };

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

    return {
      fileList,
      formData,
      previewVisible,
      previewImage,
      previewTitle,
      uploadImage,
      beforeUpload,
      handleCancel,
      handlePreview,
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
