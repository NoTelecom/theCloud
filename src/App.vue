<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {baseUrl} from './assets/js/util'
  import axios from 'axios';
  axios.defaults.withCredentials=true;

  // http response 拦截器
  // 请求时将选中值弄成false并执行change（）
axios.interceptors.response.use(
  response => {
    let store = window.vm.$store;
    store.commit('check',{
      select:'reset',
      // nun:0
    })
    store.commit('changeListData', {
    select: 'reset'
    })
      // this.init(this.routeit,true)
      return response;
  },
);

export default {
  name: 'App',
  created(){
    if(!this.$store.state.isLog) {
            let that= this
            axios.get(baseUrl + '/users/isLog').then((res)=>{
              let {code, data} = res.data;
              let { username, size } = data
              code = Number(code);
              if(code === 200) {
                // that.$store.commit("login",{username:data.username})
                // that.$store.commit('changeSize',data.size)
                that.$store.dispatch("login", username)
                that.$store.commit('changeSize', size)
                that.$router.replace('/classify');
              } else {
                that.$router.replace('/');
              }
            }).catch((err)=>{
              console.log(err)
            })
          }    
  },
  mounted () {
    //  window.addEventListener("beforeunload",()=>{
    
    //    sessionStorage.setItem("store",JSON.stringify(this.$store.state.store))
    
    // })
     // let sessionStore = sessionStorage.getItem('store')
     //    if(sessionStore) {
     //      this.fromSources = sessionStore
     //    }else{
     //      this.fromSources = this.$store.state.store
     //    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  html,body{
    height: 100%;
  }
</style>
