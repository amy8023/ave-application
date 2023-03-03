<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Grid /></el-icon>
        <span>{{ $t('service') }}</span>
      </template>
      <el-menu-item index="2">{{ $t('token') }}</el-menu-item>
    </el-sub-menu>
    <!-- <el-menu-item index="3">
      <el-icon><HelpFilled /></el-icon>
      <span>设置</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.el-menu{
    border-right: 0;
    .el-menu-item.is-active{
        background: #ecf5ff;
        border-right: 3px solid #409eff;
    }
}
</style>