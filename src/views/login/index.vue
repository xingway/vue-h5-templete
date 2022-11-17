<template>
  <div>
    <div class="mainBox">
      <div class="topBox">
        欢迎登录
      </div>
      <div class="midden">
        <div class="container">
          <div class="container-midden">
            <div class="textInput-box">
              <div class="bg-w">
                <van-form validate-first @submit="onSubmit" @failed="onFailed">
                    <van-field :clearable='true' v-model.trim="mobile" placeholder="手机号" name="mobile" label="手机号" :rules="phoneRules" />
                    <van-field :clearable='true' type="password" v-model.trim="password" placeholder="密码" name="password" label="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                    <div style="margin: 16px;">
                        <van-button size="normal" color="linear-gradient(to right, #1976d2, #1976d2)" round block type="info" native-type="submit">
                        登录
                        </van-button>
                    </div>
                </van-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import {  setToken , } from '@/util/util'
export default {
  name:'login',
  data() {
    this.phoneRules = [
        { required: true, message: '请输入手机号' },
        { validator: this.phoneValidator, message: '手机号格式错误' },
    ];
    return {
        name:'',
        cardNo:'',
        mobile:'',
        password:'',
        policyNo:'',
        confirmShow:false,
        eductionShow:false,
        loadingShow:false,
        checked:false,
        btnDisabled:false,
        show:false,
        info:{},
        
    };
  },
  mounted () {

  },
  watch: {

  },
  components: {

  },
  methods: {
    onSubmit(values) {
      this.info = Object.assign({},values)
      this.info.username = values.mobile
      this.$loading.show('登录中')
      login(this.info).then(res=>{
        console.log("onSubmit -> res", res)
        
        setToken(res)
        this.$loading.hide()
        this.$router.push({name:'me_index'})
    
        
      },res=>{
        console.log(res,'error')
        this.$loading.hide()
        if(res.msg){
          this.$Toast.fail(res.msg);
        }else{
          this.$Toast.fail('请求失败，请稍候重试!');
        }
        this.btnDisabled = false
      }).catch(err=>{
        console.log(err,'err')
        this.$loading.hide()
        this.$Toast.fail('请求失败，请稍候重试!');
        
        this.btnDisabled = false
      })
        
    },
    onFailed(errorInfo) {
        console.log('failed', errorInfo);
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    phoneValidator(val) {
        return /1\d{10}/.test(val);
    },
  }
};
</script>

<style scoped>
.mainBox{
  background: #fff;
  min-height: calc(100vh);
}
.topBox{
  height: 140px;
  padding-top: 85px;
  padding-left: 40px;
  background:linear-gradient(180deg,#1976d2 0%,#1976d2 100%);
  font-size: 27px;
  color: #fff;
}
.midden{
  position: relative;
  z-index: 99;
  background: #fff;
  background-size: cover;
  padding: 0;
  margin: 0 20px;
  margin-top: -60px;
  border-radius: 6px;
  border: 1px solid #e4f1fa;
  box-shadow: 3px 3px 3px rgba(0,186,255,.1);
}
.container{
  border-radius: 6px;
  background: #fff;
  padding-top: 50px;
  padding-bottom: 20px;
}
.container-midden{
  margin: 0;
  overflow: hidden;
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
</style>