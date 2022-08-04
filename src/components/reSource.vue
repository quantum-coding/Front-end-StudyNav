<template>
  <div style="padding-top: 16px">
    <a-card title="资源详情" :bodyStyle="{ padding: '0' }">
      <div class="card_detail">
        <div class="card_introduce">
          <a-image
            class="detail_img"
            :width="100"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <a-typography-title :level="3" style="margin-top: 16px"
            >js高级程序设计</a-typography-title
          >
          <div class="tag_bar">
            <a-tag color="#AAAAAA">
              <template #icon>
                <eye-outlined />
              </template>
              100
            </a-tag>
            <a-tag color="#cd201f">
              <template #icon>
                <heart-outlined />
              </template>
              22
            </a-tag>
            <a-tag color="#55acee">
              <template #icon>
                <share-alt-outlined />
              </template>
              100
            </a-tag>
          </div>
          <div class="description">javacript开发设计的圣经级书籍</div>
          <div class="tag_box">
            <a-tag>js</a-tag>
            <a-tag>开发书籍</a-tag>
          </div>
        </div>
        <a-divider />
        <table>
          <tbody>
            <tr>
              <td>
                <span class="ant-description-label">链接</span>
                <span
                  ><a href="#">www.js.com</a
                  ><copy-outlined style="color: #1890ff"
                /></span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="ant-description-label">详情</span>
                <span>
                  <div>
                    <p>js是一款圣经级的书籍</p>
                  </div>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="ant-description-label">时间</span>
                <span>2022年8月2日 0:20</span>
              </td>
            </tr>
            <tr>
              <span class="ant-description-label">荐者</span>
              <span>
                <a-avatar size="large">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </span>
              <span style="margin-left: 10px">黄小川</span>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card_actions">
        <ul>
          <li>
            <div style="border-right: 1px solid #f0f0f0">
              <div>
                <fire-outlined
                  :style="{ fontSize: '16px', color: '#A1A1A1' }"
                />
                <span class="button_name" style="margin-left: 5px">收藏</span>
              </div>
            </div>
          </li>
          <li>
            <div style="border-right: 1px solid #f0f0f0">
              <div>
                <share-alt-outlined
                  :style="{ fontSize: '16px', color: '#A1A1A1' }"
                />
                <span class="button_name" style="margin-left: 5px">分享</span>
              </div>
            </div>
          </li>
          <li>
            <div style="border-right: 1px solid #f0f0f0">
              <div>
                <export-outlined
                  :style="{ fontSize: '16px', color: '#A1A1A1' }"
                />
                <span class="button_name" style="margin-left: 5px">访问</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </a-card>
    <a-card title="评论" class="comment_box">
      <template #extra
        ><a-button type="primary" @click="showModal"
          ><comment-outlined :style="{ fontSize: '16px' }" />发表评论</a-button
        ></template
      >
      <a-modal
        v-model:visible="visible"
        title="发表评论"
        okText="发表"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
      >
        <a-form>
          <a-form-item :name="['user', 'comment']" label="评论">
            <a-textarea v-model:value="formState.user.introduction" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-comment>
        <template #actions>
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <template v-if="action === 'liked'">
                <LikeFilled @click="like" />
              </template>
              <template v-else>
                <LikeOutlined @click="like" />
              </template>
            </a-tooltip>
            <span style="padding-left: 8px; cursor: auto">
              {{ likes }}
            </span>
          </span>
          <span key="comment-basic-reply-to">回复</span>
        </template>
        <template #author><a>Han Solo</a></template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        </template>
        <template #datetime>
          <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ dayjs().fromNow() }}</span>
          </a-tooltip>
        </template>
      </a-comment>
    </a-card>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { defineComponent, ref, reactive } from "vue";
import {
  HeartOutlined,
  ShareAltOutlined,
  EyeOutlined,
  CopyOutlined,
  UserOutlined,
  FireOutlined,
  ExportOutlined,
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default defineComponent({
  components: {
    HeartOutlined,
    ShareAltOutlined,
    EyeOutlined,
    CopyOutlined,
    UserOutlined,
    FireOutlined,
    ExportOutlined,
    LikeFilled,
    LikeOutlined,
    CommentOutlined,
  },
  setup() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const likes = ref(0);
    const dislikes = ref(0);
    const action = ref();

    const like = () => {
      likes.value = 1;
      dislikes.value = 0;
      action.value = "liked";
    };

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

    const formState = reactive({
      user: {
        comment: "",
      },
    });

    return {
      layout,
      formState,
      likes,
      action,
      like,
      dayjs,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
    };
  },
});
</script>
<style lang="less" scoped>
.tag_bar {
  margin-bottom: 24px;
}
.tag_box {
  margin-top: 20px;
}
.ant-description-label::after {
  display: inline-block;
  content: ":";
  width: 10px;
}
td span div {
  display: inline-block;
  width: 600px;
}
td {
  padding: 1px 1px 16px;
}
.card_detail {
  padding: 20px 20px 0;
  .card_introduce {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.ant-image {
  left: 50%;
  transform: translateX(-50%);
}
.card_actions {
  box-sizing: border-box;
  position: relative;
  border-top: 1px solid #f0f0f0;
  margin-top: 30px;
  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100%;
    cursor: pointer;
  }
  ul li {
    display: flex;
    padding: 20px 0 20px;
    width: 33.3%;
  }

  ul li div {
    box-sizing: border-box;
    display: flex;
    // flex-direction: row;
    justify-content: center;
    width: 100%;
    align-items: center;
    .button_name {
      display: inline-block;
    }
  }
}
.comment_box {
  margin-top: 30px;
}
</style>