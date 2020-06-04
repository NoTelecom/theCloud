<template>
<div :style="background" class="it" >

    <Modal title="View Image" v-model="visible">
      <img :src="img" v-if="visible" style="width: 100%">
    </Modal>
    <Modal title="Music" v-model="listen">
      <audio :src="radio" autoplay="" controls="" v-if="listen" style="width:100%"> </audio>
    </Modal>
    <Row style="height: 60px;line-height: 60px;font-size: 13px" justify="center" class="code-row-bg">
      <i-col span="2"><Checkbox v-model="check" @on-change="change" @blur="change"></Checkbox></i-col>
        <i-col span="2"><img @click="display" :src="img" width="50px" height="50px" style="vertical-align: middle;"></i-col>
        <i-col span="4">{{item.filename}}</i-col>
        <!-- <Time :time="item.date"/> -->
        <i-col span="7">{{item.date}}</i-col>
        <i-col span="7">{{size}}</i-col>
    </Row>
    <!-- <audio :src="radio" autoplay="" controls="" v-if="listen"> </audio> -->

</div>
</template>

<script>

    import {baseUrl} from '../assets/js/util'
    export default {
        name: "item",
        props:["item"],
        data(){
          return{
            visible:false,
            listen: false,
            // to do
            check:'',
            background:{
              'background-color':'white',
              "color":"black",
            }
          }
        },
        watch: {
          item: function() {
            // display()
          }
        },
        created () {
          // display()
        },
        computed:{
          img(){
            if (this.$route.path.slice(1,this.$route.path.length) !=='trash') {

              // if(this.$route.path.slice(1,this.$route.path.length)=='trash'){
              //   return baseUrl + this.$store.state.user.username+'/trash/'+this.item.file
              // }else{
                // return baseUrl + this.$store.state.user.username+'/'+this.item.type+'/'+this.item.file
                // return this.item.path
                // return 'data:image/jpg;base64,' + this.item.file
              // this.visible = true;
                
                return baseUrl  + this.item.path
                // return this.$store.state.user
              // }
            } 
            // else if (this.item.type === 'trash') {
            //   return baseUrl  + this.item.path
            // }
            else {
              // this.visible = false;
              return '../../static/img/' + this.item.type + '.png'
            }
            

          },
          radio () {
            if(this.$route.path.slice(1,this.$route.path.length)=='trash'){
              return baseUrl + this.$store.state.user.username+'/trash/'+this.item.file
            }else{
              // return baseUrl + this.$store.state.user.username+'/'+this.item.type+'/'+this.item.file
              return baseUrl + this.item.path
            }
          },
          // doc () {
          //   if(this.$route.path.slice(1,this.$route.path.length)=='trash'){
          //     return baseUrl + this.$store.state.user.username+'/trash/'+this.item.file
          //   }else{
          //     return baseUrl + this.$store.state.user.username+'/'+this.item.type+'/'+this.item.file
          //   }
          // },
          size(){
            if(this.item.size/1024<1){
              return '小于1KB'
            }else if(this.item.size/1024<1024){
              return Math.floor(this.item.size/1024)+'KB'
            }else if(this.item.size/1024>1024&&this.item.size/1024/1024<1024){
              return Math.floor(this.item.size/1024/1024)+'M'
            }else {
              return Math.floor(this.item.size/1024/1024/1024)+'G'
            }
          }
        },
        methods:{
          change(){
            // debugger;
            if(this.check){
              this.background["background-color"]="#2d8cf0"
              this.background["color"]="white"
              this.$emit('message',true,{
                filename:this.item.filename,
                type:this.item.type,
                file_id: this.item.file_id
              })
            }else{
              this.background["background-color"]="white"
              this.background["color"]="black"
              this.$emit('message',false,{
                filename:this.item.filename,
                type:this.item.type,
                file_id: this.item.file_id
              })
            }
          },
          display(){
            // console.log(this.item.type)
            if (this.$route.path.slice(1) !=='trash') {
              if(this.item.type=='img'){
                this.visible=true
              } else if (this.item.type === 'radio') {
                this.listen = true
              } 
            }
            
            // else if (this.item.type === 'doc') {
            //   if(this.$route.path.slice(1)=='trash'){

            //     var location = 'trash'
            //   } else {
            //     var location = this.item.type
            //   }
            //   var detail = {user: this.$store.state.user.username,
            //           location: location,
            //           file: this.item.file
            //   }
            //   this.$router.push({path: '/docdetail/' + detail.user + '/' + detail.location + '/' + detail.file})              
            // //   let href = this.$router.resolve({
            // //   name: 'docdetail',
            // //   params:{user: this.$store.state.user.username,
            // //           location: location,
            // //           file: this.item.file
            // //   }
            // // })
            // //   window.open(href, '_blank')
            // }
          }
        }
    }
</script>

<style scoped>

  .it{
    cursor: pointer;
    border-bottom:1px silver solid;
    margin:15px;
    width:90%
  }
 
</style>
