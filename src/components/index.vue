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
                <span>已用容量{{size}}/1G</span>
                <Icon type="checkmark-circled"></Icon>
              </Progress>
            </Content>
      </layout>
    </Sider>
    <Layout>
      <Header style="background-color: white;z-index:1000;">
          <Row type="flex" justify="space-between">
            <Col span="9" >
              <div style="color: #2d8cf0">
                <Dropdown style="margin-left: 20px">
                  <Button type="primary" icon="ios-cloud-upload">
                    上传
                    <Icon type="ios-arrow-down"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem>
                              <!-- :action= "action" -->
                      <!-- "http://192.168.0.118:8080/index/upfile" -->
                              <!-- :before-upload="loading" -->
                      <Upload multiple type="select"
                              :format="['jpg','jpeg','png', 'gif', 'mp3', 'avi',
                              'flv', 'mov', 'mac', 'dat', 'doc', 'docx', 'bmp',
                                'pdf', 'pptx', 'ppt', 'xls', 'xlsx', 'rmvb', 'mp4',
                                'wma', 'wav', 'md', 'txt']"
                              :action= "action"
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
                <i-button @click="dialogFormVisible = true">接受分享</i-button>
                <el-dialog title="提取码" :visible.sync="dialogFormVisible">
                    <el-input v-model="inputOrder" placeholder="请输入提取码"></el-input>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="ShareShowFile()">确 定</el-button>
                        <!-- dialogFormVisible = false -->
                    </div>
                </el-dialog>
              </div>
            </Col>
            <Col span="8" v-if="$store.state.checkList!=0">
              <Button type="error" @click="delet">删除</Button>
              <Button type="warning" @click="goCoffer">加入保险箱</Button>
              <Button @click="leaveCoffer" v-if="$route.path=='/coffer'">从保险箱移出</Button>
              <Button type="primary" v-if="$route.path!='/trash'" @click="download">下载</Button>
              <Button type="primary" class="share"
                      @click="huifu"
                      v-else>复原
              </Button>
              <!-- to do -->
              <Poptip
                confirm
                placement="bottom"
                title="您确认分享这些内容吗？"
                @on-ok="share"
                @on-cancel="cancel">
                <i-button>分享给朋友</i-button>
              </Poptip>
            </Col>
            <Col span="6" >
              <div>
                <span class="name" @click="play">
                  {{this.$store.state.user}}
                  <Icon v-if=" myValue" type="md-arrow-dropup" />
                  <Icon v-else type="md-arrow-dropdown"/>
                </span>
                <Card v-show="myValue">

                  <Layout>
                    <Header style="background-color: rgb(247,248,249)">
                      <Row>
                        <Col span="12"><Avatar shape="square" icon="ios-person"  size="large" /></Col>
                        <Col span="12">
                            <span> {{$store.state.user}}</span>
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
            dialogFormVisible: false,
            input:'',
            inputOrder: '',
            myValue:false,
            checkData:[],
            action: baseUrl + '/file/upfile',
            checkToCoffer: []
          }
        },
        // computed: {
        //    ...mapState(['count'])
        // },
        created(){
          // console.log(this.$store.state)
          // if(!this.$store.state.isLog) {
          //   let that= this
          //   axios.get(baseUrl + '/users/isLog').then((res)=>{
          //     let {code, data} = res.data;
          //     let { username, size } = data
          //     code = Number(code);
          //     if(code === 200) {
          //       // that.$store.commit("login",{username:data.username})
          //       // that.$store.commit('changeSize',data.size)
          //       that.$store.dispatch("login", username)
          //       that.$store.commit('changeSize', size)
          //       // that.$router.replace('/near');
          //     } else {
          //       that.$router.replace('/');
          //     }
          //   }).catch((err)=>{
          //     console.log(err)
          //   })
          // }    
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
            let all = 1*1024*1024*1024;
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
          ShareShowFile () {
              this.dialogFormVisible = false;
              let shareno = this.inputOrder;
              // 后台判断下用户
              axios.get(baseUrl + '/sharefile/ShareShowFile',{
                  params:{
                    shareno
                  }
                }).then((res)=>{
                  let {code, data} = res.data;
                  code = Number(code);
                  if(code === 200) {
                      console.log(data)
                      axios.post(baseUrl + '/sharefile/ShareSaveFile',{
                        data:{
                            // to do
                            shareno,
                            fileids: data
                        }
                        }).then((res)=>{
                        let {code} = res.data;
                        code = Number(code);
                        if(code === 200) {
                            this.$Message.success('获取分享成功！');
                        }else{
                            this.$Message.error('获取分享失败！');
                        }
                        })
                  }else if (code === 201){
                      this.$Message.error('不能提取本人的文件喔！');
                  } else if (code === 202) {
                      this.$Message.error('提取码出错啦！');
                  } else {
                      this.$Message.error('提取失败');
                  }
                })

          },
          share () {
            let listData = this.$store.state.ListData;
            let fileids = listData.map(item => item.file_id)
            let type = listData[0].type
            console.log(listData)
            let that = this
            axios.post(baseUrl + '/sharefile/ShareToFile', {
              data: {
                fileids,
                type
              }
            }).then((res) => {
            
              console.log(res.data)
              let { code, data } = res.data;
              code = Number(code);
              if (code === 200) {
                alert('分享码获取成功！' + data)
              } else {
                this.$Message.success('分享码获取失败！');
              }
            })
          },
          cancel () {
            this.$Message.info('已经取消');
            this.$store.commit('check', {
              select: 'reset'
            })
            this.$store.commit('changeListData', {
                select: 'reset'
            })
          },
          // 下载到本地
          async download (){
            this.$store.state.ListData.forEach(function (item) {
              axios.get(baseUrl + '/file/filedownload',{
                responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
                params:{
                  filename:item.filename,
                  type:item.type
                }
                }).then((res)=>{
                  let blob = new Blob([res.data], {
                    type: 'application/octet-stream'
                  })
                  let filename = item.filename;
                  if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, filename)
                  } else {
                    var link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = filename
                    link.click()
                    //释放内存
                    window.URL.revokeObjectURL(link.href)
                  }
                })
              })
          },
          async routeToCoffer () {
            let that = this
            axios.get(baseUrl + '/file/getfile', {
              params: {
                type: 'coffer'
              }
            }).then((res) => {
              console.log(res.data)
              let { code, data } = res.data;
              code = Number(code);
              if (code === 200) {
                that.$nextTick(function () {
                  that.$store.commit('updateSource', {
                    type: 'coffer',
                    files: data
                  })
                })
              }
              // if (res.data.length == 0) {

              // } else {
              //   that.$nextTick(function () {
              //     that.$store.commit('updateSource', {
              //       type: 'coffer',
              //       files: res.data
              //     })
              //   })
              // }
            })
          },
          // 真正执行进入保险箱操作
          addToOffer () {
              // debugger;

            console.log('addToOffer:'+this.checkToCoffer)
            this.checkToCoffer.forEach(function (item) {
              axios.get(baseUrl + '/file/insertcoffer',{
                  params:{
                    filename:item.filename,
                    type:item.type
                  }
                }).then((res)=>{
                  // console.log(res)
                  let {code} = res.data;
                  code = Number(code);
                  if(code === 200) {
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
              this.checkToCoffer = this.$store.state.ListData;
              
              let that = this
               axios({
                method: 'get',
                baseURL: baseUrl,
                url: 'users/checkPassword',
                timeout: 30000,
                params: {
                  password: value
                }
              }).then(res => {
                let {code} = res.data;
                code = Number(code);
                if(code === 200) {
                  that.$message({
                    type: 'success',
                    message: '密码正确~'
                  })
                  // 真正执行进入保险箱操作
                  // debugger;
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
            let that = this;
            let listData = this.$store.state.ListData;
            axios.post(baseUrl + '/file/huifu',{
              data:{
                listData
              }
            }).then((res)=>{
              let { code, data } = res.data;
              code = Number(code);
              console.log(code)
              if (code === 200) {
                that.$Message.success('恢复成功！');
                that.changeOne('trash')
              }else{
                that.$Message.error('恢复失败，请刷新后重试！');
              }
            })  
            // this.$store.commit('check', {
            //     type: 'reset'
            //   })
            //   this.$store.commit('changeListData', {
            //       type: 'reset'
            //     })
          },
          // 移出保险箱
          leaveCoffer () {
            let listData = this.$store.state.ListData;
            let that = this;
            axios.post(baseUrl + '/file/restore',{
                data:{
                  listData
                }
              }).then((res)=>{
                let { code, data } = res.data;
                code = Number(code);
                console.log(code)
                if (code === 200) {
                  that.$Message.success('移出保险箱成功！');
                }else{
                  that.$Message.error('移出保险箱失败，请刷新后重试！');
                }
              })  
          },
          delet(){
            console.log(this.$store.state.ListData)
              let listData = this.$store.state.ListData;
              let type = String(this.$route.path).slice(1)
              console.log(type)
            if(type=='trash'){
              console.log('index.vue中选中信息：')              
              let that = this             
              axios.post(baseUrl + '/file/deletefile',{
                  data:{
                    listData
                  }
                }).then((res)=>{
                  let { code, data } = res.data;
                  code = Number(code);
                  console.log(code)
                  if (code === 200) {
                    // to do
                    // 改变ListData为空，重新获取trash
                    that.$Message.success('删除成功！');
                    that.changeOne('trash');
                  }else{
                    that.$Message.error('删除失败，请刷新后重试！');
                  }
                })  
              this.changeOne('trash');
            }else{
              console.log(listData)
              let that = this;
              axios.post(baseUrl + '/file/gototrash',{
                  data:{
                    listData
                  }
                }).then((res)=>{
                  let { code, data } = res.data;
                  code = Number(code);
                  console.log(code)
                  if (code === 200) {
                    that.$Message.success('加入回收站！');
                    that.changeOne(type);

                  }else{
                    that.$Message.error('加入回收站失败，请刷新后重试！');
                  }
                }) 
                
              // this.$store.state.ListData.forEach(function (item) {
              //   // console.log('filename:'+item.filename)
              //   let that = this
              //   axios.get(baseUrl + '/file/gototrash',{
              //     params:{
              //       filename:item.filename,
              //       type:item.type
              //     }
              //   }).then((res)=>{
              //     // console.log(res)
              //     let { code, data } = res.data;
              //     code = Number(code);
              //     if (code === 200) {
              //       alert('加入回收站！')
              //     }else{
              //       alert('加入回收站失败，请刷新后重试！')
              //       // that.$Message.error('加入回收站失败，请刷新后重试！');
              //     }
              //   })
              // })
            }
            // this.$store.commit('changeListData', {
            //     type: 'reset'
            // })
            // this.$store.commit('check', {
            //     type: 'reset'
            //   }) 
          },
          //展示信息
          play(){
            this.myValue=!this.myValue
          },
          outlogin(){
            //退出登录
            axios.get(baseUrl + '/users/outLogin').then((res)=>{
            let {code} = res.data;
            code = Number(code);
            if(code === 200) {
                this.$store.commit('out');
                this.$Message.success('登出成功!');
                this.$router.replace('/')
              }
            }).catch((err)=>{
              console.log(err)
            })
          },
          handleSuccess(res, file, fileList){
            // to do
           let {code} = res;
            code = Number(code);
            if(code === 200) {
              this.$Notice.success({
              title: '上传成功',
              desc: ''
              });
              this.changeOne('all')
            } else {
              this.$Notice.error({
              title: '上传失败,可能是名字重复了',
              desc: ''
              });
            }
            
          },
          async loading(file) {
            // debugger;
            let canUpfile = false;
            console.log(file)
            let filename = file.name;
            let file_size = file.size;
            let type;
            var file_type = filename.substring(filename.lastIndexOf('.') + 1, filename.length);
            let types = {
              img:['jpg', 'jpeg', 'png', 'gif'],
              doc:['doc', 'docx'],
              video:['avi', 'mov', 'dat', 'mp4', 'flv'],
              radio:['mp3', 'wav'],
              note:['md'],
            }
            for ( var i in types) {
              if (types[i].indexOf(file_type) !== -1) {
                type = i;
                break;
              }
            }
             await axios.get(baseUrl + '/file/upfile', {
                params: {
                  type,
                  filename,
                  file_size
                }
              }).then((res) => {
                let {code} = res.data
                console.log(res.data)
                code = Number(code)
                console.log(code)
                if (code === 200) {
                  canUpfile = true;
                  // return canUpfile;
                } else {
                  this.$Message.error('文件重名啦！');
                  canUpfile = false;
                  // return canUpfile;

                }
              })
              // console.log(canUpfile)
              // return canUpfile;
          },
          handleProgress(event, file, fileList){           
            console.log(file)
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
              axios.get(baseUrl + '/file/getfile', {
                params: {
                  type: name
                }
              }).then((res) => {
                let { code, data } = res.data;
                code = Number(code);
                if (code === 200) {
                  that.$nextTick(function () {
                    that.$store.commit('updateSource', {
                      type: name,
                      files: data
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
  .share .ivu-icon .ivu-icon-ios-help-circle {
      color: transparent;
  }
</style>
