<template>
    <div class="wrap">
        <div class="qr-box">
            <div class="qr-box-header"></div>
            <div class="qr-box-text">
                {{name}}&nbsp;&nbsp;&nbsp;&nbsp;{{mobile}}
            </div>
            <div class="qr">
                <img :src="src" alt="" class="img-block">
            </div>
            <p class="weChat-txt">微信扫一扫</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            token:null,
            src:'',
            name:'',
            mobile:''
        }
    },
    mounted () {
        let _token = this.$route.params.id
        this.token = _token
        this.getQR()
    },
    methods: {
        getQR(){
            this.$axios.get('/getPopularizeQrUrl',{
                params:{
                    token:this.token,
                }
            }).then(res=>{
                if(res.data.code == 0){
                    this.src = res.data.data.qrUrl
                    this.name = res.data.data.name || ''
                    this.mobile = res.data.data.mobile || ''
                }
            })
        }
    }
}
</script>

<style scoped>
.wrap{
    height: 100vh;
    background: #1976d2;
    overflow: hidden;
}
.qr-box{
    position: relative;
    overflow: hidden;
    width: 280px;
    margin:64px auto 0 auto;
    background: #fff;
    border-radius: 6px;
    border-top: 8px solid #FFCC25;
}
.qr-box-header{
    margin: 0 auto;
    width:70px;
    height:50px;
    border-top:20px solid #FFCC25;
    border-right:20px solid transparent;
    border-bottom:0 solid transparent;
    border-left:20px solid transparent;
}
.qr-box-text{
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    font-size: 16px;
}
.qr{
    width: 200px;
    height: 200px;
    margin: 0 auto 20px auto;
    background: #D8D8D8;
}
.weChat-txt{
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #373F50;
}
.img-block{
    display: block;
    width: 100%;
    height: 100%;
}
</style>
