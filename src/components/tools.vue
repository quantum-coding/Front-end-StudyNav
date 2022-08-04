<template>
  <a-page-header
    class="page_header"
    style="border: 1px solid rgb(235, 237, 240)"
    title="工具库"
    sub-title="前端开发过程中有很多好用的工具库，合理利用可以提高开发效率呦!"
  />
  <a-layout-content class="content_card">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="8">
        <a-card
          style="width: 100%"
          class="res_card"
          :bodyStyle="{ padding: '0' }"
        >
          <div class="card_body">
            <a-image
              class="card_img"
              :width="80"
              :height="80"
              src="https://www.antdv.com/#error"
              fallback="data:image/png;base64,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"
            />
            <div class="card_detail">
              <div class="title">javascript高级程序设计</div>
              <span class="describe">javacript开发设计的圣经级书籍</span>
            </div>
            <div class="label_box">
              <a-tag color="pink">pink</a-tag>
              <a-tag color="red">red</a-tag>
              <a-tag color="orange">orange</a-tag>
            </div>
          </div>
          <div class="card_actions">
            <ul>
              <li>
                <span style="border-right: 1px solid #f0f0f0"
                  ><fire-outlined
                    :style="{ fontSize: '16px', color: '#A1A1A1' }"
                /></span>
              </li>
              <li>
                <span style="border-right: 1px solid #f0f0f0"
                  ><share-alt-outlined
                    :style="{ fontSize: '16px', color: '#A1A1A1' }"
                /></span>
              </li>
              <li>
                <span
                  ><export-outlined
                    :style="{ fontSize: '16px', color: '#A1A1A1' }"
                /></span>
              </li>
            </ul>
          </div>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card style="width: 100%">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <a-card style="width: 100%">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script>
import {
  FireOutlined,
  ShareAltOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  components: {
    FireOutlined,
    ShareAltOutlined,
    ExportOutlined,
  },
});
</script>

<style lang="less" scoped>
.page_header {
  position: relative;
  margin: 10px auto 10px;
  background-color: #fff;
}

.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}

.res_card {
  position: relative;
  .card_body {
    position: relative;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 10px;
    height: 200px;
    .card_img {
      position: absolute;
    }
    .card_detail {
      position: absolute;
      top: 20px;
      left: 35%;
      .title {
        font-size: 17px;
        font-weight: 500;
      }
      .describe {
        display: block;
        margin-top: 10px;
        height: 50px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .label_box {
      position: relative;
      height: 60px;
      top: 20px;
      text-align: right;
    }
  }
  .card_actions {
    box-sizing: border-box;
    position: relative;
    border-top: 1px solid #f0f0f0;
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

    ul li span {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
</style>