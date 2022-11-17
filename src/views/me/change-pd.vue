<template>
    <van-form @submit="onSubmit">
        <van-field
            v-model="oldPwd"
            type="password"
            name="原密码"
            label="原密码"
            placeholder="原密码"
            :rules="[{ required: true, message: '请填写原密码' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="新密码"
            :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
            v-model="password1"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="请再次填写新密码"
            :rules="pwdRules"
        />
        <div style="margin: 16px;">
            <van-button round block color="linear-gradient(to right, #1976d2, #1976d2)" type="info" native-type="submit">提交</van-button>
        </div>
    </van-form>
</template>

<script>
import { modifiedPassword } from '@/api/wechat'
export default {
  data() {
    this.pwdRules = [
        { required: true, message: '请输入密码' },
        { validator: this.pwdValidator, message: '两次填写的新密码不一致' },
    ]
    return {
      oldPwd: '',
      password: '',
      password1:''
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      this.$loading.show()
      modifiedPassword({oldPassword:this.oldPwd,password:this.password}).then(res=>{
        this.$loading.hide()
        this.$Toast.success('修改成功');
        this.oldPwd = this.password = this.password1 = ''
      }).catch(e=>{
        this.$loading.hide()
      })
    },
    pwdValidator(val) {
      if(val != this.password){
        return false
      }
    },
  },
}
</script>

<style>

</style>