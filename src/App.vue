<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {baseUrl} from './assets/js/util'
  import axios from 'axios';
  axios.defaults.withCredentials=true;

export default {
  name: 'App',
  created(){
    let that= this
    axios.get(baseUrl + '/users/isLog').then((res)=>{
      if(res.data.res ==='ok'){
        that.$store.commit("login",{username:res.data.username});
        that.$store.commit('changeSize',res.data.size);
      }else{
        this.$router.replace('/')
      }
    }).catch((err)=>{
      console.log(err)
    })

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
