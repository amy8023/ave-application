<template>
  <div class="head">
    <div class="flex-start width-100 padding-l-r-20">
      <img class="logo" src="@/assets/images/logo.png" alt="" />
      <ul class="link flex-1">
        <li class="flex-1"></li>
        <li>
          <!-- <a href="" @click.stop.prevent="handleSetLanguage">{{ language }}</a> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLanguageStore } from '@/stores'

import { useI18n } from 'vue-i18n'
import i18n from '@/lang/index'
// const t = i18n.global.t
// const { t } = useI18n()

let languageStore = useLanguageStore()
let language = computed((string) => {
  return languageStore.language
})
const locale = ref();

function handleSetLanguage() {

  console.log('t',i18n)
  if (languageStore.language === 'zh-cn') {
      i18n.locale = 'en'
    languageStore.setLanguage('en')
  } else {
      i18n.locale = 'zh-cn'
    languageStore.setLanguage('zh-cn')
  }
}
</script>
<style lang="scss" scoped>
.head {
  width: 100%;
  min-width: 350px;
  height: 64px;
  align-items: center;
  // position: fixed;
  z-index: 121;
  display: flex;
  top: 0;
  left: 0;
  color: #0e0e0e;
  backdrop-filter: blur(20px);
  background: #ffffffcc;
  border-bottom: 1px solid #eee;
  .logo {
    width: 125px;
  }
  .link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    li {
      padding: 20px 5px;
      @media (min-width: 768px) {
        padding: 20px 20px;
      }
    }
  }
  a {
    color: #0e0e0e;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
    -webkit-text-decoration-skip: objects;
  }
}
</style>
