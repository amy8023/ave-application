<template>
  <main class="gray mt-10 relative">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="{ span: 16, offset: 4 }">
        <el-form
          :model="searchObj"
          :rules="rules"
          ref="formSearch"
          label-width="auto"
          @submit.prevent="search"
        >
          <span class="title">{{ $t('search') }}</span>
          <div class="box-card">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="10">
                <el-form-item label="Token" prop="base_info.token">
                  <el-input v-model.trim="searchObj.base_info.token" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="6">
                <el-form-item :label="$t('chain')" prop="base_info.chain">
                  <el-select
                    v-model="searchObj.base_info.chain"
                    filterable
                    placeholder="Select"
                    clearable
                  >
                    <el-option
                      v-for="item in chainList"
                      :key="item.net_name"
                      :label="item.net_name"
                      :value="item.net_name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :md="4">
                <el-form-item label="">
                  <div style="text-align: center; width: 100%">
                    <el-button type="primary" native-type="submit" :loading="loadingSearch">
                      {{ $t('search') }}
                    </el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="auto"
          @submit.prevent="submitForm"
        >
          <span class="title">{{ $t('basic') }}</span>
          <div class="box-card">
            <el-form-item label="Logo" v-if="form.base_info.logoUrl">
              <el-image
                style="width: 60px; height: 60px; border-radius: 50%"
                :src="
                  form.base_info.logoUrl || formatIcon(form.base_info.token, form.base_info.chain)
                "
                fit="fill"
              >
                <template #error>
                  <img
                    width="60"
                    height="60"
                    src="https://ave.s3.ap-east-1.amazonaws.com/token_icon/defaultToken.png"
                    alt=""
                    srcset=""
                  />
                </template>
              </el-image>
            </el-form-item>
            <el-form-item :label="$t('upload')">
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
            <el-form-item label="symbol">
              {{ form.base_info.symbol || '--' }}
            </el-form-item>
            <el-form-item label="token" prop="base_info.token">
              {{
                form.base_info.token?.slice(0, 2) + '...' + form.base_info.token?.slice(-4) || '--'
              }}
            </el-form-item>
            <el-form-item :label="$t('chain')" prop="base_info.chain">
              {{ form.base_info.chain || '--' }}
            </el-form-item>
            <el-form-item :label="$t('total')" prop="totol_supply">
              <el-input v-model.number="form.base_info.totol_supply" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('openAt')" prop="opening_at">
              <el-date-picker
                v-model.number="form.base_info.opening_at"
                clearable
                type="datetime"
                value-format="X"
                placeholder=""
              />
            </el-form-item>
            <el-form-item :label="$t('website')" prop="website">
              <el-input
                v-model.trim="form.base_info.website"
                :placeholder="`${$t('pls')}${$t('website')}`"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('whitepaper')" prop="whitepaper">
              <el-input
                v-model.trim="form.base_info.whitepaper"
                :placeholder="`${$t('pls')}${$t('whitepaper')}`"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="twitter" prop="twitter">
              <el-input
                v-model.trim="form.base_info.twitter"
                :placeholder="`${$t('pls')}twitter`"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="telegram" prop="telegram">
              <el-input
                v-model.trim="form.base_info.telegram"
                :placeholder="`${$t('pls')}telegram`"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="btok" prop="btok">
              <el-input
                v-model.trim="form.base_info.btok"
                placeholder="?????????btok"
                :placeholder="`${$t('pls')}btok`"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="discord" prop="discord">
              <el-input
                v-model.trim="form.base_info.discord"
                :placeholder="`${$t('pls')}discord`"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="QQ" prop="qq">
              <el-input
                v-model.trim="form.base_info.qq"
                :placeholder="`${$t('pls')}qq`"
                clearable
              ></el-input>
            </el-form-item>
          </div>
          <span class="title">{{ $t('mechanismIntroduction') }}</span>
          <div class="box-card">
            <el-collapse>
              <el-collapse-item>
                <template #title>
                  <el-form-item class="flex-1" :label="$t('buy_tax')" prop="contract_info.buy_tax">
                    <el-input
                      v-model="form.contract_info.buy_tax"
                      clearable
                      type="number"
                      min ="0"
                      max="100"
                      step="any"
                      :placeholder="`${$t('pls')}${$t('buy_tax')}`"
                    ></el-input>
                  </el-form-item>
                </template>
                <div class="content">
                  <el-form-item
                    :label="$t('tm_buy_tax_for_fund')"
                    prop="contract_info.tm_buy_tax_for_fund"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_fund"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_fund')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_burn')"
                    prop="contract_info.tm_buy_tax_for_burn"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_burn"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_burn')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_lp')"
                    prop="contract_info.tm_buy_tax_for_lp"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_lp"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_lp')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_team')"
                    prop="contract_info.tm_buy_tax_for_team"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_team"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_team')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_holders')"
                    prop="contract_info.tm_buy_tax_for_holders"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_holders"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_holders')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_lp_holders')"
                    prop="contract_info.tm_buy_tax_for_lp_holders"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_lp_holders"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_lp_holders')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_buy_tax_for_other')"
                    prop="contract_info.tm_buy_tax_for_other"
                  >
                    <el-input
                      v-model="form.contract_info.tm_buy_tax_for_other"
                      clearable
                      :placeholder="`${$t('pls')}${$t('buy')}${$t('tm_buy_tax_for_other')}`"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-collapse-item>

              <el-collapse-item>
                <template #title>
                  <el-form-item
                    class="flex-1"
                    :label="$t('sell_tax')"
                    prop="contract_info.sell_tax"
                  >
                    <el-input
                      v-model="form.contract_info.sell_tax"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell_tax')}`"
                    ></el-input>
                  </el-form-item>
                </template>
                <div class="content">
                  <el-form-item
                    :label="$t('tm_sell_tax_for_fund')"
                    prop="contract_info.tm_sell_tax_for_fund"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_fund"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_buy_tax_for_fund')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_burn')"
                    prop="contract_info.tm_sell_tax_for_burn"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_burn"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_buy_tax_for_burn')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_lp')"
                    prop="contract_info.tm_sell_tax_for_lp"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_lp"
                      clearable
                      :placeholder="`???${$t('pls')}${$t('sell')}${$t('tm_sell_tax_for_lp')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_team')"
                    prop="contract_info.tm_sell_tax_for_team"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_team"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_sell_tax_for_team')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_holders')"
                    prop="contract_info.tm_sell_tax_for_holders"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_holders"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_sell_tax_for_holders')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_lp_holders')"
                    prop="contract_info.tm_sell_tax_for_lp_holders"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_lp_holders"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_sell_tax_for_lp_holders')}`"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="$t('tm_sell_tax_for_other')"
                    prop="contract_info.tm_sell_tax_for_other"
                  >
                    <el-input
                      v-model="form.contract_info.tm_sell_tax_for_other"
                      clearable
                      :placeholder="`${$t('pls')}${$t('sell')}${$t('tm_sell_tax_for_other')}`"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-collapse-item>
            </el-collapse>
            <el-form-item
              :label="$t('tm_max_hold_amount_per_wallet')"
              prop="contract_info.tm_max_hold_amount_per_wallet"
            >
              <el-input
                v-model.number="form.contract_info.tm_max_hold_amount_per_wallet"
                clearable
                :placeholder="`${$t('pls')}${$t('tm_max_hold_amount_per_wallet')}`"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('mechanism_intro')">
              <el-input
                v-model="form.contract_info.mechanism_intro"
                clearable
                :placeholder="`${$t('pls')}${$t('mechanism_intro')}`"
                :rows="3"
                type="textarea"
              ></el-input>
            </el-form-item>
          </div>
          <span class="title">{{ $t('walletRemark') }}</span>
          <div class="box-card mb-100" style="margin-bottom: 100px">
            <div
              class="text-left flex-between bg-gray"
              v-for="(item, index) in form.wallet_tag"
              :key="index"
            >
              <div class="flex-1">
                <el-form-item :label="`${$t('address')}` + index" prop="address">
                  <el-input v-model="form.wallet_tag[index].address" clearable></el-input>
                </el-form-item>
                <el-form-item :label="`${$t('tag')}` + index" prop="tag">
                  <el-select
                    v-model="form.wallet_tag[index].tag"
                    filterable
                    placeholder="Select"
                    clearable
                  >
                    <el-option
                      v-for="item in wallet_tag_list_option"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="`${$t('remark')}` + index" prop="address">
                  <el-input v-model="form.wallet_tag[index].remark" clearable></el-input>
                </el-form-item>
              </div>
              <el-form-item>&nbsp;&nbsp;
                <el-button
                  type="danger"
                  plain
                  size="small"
                  @click="removeWalletTag(index)"
                  v-if="index > 0"
                  :loading="loadingRemove[index]"
                >
                  {{ $t('delete') }}
                </el-button>
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="addWalletTag"
                  v-if="index == 0"
                  :loading="loadingAdd"
                >
                  {{ $t('add') }}
                </el-button>
              </el-form-item>
            </div>
          </div>
          <div class="footer">
            <el-button type="danger" plain @click="reset">{{ $t('reset') }}</el-button>
            <el-button type="primary" plain @click="saveDraft" :loading="loadingDraft">
              {{ $t('saveDraft') }}
            </el-button>
            <el-button
              type="primary"
              native-type="submit"
              :loading="confirmLoading"
              :disabled="!form.base_info.token"
            >
              {{ $t('submit') }}
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog title="??????icon" v-model="uploadDialogVisible" width="600px">
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
          <el-button @click="reset">??? ???</el-button>
          <el-button type="primary" :loading="getCropBlobLoading" @click="getCropBlob">
            ??????
          </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<script>
import {
  getSingleApplyToken,
  applyToken,
  getChainList,
  submitLogo,
  getContractCheckResult,
  getMainToken,
  getTokenExtraDetail
} from '@/api/index.ts'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

export default {
  name: 'Home',
  components: {
    VueCropper
  },
  data() {
    const checkNum = (rule, value, callback) => {
      let n = Number.isNaN(Number(value))
      if (value !== '' && (n || (!n && (Number(value) < 0 || Number(value) > 100)))) {
        callback(new Error(this.$t('plsNumber')))
      } else {
        callback()
      }
    }
    const initForm = {
      base_info: {
        symbol: '',
        token: '',
        chain: '',
        totol_supply: 0,
        website: '',
        logoUrl: '',
        whitepaper: '',
        twitter: '',
        btok: '',
        qq: '',
        telegram: '',
        discord: '',
        opening_at: 0
      },
      contract_info: {
        buy_tax: '',
        sell_tax: '',
        tm_buy_tax_for_fund: '',
        tm_sell_tax_for_fund: '',
        tm_buy_tax_for_burn: '',
        tm_sell_tax_for_burn: '',
        tm_buy_tax_for_lp: '',
        tm_sell_tax_for_lp: '',
        tm_buy_tax_for_team: '',
        tm_sell_tax_for_team: '',
        tm_buy_tax_for_holders: '',
        tm_sell_tax_for_holders: '',
        tm_buy_tax_for_lp_holders: '',
        tm_sell_tax_for_lp_holders: '',
        tm_buy_tax_for_other: '',
        tm_sell_tax_for_other: '',
        tm_max_hold_amount_per_wallet: '',
        mechanism_intro: ''
      },
      wallet_tag: [
        {
          address: '',
          tag: '',
          remark: ''
        }
      ]
    }
    return {
      form: localStorage?.aveApplication ? JSON.parse(localStorage.aveApplication) : initForm,
      is_confirmed: false,
      rules: {
        'base_info.token': [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        'base_info.chain': [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        'contract_info.buy_tax': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.sell_tax': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_fund': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_fund': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_burn': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_burn': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_lp': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_lp': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_team': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_team': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_holders': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_holders': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_lp_holders': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_lp_holders': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_buy_tax_for_other': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_sell_tax_for_other': [{ trigger: 'blur', validator: checkNum }],
        'contract_info.tm_max_hold_amount_per_wallet': [{ trigger: 'blur', validator: checkNum }]
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
      fileUrl: localStorage?.fileUrl || '',
      getCropBlobLoading: false,
      chainList: [],
      loadingDraft: false,
      wallet_tag_list_option: [
        { name: this.$t('mabrketAddress'), value: 'mabrket_address' },
        { name: this.$t('teamAddress'), value: 'team_address' },
        { name: this.$t('communityAddress'), value: 'community_address' },
        { name: this.$t('fundAddress'), value: 'fund_address' },
        { name: this.$t('miningAddress'), value: 'mining_address' }
      ],
      loadingRemove: [false],
      loadingAdd: false,
      searchObj: {
        base_info: {
          token: '',
          chain: ''
        }
      },
      loadingSearch: false,
      profile_picture: null,
      activeNames: '1'
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
  mounted() {
    this.loadingRemove = this.form.wallet_tag.map(i => false)
    this.getChainList()
  },
  methods: {
    inputValue(value) {
      console.log('----', value)
      let n = Number.isNaN(Number(value))
      if (n) {
        return ''
      }
    },
    search() {
      this.$refs.formSearch.validate(valid => {
        if (valid) {
          let tokenId = this.searchObj.base_info.token + '-' + this.searchObj.base_info.chain
          let a = this.getContractCheckResult(tokenId)
          let b = this.getMainToken(tokenId)
          Promise.all([a, b])
            .then(res => {})
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.loadingSearch = false
            })
        }
      })
    },
    getMainToken(tokenId) {
      getMainToken(tokenId).then(res => {
        let a = JSON.parse(res.token.appendix)
        console.log('----res----', a)
        this.form.base_info.logoUrl = res?.token?.logo_url
          ? 'https://www.avestorage.cloud/' + res?.token?.logo_url
          : ''
        this.form.base_info.symbol = res?.token.symbol
        this.form.base_info.chain = res?.token.chain
        this.form.base_info.token = res?.token.token
        this.form.base_info.totol_supply = Number(res?.token.total)
        this.form.base_info.opening_at = res?.token.opening_at
        const aa = JSON.parse(res.token.appendix)
        this.form.base_info.website = aa?.website
        this.form.base_info.whitepaper = aa?.whitepaper
        this.form.base_info.twitter = aa?.twitter
        this.form.base_info.twitter = aa?.twitter
        this.form.base_info.btok = aa?.btok
        this.form.base_info.qq = aa?.qq
        this.form.base_info.telegram = aa?.telegram
        this.form.base_info.discord = aa?.discord
      })
    },
    // getTokenExtraDetail(tokenId) {
    //   getTokenExtraDetail(tokenId).then(res => {
    //     console.log('----res1----', res)
    //   })
    // },
    getContractCheckResult(tokenId) {
      // let id = '0xe9705f62deee16e4fbb8e4311fbbcacf9fabdb08-bsc'
      getContractCheckResult(tokenId).then(res => {
        let contract_info = res.token_contract.contract_data
        this.form.contract_info.buy_tax = contract_info?.buy_tax || ''
        this.form.contract_info.sell_tax = contract_info?.sell_tax || ''
        this.form.contract_info.tm_buy_tax_for_fund = contract_info?.tm_buy_tax_for_fund || ''
        this.form.contract_info.m_sell_tax_for_fund = contract_info?.m_sell_tax_for_fund || ''
        this.form.contract_info.tm_buy_tax_for_burn = contract_info?.tm_buy_tax_for_burn || ''
        this.form.contract_info.tm_sell_tax_for_burn = contract_info?.tm_sell_tax_for_burn || ''
        this.form.contract_info.tm_buy_tax_for_lp = contract_info?.tm_buy_tax_for_lp || ''
        this.form.contract_info.tm_sell_tax_for_lp = contract_info?.tm_sell_tax_for_lp || ''
        this.form.contract_info.tm_buy_tax_for_team = contract_info?.tm_buy_tax_for_team || ''
        this.form.contract_info.tm_sell_tax_for_team = contract_info?.tm_sell_tax_for_team || ''
        this.form.contract_info.tm_buy_tax_for_holders = contract_info?.tm_buy_tax_for_holders || ''
        this.form.contract_info.tm_sell_tax_for_holders =
          contract_info?.tm_sell_tax_for_holders || ''
        this.form.contract_info.tm_buy_tax_for_lp_holders =
          contract_info?.tm_buy_tax_for_lp_holders || ''
        this.form.contract_info.tm_sell_tax_for_lp_holders =
          contract_info?.tm_sell_tax_for_lp_holders || ''
        this.form.contract_info.tm_buy_tax_for_other = contract_info?.tm_buy_tax_for_other || ''
        this.form.contract_info.tm_sell_tax_for_other = contract_info?.tm_sell_tax_for_other || ''
        this.form.contract_info.tm_max_hold_amount_per_wallet =
          contract_info?.tm_max_hold_amount_per_wallet || ''
        this.form.contract_info.mechanism_intro = contract_info?.mechanism_intro || ''
      })
    },

    addWalletTag() {
      this.loadingAdd = true
      setTimeout(() => {
        this.form.wallet_tag.push({
          address: '',
          tag: '',
          remark: ''
        })
        this.loadingAdd = false
      }, 500)
    },
    removeWalletTag(index) {
      this.loadingRemove[index] = true
      setTimeout(() => {
        this.form.wallet_tag.splice(index, 1)
        this.loadingRemove[index] = false
      }, 500)
    },
    getChainList() {
      this.dataLoading = true
      getChainList()
        .then(res => {
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
          this.form.base_info = res.base_info
          this.form.contract_info = res.contract_info
          this.form.wallet_tag = res.wallet_tag
          this.is_confirmed = res?.is_confirmed
          this.form.base_info.logoUrl = res?.base_info?.logoUrl
            ? 'https://www.avestorage.cloud/' + res?.base_info?.logoUrl
            : ''
          if (!this.is_confirmed) {
            this.$notify({
              title: this.$t('tip'),
              message: this.$t('pending'),
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
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          let contract_info = {}
          for (var key in this.form.contract_info) {
            contract_info[key] = this.form.contract_info[key]
              ? String(this.form.contract_info[key])
              : ''
          }
          let form = Object.assign({}, this.form, { contract_info: contract_info })
          let data1 = JSON.stringify(form)
          applyToken(data1)
            .then(res => {
              console.log('applyToken', res.InsertedID)
              if (res.InsertedID) {
                this.submitLogo(res.InsertedID)
                this.$message.success(this.$t('success'))
                this.dialogVisible = false
                res.InsertedID && this.shareLink(res.InsertedID)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error(err)
            })
            .finally(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    shareLink(id) {
      this.$messageBox
        .alert(`${location.origin}/?id=${id}`, this.$t('tip'), {
          confirmButtonText: this.$t('jump')
        })
        .then(() => {
          this.reset()
          this.$router.push({ name: 'Home', query: { id: id } })
        })
        .catch(() => {})
    },
    beforeUpload(e) {
      const file = e.target.files[0]
      const fileUrl = window.URL.createObjectURL(file)
      this.option.img = fileUrl
      this.uploadDialogVisible = true
    },
    removeFile() {
      this.profile_picture = null
      this.fileUrl = ''
      if (this.$refs.fileLogo) {
        this.$refs.fileLogo.value = ''
      }
      this.option.img = ''
    },
    getCropBlob() {
      this.$refs.cropper.getCropBlob(data => {
        const file = new File([data], this.form.base_info.token)
        this.profile_picture = file
        this.fileUrl = window.URL.createObjectURL(file)
        localStorage.fileUrl = this.fileUrl
        console.log(' this.fileUrl', this.fileUrl)
        this.uploadDialogVisible = false
      })
    },
    submitLogo(id) {
      if (this.profile_picture) {
        const formData = new FormData()
        const form = {
          profile_picture: this.profile_picture,
          id: id
        }
        Object.keys(form).forEach(key => {
          const value = form[key] ?? ''
          if (key === 'profile_picture' && value !== '') {
            formData.append('profile_picture', value, `${this.form.base_info.token}.png`)
          } else if (key !== 'symbol' && value !== '') {
            formData.append(key, value)
          }
        })
        submitLogo(formData).catch(err => {
          console.log(err)
        })
      }
    },
    reset() {
      this.$refs.form.resetFields()
      localStorage.removeItem('aveApplication')
      localStorage.removeItem('fileUrl')
    },
    saveDraft() {
      this.loadingDraft = true
      console.log('Object.keys(this.form).', Object.values(this.form.contract_info))
      setTimeout(() => {
        if (
          this.form.wallet_tag.length > 0 ||
          Object.values(this.form.contract_info).length > 0 ||
          Object.values(this.form.base_info).length > 0
        ) {
          localStorage.aveApplication = JSON.stringify(this.form)
          this.$message.success(this.$t('saveDraft'))
        } else {
          this.$message.error('???????????????')
        }
        this.loadingDraft = false
      }, 1000)
    },
    formatIcon(tokenInfo) {
      if (tokenInfo && typeof tokenInfo === 'string') {
        let [address, chain] = tokenInfo.split('-')
        if (address && chain) {
          address = address?.replace?.(/:/g, '') || address
          return `https://www.avestorage.cloud/token_icon/${chain}/${address}.png`
        }
        return ''
      }
      let address = tokenInfo?.address || tokenInfo?.token || ''
      address = address?.replace?.(/:/g, '') || address
      return (
        tokenInfo?.logo_url ||
        tokenInfo?.appendix?.logo_url ||
        `https://www.avestorage.cloud/token_icon/${
          tokenInfo?.chain || tokenInfo?.network || ''
        }/${address}.png`
      )
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
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
}
@media (min-width: 1024px) {
  .box-card {
     padding: 30px 60px;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px auto 10px;
  display: block;
  margin-bottom: 20px;
  text-align: left;
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
  padding: 14px 30px;
}
.buy-in {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
}
:deep().el-input {
  max-width: 400px;
}
:deep().el-textarea__inner {
  max-width: 400px;
}
:deep().el-input__inner {
  // padding: 18px 10px;
}
:deep().el-collapse {
  margin-bottom: 20px;
  .el-collapse-item__header {
    padding-top: 20px;
  }
  .content {
    padding: 20px;
  }
}
:deep().el-form-item__label {
  color: #000;
}
.flex-1 {
  flex: 1;
}
</style>