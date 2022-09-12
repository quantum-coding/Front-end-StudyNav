<template>
  <a-card>
    <a-result
      status="success"
      title="修改成功"
      :sub-title="`${second}秒后返回推荐中心`"
    >
      <template #extra>
        <a-button key="console" type="primary" @click="goToAddRes"
          >继续修改</a-button
        >
        <a-button key="buy" @click="backToShare">返回推荐中心</a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    var backForWhile;
    const second = ref(10);
    const router = useRouter();

    const goToAddRes = () => {
      let currRouter = router.currentRoute.value;
      let { id } = currRouter.params;
      clearInterval(backForWhile);
      router.push(`/user/addResource/${id}`);
    };

    const backToShare = () => {
      clearInterval(backForWhile);
      router.push("/user/share");
    };

    onMounted(() => {
      backForWhile = setInterval(() => {
        if (second.value > 0) {
          second.value = second.value - 1;
          console.log(second.value);
        } else {
          clearInterval(backForWhile);
          backToShare();
          return;
        }
      }, 1000);
    });

    return {
      second,
      goToAddRes,
      backToShare,
    };
  },
});
</script>