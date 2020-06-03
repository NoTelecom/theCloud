<template>
    <div>
      <layout>
        <header style="background-color: white;font-size: 15px;font-weight: bold;"><span>最近</span></header>
        <hr style="height:1px;border:none;border-top:1px solid rgb(154,154,154); margin:0 20px 0 20px;"/>
        <content style="background-color: white">
          <!-- <div style="display: flex;flex-direction: column;align-items: left;width: 100%;margin: 15px auto" >名称</div> -->
          <Row style="font-size: 13px" v-if="$store.state.checkList==0" :style='{"margin": "15px 0 0 0"}'>
      <i-col span="10">名称</i-col>
      <i-col span="2">上次修改时间</i-col>
      <i-col span="9">大小</i-col>
    </Row>
          <div
            :key="index"
            style="display: flex;flex-direction: column;align-items: left;width: 100%;margin: 15px auto"
            v-for="(item,index) in nearList">
             <!-- <Time :time="item.date" style="font-size: 20px;font-weight: bold;"/> -->
            <item :item="item"></item>
          </div>
        </content>
      </layout>
    </div>
</template>

<script>
    import item from '../components/item';
    import {baseUrl} from '../assets/js/util'
    import axios from 'axios';
    axios.defaults.withCredentials=true;

    export default {
        name: "near",
        components:{item},
        created () {
          // console.log(111)
          // axios.get(baseUrl + '/file/getfile', {
          //       params: {
          //         type: 'near'
          //       }
          //     }).then((res) => {
          //       if (res.data.length == 0) {

          //       } else {
          //         that.$nextTick(function () {
          //           that.$store.commit('updateSource', {
          //             type: name,
          //             files: res.data
          //           })
          //         })
          //       }
          //     })
        },
        mounted(){
          
          // console.warn(this.$store)
          // let sessionStore = sessionStorage.getItem('store')
          //   if(sessionStore) {
          //     this.fromSources = sessionStore
          //   }else{
          //     this.fromSources = this.$store.state.store
          //   }
          let that = this;
            axios.get(baseUrl + '/file/getfilebytime').then((res)=>{
              console.log(res.data)
              let { code, data } = res.data;
                code = Number(code);
                if (code === 200) {
                  that.$nextTick(function () {
                    that.$store.commit('updateSource', {
                      type: 'near',
                      files: data
                    })
                  })
                }
                // console.log(that.$store.state.source.near)
              that.nearList=that.$store.state.source.near;
              // debugger;
              // console.log(this.nearList)
            }).catch((err)=>{
              console.log(err)
            })
                   
        },
        data(){
          return{
            nearList:'',
             
          }
        }
    }
</script>

<style scoped>
header {
  margin: 10px auto 10px 20px;
  text-align: left
}
li {
  transition: box-shadow 200ms ease-out, opacity 200ms ease-out;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 12px rgba(78, 72, 72, 0.699);
  display: flex;
  }
  ul :not(:last-child) {
  margin-bottom: 7px;
}
.middle {margin: 0 auto}
.fade-move {transition: all 06s ease}
.fade-leave-active {position: absolute}
span {
  /* margin-left: 3.4%; */
}
</style>
