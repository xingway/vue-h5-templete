<template>
  <div>
    <div class="mainBox">
      <div class="midden">
        <div class="container">
          <div class="container-midden">
            <div class="textInput-box">
              <div class="bg-w">
                <van-form validate-first @submit="onSubmit" @failed="onFailed">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="form.typeName"
                      label="公司类型"
                      placeholder="点击选择公司类型"
                      @click="showPicker = true"
                      :rules="[{ required: true, message: '请选择公司类型' }]"
                    />
                    <van-field :clearable='true' v-model.trim="form.name" placeholder="公司名" name="name" label="公司名" :rules="[{ required: true, message: '请填写公司名' }]"   />
                    <van-field :clearable='true' v-model.trim="form.leaderName" placeholder="负责人" name="name" label="负责人" :rules="[{ required: true, message: '请填写负责人' }]"   />
                    <van-field :clearable='true' v-model.trim="form.leaderMobile" placeholder="负责人手机号" name="leaderMobile" label="手机号" :rules="phoneRules" />
                    <van-field
                      v-model="form.area"
                      is-link
                      readonly
                      label="地区"
                      placeholder="请选择所在地区"
                      @click="show = true"
                    />
                    <van-field :clearable='true' v-model.trim="form.address" placeholder="公司地址" name="name" label="公司地址"   />
                    <van-field :clearable='true' v-model.trim="form.introduce" type="textarea" placeholder="公司简介" name="introduce" label="公司简介"   />
                    <div style="margin: 16px;">
                        <van-button color="#376EF8" round block type="info" native-type="submit">
                        提交
                        </van-button>
                    </div>
                </van-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        :options="options"
        @close="show = false"
        @finish="onFinish"
        :field-names="areaObject"
      />
    </van-popup>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-popup v-model="loadingShow">
      <div class="pd10">
        <van-loading size="24px" vertical>提交中...</van-loading>
      </div>
    </van-popup>
    <van-dialog
      v-model="confirmShow"
      title="确认信息"
      show-cancel-button
      confirm-button-text="确认"
      @confirm="dialogConfirm"
    >
    <div class="confirm-dialog">
      <p>
        <span>公司类型</span>{{form.typeName}}
      </p>    
      <p>
        <span>公司名称</span>{{form.name}}
      </p>    
      <p>
        <span>负责人</span>{{form.leaderName}}
      </p> 
      <p>
        <span>手机号</span>{{form.leaderMobile}}
      </p> 
      <p>
        <span>地区</span>{{form.area}}
      </p>       
      <p>
        <span>公司地址</span>{{form.address}}
      </p>       
      <p>
        <span>公司简介</span>{{form.introduce}}
      </p>       
    </div>  
    </van-dialog>
  </div>
</template>

<script>
import { setSessionStorage } from '@/util/util'
import city from '../../util/city'
export default {
  name:'register_info',
  data() {
    this.phoneRules = [
        { required: true, message: '请输入手机号' },
        { validator: this.phoneValidator, message: '手机号格式错误' },
    ];
    this.idCardRules = [
        { required: true, message: '请输入身份证号' },
        { validator: this.idCardValidator, message: '身份证号格式错误' },
    ];
    return {
        areaObject:{
          text:"label"
        },
        show:false,
        cascaderValue:'',
        options:city,
        columns: [
          {
            key:'1',
            text:'门店'
          },
          {
            key:'2',
            text:'服务商'
          },
          {
            key:'3',
            text:'城市合伙人'
          },
        ],
        showPicker:false,
        form:{
          typeName:'',
          type:'',
          name:'',
          leaderMobile:'',
        },
        confirmShow:false,
        eductionShow:false,
        loadingShow:false,
        checked:false,
        btnDisabled:false,
        show:false,
        info:{},
        parent_id:null,
        
    };
  },
  mounted () {
    this.parent_id = this.$route.params.id || 0
  },
  watch: {

  },
  components: {

  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false;
      this.form.area = selectedOptions.map((option) => option.label).join('/');
      this.form.province = selectedOptions[0].label || ''
      this.form.city = selectedOptions[1].label || ''
      this.form.county = selectedOptions[2].label || ''
      this.form.provinceCode = selectedOptions[0].value || ''
      this.form.cityCode = selectedOptions[1].value || ''
      this.form.countyCode = selectedOptions[2].value || ''
    },
    onConfirm(value) {
      this.form.typeName = value.text
      this.form.type = value.key
      this.showPicker = false;
    },
    onSubmit(values) {
        this.confirmShow = true
        console.log('submit', values);
    },
    dialogConfirm(){
      this.confirmShow = false
      this.btnDisabled = true
      this.loadingShow = true
      this.form.parent_id = this.parent_id == 0 ? '' : this.parent_id
      apply(this.form).then(res=>{
        console.log(res)
        this.$router.push({name:'register_success'})
      },res=>{
        console.log(res,'error')
        this.loadingShow = false
        if(res.msg){
          this.$Toast.fail(res.msg);
        }else{
          this.$Toast.fail('请求失败，请稍候重试!');
        }
        this.btnDisabled = false
      }).catch(err=>{
        console.log(err,'err')
        this.loadingShow = false
        this.$Toast.fail('请求失败，请稍候重试!');
        this.btnDisabled = false
      })
    },
    onFailed(errorInfo) {
        console.log('failed', errorInfo);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    phoneValidator(val) {
      console.log(/^1[0-9]{10}$/.test(val),'/^1[0-9]{10}$/')
        return /^1[0-9]{10}$/.test(val);
    },
    // 校验函数返回 Promise 来实现异步校验
    idCardValidator(val) {
        return /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(val);
    },
  }
};
</script>

<style scoped>
.link{
 margin-top: 30px;
 text-align: center;
 color: #2575FC; 
}
.mainBox{
  background:#2869FF;
  background-size: 100vw 100vh;
  padding-top: 80px;
  min-height: calc(100vh - 80px);
}
.midden{
  /* margin-top: -1px; */
  /* height: 303px; */
  background: #fff;
  background-size: cover;
  padding: 0;
  margin: 0 43px;
  border-radius: 6px;
}
.container{
  border-radius: 6px;
  background: #fff;
  padding-top: 18px;
  padding-bottom: 21px;
}
.container-midden{
  margin: 0;
  overflow: hidden;
}

.pd10{
  padding: 10px;
}
.bg-w{
  background: #fff;
}

.textInput-box {
  padding-left: 0;
  padding-right: 0;
}
.textInput-box h4 {
  padding: 0 10px;
}
.confirm-dialog{
  padding:22px;
  font-size: 14px;
  color: #333333;
}
.confirm-dialog p{
  margin-bottom: 16px;
}
.confirm-dialog p span{
  display: inline-block;
  width: 64px;
  text-align: right;
  margin-right: 15.36px;
  font-size: 14px;
  color: #999999;
}
</style>