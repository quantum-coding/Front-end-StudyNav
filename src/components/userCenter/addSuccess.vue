<template>
  <a-card>
    <a-result
      status="success"
      title="申请成功"
      sub-title="已提交管理员审核，预计在1-3个工作日内处理，请耐心等待"
    >
      <template #extra>
        <a-button key="console" type="primary" @click="goToAddRes"
          >继续推荐</a-button
        >
        <a-button key="buy" @click="backToShare">返回</a-button>
      </template>
    </a-result>
  </a-card>
</template>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const goToAddRes = () => {
      router.push("/user/addResource");
    };

    const backToShare = () => {
      router.push("/user/share");
    };

    return {
      goToAddRes,
      backToShare,
    };
  },
});
</script>