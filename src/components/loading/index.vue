<template>
    <van-popup v-model="loadingShow" :close-on-click-overlay="false">
        <div class="loading-content">
            <van-loading size="24px" vertical>{{loadingText}}...</van-loading>
        </div>
    </van-popup>
</template>

<script>
export default {
    name:'Loading',
    data() {
        return {
            
        }
    },
    props: {
        loadingShow:{
            type:Boolean,
            default:false
        },
        loadingText:{
            type:String,
            default:'加载中'
        }
    },
    watch: {
        loadingShow:function(newVal,oldVal){
            if(!newVal){
                this.$el.remove();
            }
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>
.loading-content{
    padding: 50px;
}
</style>