<template>
  <el-dialog
    v-model="validateStore.validateDialogVisible"
    width="350px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <span>{{ $t('securityVerification') }}</span>
    </template>
    <el-form
      ref="formRef"
      :model="form"
      label-width="auto"
      size="large"
      @submit.prevent="onSubmit"
      :rules="rules"
    >
      <div class="captchaCode">
        <img
          class="image-captchaCode"
          :src="captchaCode.image"
          alt=""
          srcset=""
        />
        <el-button type="primary" link @click.stop="_getCaptcha" :disabled="disabled">{{ $t('refreshCode') }}</el-button>
      </div>
      <el-form-item label="" prop="value">
        <el-input
          v-model.trim="form.value1"
          :placeholder="$t('enterCalculation')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" :disabled="disabled" native-type="submit">{{ $t('verify') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
// import { showNotify } from 'vant'
import { getCaptcha, verifyCaptcha } from '@/api'
import { useValidateStore } from '@/stores'
import { useI18n } from 'vue-i18n'
// import type { FormInstance } from 'vant'
import { defineComponent, reactive, toRefs } from "vue";

import { ElMessage, ElDialog, ElForm } from "element-plus";


const { t } = useI18n()

let form = $ref({ value1: '' })
let captchaCode = $ref({
  id: '',
  image: ''
})
let loading = $ref(false)
let disabled = $ref(false)

let validateStore = useValidateStore()

let validateDialogVisible = computed(() => {
  return validateStore.validateDialogVisible
})

watch(validateDialogVisible, (val) => {
  if (val) {
    reset()
  }
})

const formRef = ref<InstanceType<typeof ElForm>>()

function reset() {
  if (validateStore.validateDialogVisible) {
    form.value1 = ''
    formRef.value?.resetFields()
    _getCaptcha()
  }
}

async function onSubmit() {
  loading = true
  verifyCaptcha(captchaCode.id, form.value1).then(
    (res) => {
      if (res.is_verified) {
        ElMessage({ type: 'success', message: t('verifySuccess') })
        validateStore.setAToken(res?.ave_token || '')
        validateStore.validateDialogVisible = false
        validateStore.routeKey++
      } else {
        ElMessage({ type: 'error', message: t('verifyFail') })
        reset()
      }
    }
  ).catch(() => {
    ElMessage({ type: 'error', message: t('verifyFail') })
    reset()
  }).finally(() => {
    loading = false
  })
}

function _getCaptcha() {
  disabled = true
  getCaptcha().then((res) => {
    captchaCode = res
  }).finally(() => {
    disabled = false
  })
}

onMounted(() => {
  reset()
})

</script>

<style lang="scss" scoped>
.captchaCode {
  text-align: right;
}
.btn-text {
  margin: 5px 0;
  border: none;
  color: var(--van-primary-color);
  background-color: transparent;
  &:active, &:disabled {
    opacity: 0.5;
  }
}

.popup-title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
}
.image-captchaCode {
  width: 100%;
}
.popup-content {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  :deep(.van-field) {
    background-color: #F8F8F8;
    border-radius: 8px;
    border: 1px solid #dcdfe6;
    &:focus-within {
      border-color: var(--van-primary-color);
    }
    // padding: 20px 16px;
  }
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .btn-s {
    border-radius: 8px;
  }
}
</style>
