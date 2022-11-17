<template>
    <div>
        <div class="common-header">
            <span v-if="!$route.meta.hideBack" class="common-header-icon icon-left" @click="goBack"></span>
            <span v-else class="common-header-icon"></span>
            <h1>{{$route.meta.title}}</h1>
            <i class="common-header-icon"></i>
        </div>
        <div class="common-main">
            <router-view/>
        </div>
        <van-tabbar v-model="active" @change="tabbarChange">
            <van-tabbar-item name="index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="center" icon="contact">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name:'Main',
    data () {
        return {
            title:'',
            active:'index',
        }
    },
    mounted() {
        this.active = this.action
    },
    watch: {
        'action' (newVal){
            console.log("🚀 ~ file: index.vue ~ line 33 ~ newVal", newVal)
            this.active = newVal
        }
    },
    computed: {
        action(){
            return this.$store.state.active
        } 
    },
    methods: {
        tabbarChange(active){
            if(active == 'index'){
                this.$router.push({name:'me_index'})
            }
            if(active == 'center'){
                this.$router.push({name:'me_index'})
            }
        },
        goBack(){
            this.$router.go(-1)

        }
    }
}
</script>

<style scoped>
.common-header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 48px;
    line-height: 48px;
    color: #fff;
    background: #1976d2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 999;
}
.common-header h1{
    font-size: 18px;
    font-weight: normal;
}
.common-header-icon{
    display: inline-block;
    width: 40px;
    height: 40px;
}
.icon-left{
    
}
.icon-left::after{
    font-size: inherit;
    line-height: 1;
    position: absolute;
    top: 45%;
    display: inline-block;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    text-decoration: none;
    color: #BABFC7;
    -webkit-font-smoothing: antialiased;
    left: 13px;
    width: 8px;
    height: 8px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(45deg);
    content: '';
}
.common-main{
    margin-top: 48px;
}
</style>
