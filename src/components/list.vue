<template>
  <div class="all">
    <Row style="font-size: 13px" v-if="$store.state.checkList==0">
      <i-col span="10">名称</i-col>
      <i-col span="2">上次修改时间</i-col>
      <i-col span="9">大小</i-col>
    </Row>

    <Row v-else>
      <Col span="5">已选中{{$store.state.checkList}}</Col>
    </Row>

    <p v-show="false">{{$store.state.source}}</p>

    <item
      :item="item"
      :key="index"
      @message="check"
      v-for="(item,index) in ListData"></item>
    <div v-if="ListData.length==0">
      <img src="../../static/img/no.png" style="width:10%;margin-top: 200px">
      <p>没得资源哦</p>
    </div>
    <div v-else>
      <p>共{{ListData.length}}项</p>
    </div>
  </div>


</template>

<script>
    import item from './item'
    export default {
        name: "list",
        components:{item},
        updated(){
          // console.log('this.route: ' + this.routeit)
          this.init(this.routeit,false)
        },
        data(){
          return{
            ListData:[
              // {filename: '杨千嬅', date: '2017-05-20', size: '20', type: 'img'},
              // {filename: '杨千嬅', date: '2017-05-21', size: '20', type: 'img'},
              // {filename: '杨千嬅', date: '2017-05-22', size: '20', type: 'img'},
              // {filename: '杨千嬅', date: '2017-05-22', size: '20', type: 'img'}
            ]
          }
        },
        computed:{
          routeit(){
            return this.$route.path
          },
          // changeNo() {
          //   return this.$store.state.checkList
          // }
        },
        watch:{
          routeit(newQuestion,oldQuestion){
            this.init(this.routeit,true)
          },
          // changeNo(newNo, oldNo) {
          //   this.init(this.routeit,true)

          // }

        },
        methods:{
          // to do
          check(bool,data){
          // if (this.$store.state.checkList)

            //进行选择，选择或者取消
            if(bool){
              for(var i in data) {
                console.log('check: ' + i, data[i])
              }
              this.$store.commit('check',{
                type:'add',
                // nun:1
              })
              this.$store.commit('changeListData',{
                type:'push',
                data:data
              })
            }else{
              //将选择的数量进行更新
              this.$store.commit('check',{
                type:'sub',
                // nun:-1
              })
              this.$store.commit('changeListData',{
                type:'pop',
                data:data
              })
            }
          },
          init(type,bool){
              this.ListData=this.$store.state.source[type.slice(1)]
              
              // console.log('route'+type.slice(1))
             // console.log(this.$store.state.source[type.slice(1)])
              // for (var i in this.ListData) {
              //   console.log('init: ' + i, this.ListData[i])
              // }
              //重置选择个数
              if(bool){
                this.$store.commit('check',{
                  type:'reset',
                  // nun:0
                })
                this.$store.commit('changeListData', {
                type: 'reset'
            })
              }

          }
        }
    }
</script>

<style scoped>
.all{
  text-align: center;
  background: transparent !important;
}
</style>
