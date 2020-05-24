<template>
  <Layout style="background-color: white;height: 100%" class="all">

    <Sider style="background-color: white;">
      <layout style="height: 100%">
            <header>
              <div class="logo">
                <Icon type="md-cloud-download" />
                <span style="color: black">CLOUD</span>
              </div>

              <Input v-model="input"
                     icon="ios-search"
                     placeholder="搜索全部"
                     style="width: 80%;margin-bottom: 10px"
              />
            </header>

            <Content>
              <Menu  active-name="1"
                     @on-select="changeOne"
                     style="width: 100%;background-color: rgb(245,247,249)">
                  <MenuItem name="near" to="/near">
                    <Icon type="ios-clock" />
                    最近
                  </MenuItem>
                <hr style="margin: 10px auto;width: 80%">
                  <MenuItem name="all" to="/all">
                    <Icon type="md-document" />
                    全部
                  </MenuItem>
                  <MenuItem name="doc" to="/doc">
                    <Icon type="logo-buffer" />
                    文档
                  </MenuItem>
                  <MenuItem name="img" to="/img">
                    <Icon type="md-image" />
                    图片
                  </MenuItem>
                  <MenuItem name="video" to="/video">
                    <Icon type="logo-youtube" />
                    视频
                  </MenuItem>
                  <MenuItem name="radio" to="/radio">
                    <Icon type="md-musical-notes" />
                    音乐
                  </MenuItem>
                <hr style="margin: 10px auto;width: 80%">
                  <MenuItem name="photo" to="/photo">
                    <Icon type="ios-bowtie" />
                    照片
                  </MenuItem>
                  <MenuItem name="no" to="/no">
                    <Icon type="md-create" />
                    笔记
                  </MenuItem>
                  <MenuItem name="trash" to="/trash">
                    <Icon type="ios-trash" />
                      回收站
                  </MenuItem>
                  <MenuItem name="coffer" to="/coffer">
                    <Icon type="navicon-round" />
                      保险箱
                  </MenuItem>
              </Menu>
              <Progress :percent="percent" status="active" style="padding-top: 50px" :stroke-width="5">
                <span>已用容量{{size}}/10G</span>
                <Icon type="checkmark-circled"></Icon>
              </Progress>
            </Content>
      </layout>
    </Sider>
    <Layout>
      <Header style="background-color: white;z-index:1000;">
          <Row type="flex" justify="space-between">
            <Col span="6" >
              <div style="color: #2d8cf0">
              <Dropdown style="margin-left: 20px">
                <Button type="primary" icon="ios-cloud-upload">
                  上传
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <!-- "http://192.168.0.118:8080/index/upfile" -->
                    <Upload multiple type="select"
                            :action= "action"
                            :format="['jpg','jpeg','png', 'gif', 'mp3', 'avi', 'flv', 'mov', 'mac', 'dat', 'doc', 'docx', 'bmp', 'pdf', 'pptx', 'ppt', 'xls', 'xlsx', 'rmvb', 'mp4', 'wma', 'wav']"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :on-progress="handleProgress"
                            :on-format-error="handleFormatError"
                            :show-upload-list=true
                            :with-credentials=true>
                      <Icon type="md-document"></Icon>文件
                    </Upload>
                  </DropdownItem>
                  <DropdownItem>
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/">
                      <Icon type="ios-folder" />文件夹
                    </Upload>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown style="margin-left: 20px">
                <Button  icon="md-add" >
                  新建
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <Dropdown-menu slot="list">
            <Dropdown-item><router-link   @click.native = "childemit()" to="/note/-1"><Icon type="edit"/>新建笔记</router-link></Dropdown-item>
            <Dropdown-item><Icon type="folder"/>新建文件夹</Dropdown-item>
        </Dropdown-menu>
              </Dropdown>
            </div>
            </Col>
            <Col span="6" v-if="$store.state.checkList!=0">
              <Button type="error" @click="delet">删除</Button>
              <Button type="warning" @click="goCoffer">加入保险箱</Button>
              <Button @click="leaveCoffer" v-if="$route.path=='/coffer'">从保险箱移出</Button>
              <Button type="primary" v-if="$route.path!='/trash'" @click="download">下载</Button>
              <Button type="primary"
                      @click="huifu"
                      v-else="$route.path!='/trash'">复原</Button>
            </Col>
            <Col span="6" >
              <div>
                <span class="name" @click="play">
                  {{$store.state.user.username}}
                  <Icon v-if=" myValue" type="md-arrow-dropup" />
                  <Icon v-else type="md-arrow-dropdown"/>
                </span>
                <Card v-show="myValue">

                  <Layout>
                    <Header style="background-color: rgb(247,248,249)">
                      <Row>
                        <Col span="12"><Avatar shape="square" icon="ios-person"  size="large" /></Col>
                        <Col span="12">
                            <span> {{$store.state.user.username}}</span>
                        </Col>
                      </Row>
                    </Header>
                    <Content>
                      <CellGroup >
                        <p style="font-size: 10px">未开通会员 <span style="color: indianred"> 开通</span></p>
                        <Cell title="下载客户端"  />
                        <Cell title="帮助与反馈"  />
                        <Cell title="安全与隐私"  />
                        <p style="cursor: pointer" @click="outlogin">退出登录</p>
                      </CellGroup>
                    </Content>
                  </Layout>
                </Card>
              </div>
            </Col>
          </Row>
      </Header>
      <Content style="background-color: white">
        <hr style="margin: 10px auto;width: 100%">
        <router-view ref="mychild"></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
    import {baseUrl} from '../assets/js/util'
    import axios from 'axios';
    axios.defaults.withCredentials=true;

    export default {
        name: "index",
        data(){
          return{
            input:'',
            myValue:false,
            checkData:[],
            action: 'http://192.168.0.104:8080/index/upfile'
          }
        },
        created(){
          if(this.$store.isLog === true){
            //
          } else {
            let that= this
            axios.get(baseUrl + '/users/isLog').then((res)=>{
            if(res.data.res=='ok'){
              that.$store.commit("login",{username:res.data.username})
              that.$store.commit('changeSize',res.data.size)
              // that.$router.replace('/near');
            } else {
              that.$router.replace('/');
            }
          }).catch((err)=>{
            console.log(err)
          })
          }      
        },

        computed:{
          checkList(){
            return this.$store.state.checkList;
          },
          size(){
            let size = this.$store.state.size;
            // console.log(size)
            if(size/1024<1){
              return '小于1KB'
            }else if(size/1024<1024){
              return Math.floor(size/1024)+'KB'
            }else if(size/1024>1024&&size/1024/1024<1024){
              return Math.floor(size/1024/1024)+'M'
            }else {
              return Math.floor(size/1024/1024/1024)+'G'
            }
          },
          percent(){
            let all = 10*1024*1024*1024;
            if(Math.floor(this.$store.state.size/all)*100<1){
              return 1;
            }else{
              return Math.floor(this.$store.state.size/all)*100
            }
          }
        },
        watch:{
          checkList(newQuestion,oldQuestion){

          }
        },
        methods:{
          // 下载到本地
          async download (){
            this.$store.state.ListData.forEach(function (item) {
              axios.get(baseUrl + '/index/fileDownload',{
                    params:{
                      filename:item.filename,
                      type:item.type
                    }
                  }).then((res)=>{
                    // console.log(res)
                    if(res.data=='ok'){
                      alert('下载成功！');
                    }else{
                      alert('下载失败，请刷新后重试！');
                    }
                  })
                })
          },
          async routeToCoffer () {
            let that = this
            axios.get(baseUrl + '/index/getFile', {
                      params: {
                        type: 'coffer'
                      }
                    }).then((res) => {
                      if (res.data.length == 0) {

                      } else {
                        that.$nextTick(function () {
                          that.$store.commit('updateSource', {
                            type: 'coffer',
                            files: res.data
                          })
                        })
                      }
                    })
          },
          // 真正执行进入保险箱操作
          addToOffer () {
            // console.log('addToOffer:'+this.ListData)
            this.$store.state.ListData.forEach(function (item) {

              axios.get(baseUrl + '/coffer/insertCoffer',{
                  params:{
                    filename:item.filename,
                      type:item.type
                  }
                }).then((res)=>{
                  // console.log(res)
                  if(res.data=='ok'){
                    alert('加入保险箱成功！')
                    // this.$Message.success('加入保险箱成功！');
                  }else{
                    alert('加入保险箱失败，请刷新后重试！')
                    // this.$Message.error('加入保险箱失败，请刷新后重试！');
                  }
                })
              })
          },
          // 添加进入保险箱前先输个密码
          goCoffer () {
            // 弹出需要密码的模态框
            this.$prompt('请输入保险箱密码', '与登陆密码一致', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputType: 'password'}).then(({ value }) => {
              let that = this
               axios({
                method: 'get',
                baseURL: baseUrl,
                url: 'users/checkPassword',
                timeout: 30000,
                params: {
                  password: value
                }
              }).then(response => {
                if (response.data=== 'ok') {
                  that.$message({
                    type: 'success',
                    message: '密码正确~'
                  })
                  // 真正执行进入保险箱操作

                  // console.log(that.$route.path)
                  if (that.$route.path != '/coffer') {
                    that.addToOffer()
                  // 如果通过路由渠道进入保险箱时
                  } else {
                    this.routeToCoffer()
                  }
                } else {
                  that.$message({
                    type: 'error',
                    message: '密码错误！'
                  })
                  that.$router.push('/all')
                }
              }).catch(error => {
                console.error(error)
              })
            }).catch(() => {
              that.$message({
                type: 'info',
                message: '取消输入'
              })
            })                   
          },
          // 召唤子组件的方法
          childemit () {
            // console.log(123)
              this.$refs['mychild'].addNote()
          },
          huifu(){
            this.$store.state.ListData.forEach(function (item) {
              axios.get(baseUrl + '/trash/huifu',{
                params:{
                  filename:item.filename,
                  type:item.type
                }
              }).then((res)=>{
                // console.log(res)
                if(res.data.res=='ok'){
                  that.$Message.success('恢复成功！');
                }else{
                  that.$Message.error('恢复失败，请刷新后重试！');
                }
              })
            })
          },
          // 移出保险箱
          leaveCoffer () {
            this.$store.state.ListData.forEach(function (item) {
              axios.get(baseUrl + '/coffer/restore',{
                params:{
                  filename:item.filename,
                  type:item.type
                }
              }).then((res)=>{
                // console.log(res)
                if(res.data=='ok'){
                  alert('移出保险箱成功！')
                  // that.$Message.success('移出保险箱成功！');
                }else{
                  // that.$Message.error('移出保险箱失败，请刷新后重试！');
                  alert('移出保险箱失败，请刷新后重试！')
                }
              })
            })
          },
          delet(){
            if(this.$route.path=='/trash'){
              // console.log('index.vue中选中信息：'+this.$store.state.ListData)
              this.$store.state.ListData.forEach(function (item) {
                let that = this
                axios.get(baseUrl + '/trash/deleteFile',{
                  params:{
                    filename:item.filename,
                    type:item.type
                  }
                }).then((res)=>{
                  // console.log(res);
                  if(res.data.res=='ok'){
                    that.$Message.success('删除成功！');
                  }else{
                    that.$Message.error('删除失败，请刷新后重试！');
                  }
                })
              })
            }else{
              // console.log('index.vue中选中信息：'+this.$store.state.ListData)
              // var newArr = [].slice.call(this.$store.state.ListData)
              // console.log(newArr)
        //        it.files.forEach(function (item,index,array) {
        //   Array.prototype.push.call(state.source[item.type],item);
        // })
              this.$store.state.ListData.forEach(function (item) {
                // console.log('filename:'+item.filename)
                let that = this
                axios.get(baseUrl + '/trash/gotoTrash',{
                  params:{
                    filename:item.filename,
                    type:item.type
                  }
                }).then((res)=>{
                  // console.log(res)
                  if(res.data=='ok'){
                    // that.$Message.success('加入回收站！');
                    alert('加入回收站！')
                  }else{
                    alert('加入回收站失败，请刷新后重试！')
                    // that.$Message.error('加入回收站失败，请刷新后重试！');
                  }
                })
              })
            }
          },
          //展示信息
          play(){
            this.myValue=!this.myValue
          },
          outlogin(){
            //退出登录
            axios.get(baseUrl + '/users/outLogin').then((res)=>{
              if(res.data ==='ok'){
                this.$store.commit('out');
                this.$Message.success('登出成功!');
                this.$router.replace('/')
              }
            }).catch((err)=>{
              console.log(err)
            })
          },
          handleSuccess(response, file, fileList){
            this.$Notice.success({
              title: '上传成功',
              desc: ''
            });
          },
          handleProgress(event, file, fileList){
            console.log(event, file, fileList)
          },
          handleError( error, file, fileList){
            console.log(error, file, fileList)
          },
          handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确'
                });
            },
          changeOne(name) {
            //路由切换加载信息
            if (name == 'all'||name=='doc'||name=='img'||name=='radio'||name=='video'||name=='trash') {
              let that = this;
              axios.get(baseUrl + '/index/getFile', {
                params: {
                  type: name
                }
              }).then((res) => {
                if (res.data.length == 0) {

                } else {
                  // console.log(res.data)
                  that.$nextTick(function () {
                    that.$store.commit('updateSource', {
                      type: name,
                      files: res.data
                    })
                  })
                }
              })
            } else if (name == 'coffer') {
              this.goCoffer ()
            }
          }
        }
    }
</script>

<style scoped>
  .logo{
    font-size: 30px;
    margin: 15px;
    color: #2d8cf0;
  }
  .name{
    cursor: pointer;
  }
  .all{
    text-align: center;
  }
</style>
