<template>
    <div class="flex align-items-center justify-content-space-around top-search">
        <div class="search-tab " v-for="(item,index) in data" :key="index" :class="selectIndex == index ? 'active' : '' " @click="selectChange(index)">{{item}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectIndex:0,
        }
    },
    props:{
        data:{
            type:Array,
            default:()=>{[]}
        }
    },
    methods: {
        selectChange(index){
            this.selectIndex = index
            this.$emit('change',index)
        }
    }
}
</script>

<style scoped>
    .top-search{
        margin-bottom: 24px;
    }
    .search-tab{
        color: #fff;
        font-size: 16px;
        display: inline-block;
        position: relative;
    }
    .search-tab.active{
        font-weight: bold;
    }
    .search-tab.active::after{
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 4px;
        background: #fff;
        border-radius: 2px;
    }
</style>