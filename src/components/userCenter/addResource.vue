<template>
  <div style="margin-top: -15px">
    <a-button type="link" @click="backToShare">&lt;&lt; 返回</a-button>
    <a-card :title="rid ? '修改资源' : '我要推荐'">
      <a-form
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        @finish="showConfirm"
      >
        <a-form-item
          :name="['resInfo', 'resName']"
          label="名称"
          :rules="[
            { required: true, message: '资源名不能为空!' },
            {
              max: 25,
              message: '资源名最多不超过25个字',
            },
          ]"
        >
          <a-input
            placeholder="网站文章等资源名,最多25个字"
            v-model:value="formState.resInfo.resName"
          />
        </a-form-item>
        <a-form-item
          :name="['resInfo', 'resDescribe']"
          label="描述"
          :rules="[
            { required: true, message: '描述不能为空' },
            {
              max: 80,
              message: '描述不超过80个字',
            },
          ]"
        >
          <a-input
            placeholder="用一句话简单介绍资源,最多80个字"
            v-model:value="formState.resInfo.resDescribe"
          />
        </a-form-item>
        <a-form-item
          :name="['resInfo', 'resAddress']"
          label="链接"
          :rules="[
            { required: true, message: '网址链接不能为空' },
            {
              pattern: /^htt(p|ps)\:\/\//,
              message: '网址必须以http(s)://开头！',
            },
          ]"
        >
          <a-input
            placeholder="为便于找到网址,请以http(s)开头"
            v-model:value="formState.resInfo.resAddress"
          />
        </a-form-item>
        <a-form-item
          :name="['resInfo', 'resLabels']"
          label="标签"
          :rules="[
            { required: true, message: '请至少选择一个标签' },
            { validator: validateLabels, trigger: 'change' },
          ]"
        >
          <a-select
            mode="tags"
            placeholder="最多可添加5个标签,可以选择已有选项,也可自行输入建立标签"
            v-model:value="formState.resInfo.resLabels"
            :options="options"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          :name="['resInfo', 'resChannel']"
          label="类别"
          :rules="[{ required: true, message: '请选择类别' }]"
        >
          <a-select
            ref="select"
            v-model:value="formState.resInfo.resChannel"
            placeholder="请选择资源类别"
            style="width: 120px"
          >
            <a-select-option value="network">计算机网络</a-select-option>
            <a-select-option value="dataStructure"
              >数据结构与算法</a-select-option
            >
            <a-select-option value="os">操作系统</a-select-option>
            <a-select-option value="htmlcss">HTML+CSS</a-select-option>
            <a-select-option value="js">javascript</a-select-option>
            <a-select-option value="vue">vue</a-select-option>
            <a-select-option value="react">react</a-select-option>
            <a-select-option value="angular">angular</a-select-option>
            <a-select-option value="nodejs">nodejs</a-select-option>
            <a-select-option value="springboot">springboot</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :name="['resInfo', 'resCover']" label="资源封面">
          <formUpload ref="uploadRef" />
        </a-form-item>
        <a-form-item :name="['resInfo', 'resDetail']" label="详情">
          <a-textarea
            v-model:value="formState.resInfo.resDetail"
            style="height: 100px"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 6 }">
          <a-button type="primary" html-type="submit" style="width: 150px">{{
            rid ? "修改资源" : "提交"
          }}</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import {
  createVNode,
  defineComponent,
  reactive,
  ref,
  toRaw,
  onBeforeMount,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { nanoid } from "nanoid";
import { Modal } from "ant-design-vue";
import {
  addResource,
  uploadResCover,
  getResDetail,
  updateRes,
} from "../../util/resource";
import { getCurrentTime } from "../../util/transFormDate";
import formUpload from "../public/formUpload.vue";

export default defineComponent({
  components: {
    formUpload,
  },
  setup() {
    const router = useRouter();
    const uploadRef = ref();
    const rid = ref("");
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };

    const backToShare = () => {
      router.push("/user/share");
    };

    const formState = reactive({
      resInfo: {
        resId: nanoid(),
        resName: "",
        resDescribe: "",
        resAddress: "",
        resLabels: [],
        resChannel: undefined,
        resCover: "",
        resDetail: "",
      },
    });

    const validateLabels = (_rules, value) => {
      if (value.length > 5) {
        formState.resInfo.resLabels.pop();
        return Promise.reject("最多只能选择五个标签！");
      } else {
        return Promise.resolve();
      }
    };

    onBeforeMount(() => {
      let currRouter = router.currentRoute.value;
      let { id } = currRouter.params;
      rid.value = id;
    });

    onMounted(async () => {
      if (rid.value) {
        let { data } = await getResDetail(rid.value);
        console.log(data);
        formState.resInfo = { ...data.resDetail };
        uploadRef.value.fileList.push({
          uid: "1",
          status: "done",
          url: formState.resInfo.resCover,
        });
        console.log(uploadRef.value.fileList);
      }
    });

    const showConfirm = () => {
      let title = "";
      if (rid.value) {
        title = "你确定要修改该资源吗？";
      } else {
        title = "你确定要上传该资源吗？";
      }
      Modal.confirm({
        title: title,
        icon: createVNode(ExclamationCircleOutlined),

        onOk() {
          onFinish();
        },

        onCancel() {
          console.log("Cancel");
        },

        class: "test",
      });
    };

    const onFinish = async () => {
      // 将响应式对象转化为普通对象
      let resInfo = toRaw(formState.resInfo);
      if (uploadRef.value.fileList.length == 0) {
        formState.resInfo.resCover = "";
      } else {
        //上传资源封面
        if (uploadRef.value.formData.get("file")) {
          let { data } = await uploadResCover(uploadRef.value.formData);
          resInfo.resCover = data.data.imageUrl;
        }
      }
      if (rid.value) {
        let { data } = await updateRes(formState);
        if (data.code == 200) {
          router.push(`/user/updateSuccess/${rid.value}`);
        }

        return;
      }

      resInfo.commendId = sessionStorage.getItem("userId");
      resInfo.submitTime = getCurrentTime();
      let res = await addResource(resInfo);
      if (res.status == 200) {
        router.push("/user/addSuccess");
      }
    };

    return {
      rid,
      formState,
      uploadRef,
      options: ["前端", "后端", "工具", "编程语言", "技术文档"].map((str) => ({
        value: str,
      })),
      showConfirm,
      onFinish,
      validateLabels,
      layout,
      backToShare,
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