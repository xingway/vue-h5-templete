<template>
  <div>
    <div class="mainBox">
      <div class="midden">
        <div class="container bg-w">
          <p>申请成功！</p>
          <p></p>
          <br/>
          <p class="link" @click="toLogin">点击登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  setToken , delCookies } from '@/util/util'
export default {

  data() {
    
    return {
        
    };
  },
  mounted () {
    
  },
  watch: {

  },
  activated() {


 },
  methods: {
    toLogin(){
      setToken('')
      delCookies('name')
      delCookies('id')
      delCookies('mobile')
      this.$router.push({name:'login'})
    }
    
  }
};
</script>

<style scoped>
.mainBox{
  background-size: 100vw 100vh;
  padding-top: 130px;
  min-height: calc(100vh - 130px);
}
.midden{
  background: #fff;
  background-size: cover;
  padding: 0;
  margin: 0 43px;
  border-radius: 6px;
}
.container{
  border-radius: 6px;
  background: #fff;
  width: 273px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
    flex-direction: column;
}
.container img{
    display: inline-block;
    width: 80%;
    height: 80%;
    margin-bottom: 5px;
}
.container  p{
    font-size: 16px;
    color: #333;
    text-align: center;
}
.bg-w{
  background: #fff;
}
.container p.link{
  color: #2575FC;
}
</style>