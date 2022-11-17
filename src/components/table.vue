<template>
  <div class="vant-table">
    <table cellspacing="0" :style="bgColor" style="width:100%" class="table">
      <tr>
        <th class="th" v-for="(item, index) in column" :key="index">{{ item.label }}</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index" class="list-tr">
        <td v-for="(context, i) in column" :key="i">
          <div v-if="context.slot">
            <slot :name="context.slot" :data="item"></slot>
          </div>
          <div v-else>{{ item[context.key] }}</div>
          </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
    name:'myTable',
    props:{
        bgColor: Object,
        tableData:Array,
        column:Array
    },
  created() {}
};
</script>

<style scoped>
.vant-table .table{
    border-radius: .185185rem;
    color: #fff;
}
.vant-table .table .th{
    height: 30px;
    line-height: 30px;
    background-color: #393943;
    text-align: center;
}
.vant-table .table .list-tr {
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: #132c33;
}
.vant-table .table .list-tr:nth-child(2n) {
    background-color: #33333b;
}
</style>