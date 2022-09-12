<template>
  <div>
    <a-card title="推荐记录" :bordered="false" style="width: 100%">
      <template #extra>
        <a-button type="primary" @click="goToAddRes">快来推荐资源吧</a-button>
      </template>
      <a-select
        v-model:value="value"
        label-in-value
        style="width: 120px"
        :options="options"
        @change="handleChange"
      ></a-select>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ ...paginationProps }"
        bordered
        class="table"
      >
        <template #cover="{ record }">
          <img style="width: 100px" :src="record.resCover" />
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'state'">
            <a-tag
              :color="
                record.state === 'audit'
                  ? 'blue'
                  : record.state === 'published'
                  ? 'green'
                  : 'red'
              "
              >{{ transFormState(record) }}</a-tag
            >
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button
              type="primary"
              shape="circle"
              size="large"
              style="margin-right: 20px"
              @click="updateInfo(record.resId)"
            >
              <template #icon><edit-outlined /></template>
            </a-button>
            <a-popconfirm
              title="你确定要删除该资源？"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmDelete(record.resId)"
            >
              <a-button type="primary" danger shape="circle" size="large">
                <template #icon><delete-outlined /></template>
              </a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  toRaw,
} from "vue";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { InitResList, deleteRes } from "../../util/resource";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "资源封面",
    dataIndex: "resCover",
    width: "20%",
    align: "center",
    slots: { customRender: "cover" },
  },
  {
    title: "资源名",
    dataIndex: "resName",
    width: "15%",
    align: "center",
  },
  {
    title: "推荐时间",
    dataIndex: "submitTime",
    width: "20%",
    align: "center",
  },
  {
    title: "推荐状态",
    dataIndex: "state",
    width: "20%",
    align: "center",
    slots: { customRender: "bodyCell" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "center",
    slots: { customRender: "bodyCell" },
  },
];

export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    const router = useRouter();
    const value = ref({ value: "all" });
    const options = ref([
      {
        label: "已发布",
        value: "published",
      },
      {
        label: "审核中",
        value: "audit",
      },
      {
        label: "未通过",
        value: "reject",
      },
      {
        label: "所有",
        value: "all",
      },
    ]);

    // 进入资源添加页面
    const goToAddRes = () => {
      router.push("/user/addResource");
    };

    const handleChange = () => {
      getResList();
    };

    const dataSource = ref([]);
    const store = useStore();

    const getResList = async () => {
      let params = {
        commenderId: store.state.user.user_id,
        type: toRaw(value.value).value,
      };
      let res = await InitResList(params);
      let { resList } = res.data;
      dataSource.value = resList.map((currVal, index) => {
        currVal.key = index.toString();
        return currVal;
      });
      console.log(dataSource);
    };

    onMounted(() => {
      getResList();
    });

    // 改变状态
    const transFormState = computed(() => {
      return function (record) {
        return record.state === "audit"
          ? "审核中"
          : record.state === "published"
          ? "已通过"
          : "未通过";
      };
    });

    const paginationProps = {
      pageSize: 5,
    };

    const updateInfo = (selectedId) => {
      router.push(`addResource/${selectedId}`);
    };

    const confirmDelete = async (selectedId) => {
      dataSource.value.forEach((data, index) => {
        // 删除该数据项
        if (data.resId === selectedId) {
          dataSource.value.splice(index, 1);
        }
      });
      let { data } = await deleteRes(selectedId);
      if (data.code == 200) {
        message.success(data.msg);
      }
    };

    const editableData = reactive({});

    const edit = (key) => {
      editableData[key] = cloneDeep(
        dataSource.value.filter((item) => key === item.key)[0]
      );
    };

    const save = (key) => {
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      );
      delete editableData[key];
    };

    const cancel = (key) => {
      delete editableData[key];
    };

    return {
      value,
      options,
      goToAddRes,
      handleChange,
      current: ref(2),
      dataSource,
      getResList,
      columns,
      transFormState,
      updateInfo,
      paginationProps,
      confirmDelete,
      editingKey: "",
      editableData,
      edit,
      save,
      cancel,
    };
  },
});
</script>
<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.table {
  margin-top: 20px;
}
</style>