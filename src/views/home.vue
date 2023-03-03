<template>
  <main class="gray mt-10 relative">
    <span class="title">基本信息</span>
    <el-card class="box-card" shadow="never">
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-form :model="base_info" :rules="rules" ref="form1" label-width="auto">
            <el-form-item label="上传图标" prop="profile_picture">
              <label
                for="uploaderFile-1"
                class="img-preview"
                :style="{ backgroundImage: fileUrl ? 'url(' + fileUrl + ')' : '' }"
              >
                <template v-if="!fileUrl">
                  <el-icon class="el-icon-upload"><UploadFilled /></el-icon>
                </template>
                <el-icon v-else @click.stop.prevent="removeFile" class="el-icon-error">
                  <Close />
                </el-icon>
              </label>
              <input
                type="file"
                ref="fileLogo"
                id="uploaderFile-1"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                @change="beforeUpload"
              />
            </el-form-item>
            <el-form-item label="Token" prop="token">
              <el-input v-model="base_info.token" clearable></el-input>
            </el-form-item>
            <el-form-item label="主链" prop="chain">
              <el-select v-model="base_info.chain" filterable placeholder="Select" clearable>
                <el-option
                  v-for="item in chainList"
                  :key="item.net_name"
                  :label="item.net_name"
                  :value="item.net_name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="总供应量" prop="totol_supply">
              <el-input v-model="base_info.totol_supply" clearable></el-input>
            </el-form-item>

            <!-- <el-form-item label="合约地址" prop="remark">
              <el-input v-model="form.remark" clearable></el-input>
            </el-form-item>
            <el-form-item label="精度" prop="remark">
              <el-input v-model="form.remark" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="官网" prop="website">
              <el-input
                v-model.trim="base_info.website"
                placeholder="请输入官网地址"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="白皮书" prop="white_paper">
              <el-input
                v-model.trim="base_info.white_paper"
                placeholder="请输入白皮书地址"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="twitter" prop="twitter">
              <el-input
                v-model.trim="base_info.twitter"
                placeholder="请输入twitter"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="telegram" prop="telegram">
              <el-input
                v-model.trim="base_info.telegram"
                placeholder="请输入telegram"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="btok" prop="btok">
              <el-input v-model.trim="base_info.btok" placeholder="请输入btok" clearable></el-input>
            </el-form-item>
            <el-form-item label="qq" prop="qq">
              <el-input v-model.trim="base_info.qq" placeholder="请输入qq" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model.trim="base_info.email"
                placeholder="请输入邮箱"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                v-model.trim="base_info.description"
                :rows="3"
                type="textarea"
                placeholder="请输入description"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <span class="title">合约机制</span>
    <el-card class="box-card" shadow="never">
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-form :model="contract_info" :rules="rules" ref="form2" label-width="auto">
                <div class="buy-in">买入</div>
                <el-form-item :label="$t('tm_buy_tax_for_fund')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_fund"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_fund')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_burn')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_burn"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_burn')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_lp')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_lp"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_lp')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_team')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_team"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_team')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_holders')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_holders"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_holders')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_lp_holders')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_lp_holders"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_lp_holders')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_buy_tax_for_other')">
                  <el-input
                    v-model="contract_info.tm_buy_tax_for_other"
                    clearable
                    :placeholder="`请输入买入${$t('tm_buy_tax_for_other')}`"
                  ></el-input>
                </el-form-item>
                <div class="buy-in">卖出</div>
                <el-form-item :label="$t('tm_sell_tax_for_fund')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_fund"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_buy_tax_for_fund')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_burn')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_burn"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_buy_tax_for_burn')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_lp')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_lp"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_sell_tax_for_lp')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_team')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_team"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_sell_tax_for_team')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_holders')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_holders"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_sell_tax_for_holders')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_lp_holders')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_lp_holders"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_sell_tax_for_lp_holders')}`"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('tm_sell_tax_for_other')">
                  <el-input
                    v-model="contract_info.tm_sell_tax_for_other"
                    clearable
                    :placeholder="`请输入卖出${$t('tm_sell_tax_for_other')}`"
                  ></el-input>
                </el-form-item>

            <el-form-item :label="$t('tm_max_hold_amount_per_wallet')">
              <el-input
                v-model="contract_info.tm_max_hold_amount_per_wallet"
                clearable
                :placeholder="`请输入${$t('tm_max_hold_amount_per_wallet')}`"
              ></el-input>
            </el-form-item>
            <el-form-item label="开盘时间" prop="opening_at">
              <el-date-picker
                v-model="contract_info.opening_at"
                clearable
                type="datetime"
                value-format="X"
                placeholder="选择时间"
              />
            </el-form-item>
            <el-form-item :label="$t('mechanism_intro')">
              <el-input
                v-model="contract_info.mechanism_intro"
                clearable
                :placeholder="`请输入${$t('mechanism_intro')}`"
                :rows="3"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <span class="title">地址备注</span>
    <el-card class="box-card mb-100" shadow="never">
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <el-form :model="wallet_tag" :rules="rules" ref="form3" label-width="auto">
            <el-form-item label="地址" prop="address">
              <el-input v-model="wallet_tag.address" clearable></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
              <el-radio-group v-model="wallet_tag.tag">
                <el-radio label="mabrket_address" size="large" border>营销地址</el-radio>
                <el-radio label="team_address" size="large" border>团队开发地址</el-radio>
                <el-radio label="community_address" size="large" border>社区地址</el-radio>
                <el-radio label="fund_address" size="large" border>基金地址</el-radio>
                <el-radio label="mining_address" size="large" border>挖矿地址</el-radio>
                <el-radio label="others" size="large" border>其他</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model.trim="wallet_tag.remark"
                :rows="3"
                type="textarea"
                placeholder="请输入remark"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <div class="footer">
      <el-button type="danger" plain @click="reset">重置</el-button>
      <el-button type="primary" plain>保存</el-button>
      <el-button type="primary" @click="submitForm" :loading="confirmLoading">提交</el-button>
    </div>

    <el-dialog title="上传icon" v-model="uploadDialogVisible" width="600px">
      <div style="width: 300px; height: 300px">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :maxImgSize="option.maxImgSize"
          :enlarge="option.enlarge"
          :high="option.high"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixed="option.fixed"
          :centerBox="option.centerBox"
          :canScale="option.canScale"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">取 消</el-button>
          <el-button type="primary" :loading="getCropBlobLoading" @click="getCropBlob">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import { getSingleApplyToken, applyToken, getChainList } from '@/api/index.ts'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

let Timer = null
export default {
  name: 'Home',
  components: {
    VueCropper
  },
  data() {
    return {
      form: {},
      base_info: {
        token: '',
        chain: '',
        totol_supply: '',
        website: '',
        logoUrl: '',
        profile_picture: '',
        email: '',
        white_paper: '',
        twitter: '',
        btok: '',
        qq: '',
        description: ''
      },
      contract_info: {
        tm_buy_tax_for_fund: '',
        tm_sell_tax_for_fund: '',
        tm_buy_tax_for_burn: '',
        tm_sell_tax_for_burn: '',
        tm_buy_tax_for_lp: '',
        tm_sell_tax_for_lp: '',
        tm_buy_tax_for_team: '',
        tm_sel_tax_for_team: '',
        tm_buy_tax_for_holders: '',
        tm_sell_tax_for_holders: '',
        tm_buy_tax_for_lp_holders: '',
        tm_sell_tax_for_lp_holders: '',
        tm_buy_tax_for_other: '',
        tm_sell_tax_for_other: '',
        tm_max_hold_amount_per_wallet: '',
        opening_at: 0,
        mechanism_intro: ''
      },
      wallet_tag: {
        address: '',
        tag: 'others',
        remark: ''
      },
      is_confirmed: false,
      rules: {
        token: [{ required: true, message: '必填项', trigger: 'blur' }],
        // tm_buy_tax_for_fund: [{ required: true, message: '必填项', trigger: 'blur' }]
        chain: [{ required: true, message: '必填项', trigger: 'blur' }],
        // profile_picture: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      tableData: [],
      dataLoading: false,
      confirmLoading: false,
      updateLoading: false,
      dialogVisible: false,
      uploadDialogVisible: false,
      option: {
        img: '',
        outputSize: 0.2,
        outputType: 'png',
        maxImgSize: 200,
        enlarge: 0.5,
        high: false,
        autoCrop: true,
        autoCropWidth: '200',
        autoCropHeight: '200',
        fixed: true,
        centerBox: true,
        canScale: false,
        fixedBox: true
      },
      file: '',
      fileUrl: '',
      getCropBlobLoading: false,
      dialogTitleType: 1,
      pageNO: 1,
      pageSize: 20,
      total: 0,
      chainList: []
    }
  },
  watch: {
    $route: {
      handler(newval, oldval) {
        if (newval.query.id) {
          this.getSingleApplyToken(newval.query.id)
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.getChainList()
  },
  methods: {
    getChainList() {
      this.dataLoading = true
      getChainList()
        .then(res => {
          if (res?.length > 0) {
            this.keys = Object.keys(res[0])
            this.keys.forEach(i => {
              this.form[i] = ''
            })
          }
          this.chainList = res || []
        })
        .catch(() => {
          this.chainList = []
        })
        .finally(() => {
          this.dataLoading = false
        })
    },
    getSingleApplyToken(id) {
      this.dataLoading = true
      getSingleApplyToken(id)
        .then(res => {
          this.base_info = res.base_info
          this.contract_info = res.contract_info
          this.wallet_tag = res.wallet_tag
          this.is_confirmed = res?.is_confirmed
          if (!this.is_confirmed) {
            this.$notify({
              title: '提示',
              message: '已提交，待审核',
              type: 'warning',
              duration: 0
            })
          }
          console.log(res)
        })
        .catch(err => {
          this.$message.error(err)
          console.log(err)
        })
        .finally(() => {
          this.dataLoading = false
        })
    },
    async submitForm() {
      let form1 = this.$refs.form1?.validate()
      let form2 = this.$refs.form2?.validate()
      let form3 = this.$refs.form3?.validate()
      Promise.all([form1, form2, form3])
        .then(res => {
          console.log('res', res)
           this.applyToken()
        })
        .catch(err => {
          console.log(err)
        })
    },
    shareLink(id) {
      this.$messageBox
        .alert(`${location.origin}/?id=${id}`, '提示', {
          confirmButtonText: '查看链接'
        })
        .then(() => {
          console.log('ppp',location.origin)
          this.$router.push({ name: 'Home', query: { id: id } })
        })
        .catch(() => {})
    },
    applyToken() {
      this.confirmLoading = true
      const formData = new FormData()
      const form = { ...this.form, ...this.base_info, ...this.contract_info, ...this.wallet_tag }
      Object.keys(this.form).forEach(key => {
        const value = this.form[key] ?? ''
        if (key === 'profile_picture' && value !== '') {
          formData.append('profile_picture', value, `${this.form.token}.png`)
        } else if (key !== 'symbol' && value !== '') {
          formData.append(key, value)
        }
      })
      let data1 = JSON.stringify(formData)
      applyToken(data1)
        .then(res => {
          this.$message.success(`提交成功`)
          this.dialogVisible = false
          res.InsertedID && this.shareLink(res.InsertedID)
          // this.getSingleApplyToken()
        })
        .catch(err => {
          console.log(err)
          this.$message.error(err)
        })
        .finally(() => {
          this.confirmLoading = false
        })
    },

    beforeUpload(e) {
      const file = e.target.files[0]
      const fileUrl = window.URL.createObjectURL(file)
      this.option.img = fileUrl
      this.uploadDialogVisible = true
    },
    removeFile() {
      this.form.profile_picture = null
      this.fileUrl = ''
      if (this.$refs.fileLogo) {
        this.$refs.fileLogo.value = ''
      }
      this.option.img = ''
    },
    getCropBlob() {
      this.$refs.cropper.getCropBlob(data => {
        const file = new File([data], this.form.token_address)
        this.form.profile_picture = file
        this.fileUrl = window.URL.createObjectURL(file)
        this.uploadDialogVisible = false
      })
    },
    reset() {
      this.$refs.form1.resetFields()
      this.$refs.form2.resetFields()
      this.$refs.form3.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination-container {
  text-align: center;
  margin: 30px 0 0 0;
}
.img-preview {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid #ebeef5;
  background-color: rgba(0, 0, 0, 0.02);
  // border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-position: center;
  position: relative;
  .el-icon-upload {
    font-size: 40px;
    color: #c0c4cc;
  }
  .add-text {
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    color: rgba(64, 158, 255, 1);
  }
  .el-icon-error {
    font-size: 20px;
    position: absolute;
    right: -10px;
    top: -10px;
  }
}

input#uploaderFile-1 {
  width: 0;
  height: 0;
  font-size: 0;
}
.box-card {
  text-align: center;
  border: 0;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px auto 10px;
  display: block;
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  text-align: right;
  margin-top: 20px;
  background: #fff;
  border-top: 1px solid #f2f2f5;
  padding: 20px 10px 20px;
  z-index: 1;
}
.el-button {
  padding: 15px 30px;
}
.buy-in{
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}
</style>