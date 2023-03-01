<template>
  <div class="index">
    <Head></Head>
    <div class="padding-10">
      <el-row :gutter="20">
        <el-col class="bg-white" :xs="0" :sm="4" :md="4" :lg="3">
          <Sidebar></Sidebar>
        </el-col>
        <el-col :xs="24" :sm="20" :md="20" :lg="21">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import Head from '@/components/head.vue'
import Sidebar from '@/components/sidebar.vue'
import { useValidateStore } from '@/stores'
const router = useRouter()
let aToken = computed(() => {
  return useValidateStore().aToken
})


watch(aToken, (val) => {
  if (val) {
    console.log(val)
    router.go(0)
  }
})

onMounted(() => {
  // init()
})
</script>
<style lang="scss" scoped>
.padding-10 {
  padding: 0 10px;
}
</style>

