<template>
  <div class="bg" @click.self="arise = !arise ">
  <transition name="fade">
    <div class="all" v-if="arise">
      
      <Form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRuleValidate"
        label-position="top"
        class="loginForm"
        v-if="islogin"
        @keyup.enter.native="log"
      >
        <FormItem label="用户名" prop="username">
          <Input v-model="loginForm.username" placeholder="请输入用户名"></Input>
        </FormItem>

        <FormItem label="密码" prop="password">
          <Input v-model="loginForm.password" placeholder="请输入密码" type="password"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('loginForm')">登录</Button>
          <Button @click="handleReset('loginForm')" style="margin-left: 8px">重置</Button>
        </FormItem>
        <p>没有账号？快去<span style="cursor: pointer;color: #3a8ee6" @click="islogin=false">注册</span></p>
      </Form>


      <Form
        ref="regForm"
        :model="regForm"
        :rules="regRuleValidate"
        label-position="top"
        class="regForm"
        v-else
      >
        <FormItem label="用户名" prop="username">
          <Input v-model="regForm.username" placeholder="请输入用户名"></Input>
        </FormItem>

        <FormItem label="密码" prop="password">
          <Input v-model="regForm.password" placeholder="请输入密码" type="password"></Input>
        </FormItem>
        <FormItem label="再一次密码" prop="passwordAgain">
          <Input v-model="regForm.passwordAgain" placeholder="再输一次密码" type="password"></Input>
        </FormItem>

        <FormItem label="邮箱" prop="email">
          <Input v-model="regForm.email" placeholder="邮箱哦"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('regForm')">注册</Button>
          <Button @click="handleReset('regForm')" style="margin-left: 8px">重置</Button>
        </FormItem>
        <p>注册成功？快去<span @click="islogin=true" style="cursor: pointer;color: #3a8ee6">登录</span></p>
      </Form>

    </div>
  </transition>
  </div>
</template>
<style scoped>
.bounce-enter-active {
  animation: fade-in .5s;
}
.bounce-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.h1 {
  color: #fff;
  opacity: 0.8;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2405em;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  /* text-align: center; */
  cursor: pointer;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 250px 0 0 0;
  /* position: absolute; */
}
  .bg{
    background-image: url("../../static/img/timg2.gif");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
  }
  .all{
    padding: 10px;
    width:500px;
    position: absolute;
    left: 50%;
    top:150px;
    margin-left: -250px;
    box-shadow: 0px 0px 1px 1px grey inset;
    background-color: #fff;
    /*实现背景透明，文字不透明*/
    background-color:rgba(0,0,0,0.5);
  }


* {
  box-sizing: border-box;
}


</style>
<script>
  import {baseUrl} from '../assets/js/util'
  import axios from 'axios';
  axios.defaults.withCredentials=true;

  export default {
    created(){
      if(this.$store.isLog === true){
        this.$router.replace('/classify');
      } else {
        let that= this
        axios.get(baseUrl + '/users/isLog').then((res)=>{
          let {code, data} = res.data;
          let { username, size } = data
          code = Number(code);
          if(code === 200) {
          that.$store.dispatch("login", username)
          that.$store.commit('changeSize', size)
          // debugger;
          that.$router.replace('/classify');
        }
      }).catch((err)=>{
        console.log(err)
      })
      }      
      
    },
    mounted () {
      // var openLoginRight = document.querySelector('.h1');
      // var loginWrapper = document.querySelector('.login-wrapper');
      // var loginleft = document.querySelector('.login-left');

      // loginleft.addEventListener('click', function(){
      //   loginWrapper.classList.toggle('open'); 
      // });
    },
    data () {
     const checkUsername = (rule, value, callback) => {
        if (/^\w{3,15}$/.test(value)) {
          //验证该用户名是否已经被注册
          axios.get(baseUrl + '/users/checkUsername', {
              params:{
                username:value
              }
          }).then((res)=>{
            let {code} = res.data;
            code = Number(code);
            if(code === 201) {
              callback();
            }else{
              callback(new Error('阿偶，该用户名被注册了哦'))
            }
          })
        }else{
            callback(new Error('用户名为3到5为的数字字母组合'))
        }
      };

      const checkPassword = (rule, value, callback) => {
       if(value.length<6){
            callback(new Error("密码长度大于6位"))
       }else{
            if(/^[a-zA-Z]{6,15}$/.test(value)||/^\d{6,15}$/.test(value)){
              callback(new Error("密码太简单了"))
            }else{
              if(/^[a-zA-Z0-9_-]{6,15}$/.test(value)){
                callback();
              }else{
                callback(new Error("密码允许字母，数字，下划线和—的组合"))
              }
            }
       }
      };

      const checkPasswordCommon= (rule, value, callback) => {
         if(value==this.regForm.password){
           callback();
         }else{
           callback(new Error('两次密码不一样啊！'));
         }
      };

      const checkEmail = (rule, value, callback) => {
        if (/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/.test(value)) {
              axios.get(baseUrl + '/users/checkEmail', {
                params:{
                  email:value
                }
              }).then((res)=>{
                let {code} = res.data;
                code = Number(code);
                if(code === 201) {
                  callback();
                }else{
                  callback(new Error('阿偶，邮箱被注册了哦，换个吧'))
                }
              })

        }else{
          callback(new Error('emmm,这个邮箱不合适呀'));
        }
      };

      return {
        islogin:true,
        arise: false,
        loginForm: {
          username: '',
          password: ''
        },
        regForm:{
          username:'',
          password:'',
          passwordAgain:'',
          email:''
        },
        loginRuleValidate: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '输入密码哦', trigger: 'blur' },
          ]
        },
        regRuleValidate:{
          username: [
            { required: true,validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { required: true,validator: checkPassword, trigger: 'blur' },
          ],
          passwordAgain: [
            { required: true,validator: checkPasswordCommon, trigger: 'blur' }
          ],
          email: [
            { required: true,validator: checkEmail, trigger: 'blur' },

          ]
        }
      }
    },
    methods: {
      log(){
        let that = this
        axios.post(baseUrl + '/users/login', {
          data: {
            username:this.loginForm.username,
            password:this.loginForm.password
          }
        })
          .then(function (res){
            let {code} = res.data;
            code = Number(code);
            if(code === 200) {
              // to do
              // that.$store.commit("login",{username:that.loginForm.username})
              that.$store.dispatch("login",that.loginForm.username)
              that.$Message.success('登录成功!');
              that.$router.push('/classify');
            }else {
              that.$Message.success('登录失败，检查用户名密码');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      reg(){
        let that = this
        axios.post(baseUrl + '/users/reg', {
          data: {
            username:this.regForm.username,
            password:this.regForm.password,
            email:this.regForm.email
          }
        })
          .then(function (res){
            let {code} = res.data;
            code = Number(code);
            if(code === 200) {
              that.$Message.success('注册成功，快去登录!');
              that.islogin=true;

            }else {
              that.$Message.success('注册失败');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      handleSubmit (name) {
        if(name=='loginForm'){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.log();
            } else {
              this.$Message.error('存在错误信息');
            }
          })
        }else{
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.reg();
            } else {
              this.$Message.error('存在错误信息!');
            }
          })
        }
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }


</script>
