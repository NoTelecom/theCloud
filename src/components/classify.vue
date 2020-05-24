<!--  -->
<template>
<div class='main'>
      <h1>常用服务</h1>
    <div class="wrap">
      <MenuItem name="near" to="/near">
        <div class="tile">
          <img src='../../static/img/classify3.jpg' />
          <div class="text">
            <h1>最近保存</h1>
            <h2 class="animate-text">存放您最近存入CLOUD的各类文件</h2>
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div> 
        </div>
      </MenuItem>
      <MenuItem name="all" to="/all">
        <div class="tile">
            <img src='../../static/img/photo1.jpg' />
            <div class="text">
            <h1>全部文件</h1>
            <h2 class="animate-text">您拥有的全部照片，音频，视频，文档等等</h2>
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
        </div>
        </MenuItem>
      <MenuItem name="trash" to="/trash">
        <div class="tile" @click="enter(trash)">
            <img src='../../static/img/classify4.jpg' />
            <div class="text">
            <h1>回收站</h1>
            <h2 class="animate-text">回收站可暂时为您保存那您删除的文件</h2>
            <!-- <p class="animate-text">More games, waiting for you to fight.</p> -->
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    </MenuItem>
</div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import '组件名称' from '组件路径';
import {baseUrl} from '../assets/js/util'
import axios from 'axios';
axios.defaults.withCredentials=true;
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 过滤器
  filters: {},
  // 方法集合
  methods: {
    
  },
  // beforeRouteLeave (to, from, next) {
  //   // 离开当前路由页面时调用
  //   console.log(to.path.slice(1))
  //   let type = to.path.slice(1)
  //   let that = this;
  //   axios.get(baseUrl + '/index/getFile', {
  //     params: {
  //       type
  //     }
  //   }).then((res) => {
  //     console.log(res.data)
  //     if (res.data.length == 0) {

  //     } else {
  //       that.$nextTick(function () {
  //         that.$store.commit('updateSource', {
  //           type,
  //           files: res.data
  //         })
  //       })
  //     }
  //   })
  //   next()
  // },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
body {
  background-color: #eee
}

.wrap {
  margin: 50px auto 50px auto;
  width: 100%;
  display: flex;
  align-items: space-around;
  max-width: 1200px;
}

.tile {
  width: 380px;
  height: 380px;
  margin: 10px;
  background-color: rgb(87,163,243);
  display: inline-block;
  background-size: cover;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease-out;
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.44);
  overflow: hidden;
  color: white;
  font-family: 'Roboto';
}

.tile img {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: all 0.4s ease-out;
}

.tile .text {
  z-index: 99;
  position: absolute;
  padding: 30px;
  height: calc(100% - 60px);
  height: calc(100% - 60px);
}

.tile h1 {
  font-weight: 300;
  margin: 0 auto;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.tile h2 {
  font-weight: 100;
  margin: 20px 0 0 0;
  font-style: italic;
  transform: translateX(200px);
}

.tile p {
  font-weight: 300;
  margin: 20px 0 0 0;
  line-height: 25px;
  /*   opacity:0; */
  transform: translateX(-200px);
  transition-delay: 0.2s;
}

.animate-text {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}

.tile:hover {
  /*   background-color:#99aeff; */
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.64);
  transform: scale(1.05);
}

.tile:hover img {
  opacity: 0.2;
}

.tile:hover .animate-text {
  transform: translateX(0);
  opacity: 1;
}

.dots {
  position: absolute;
  bottom: 20px;
  right: 30px;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  color: currentColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.dots span {
  width: 5px;
  height: 5px;
  background-color: currentColor;
  border-radius: 50%;
  display: block;
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.5s ease;
  transform: translateY(30px);
}

.tile:hover span {
  opacity: 1;
  transform: translateY(0px);
}

.dots span:nth-child(1) {
  transition-delay: 0.05s;
}

.dots span:nth-child(2) {
  transition-delay: 0.1s;
}

.dots span:nth-child(3) {
  transition-delay: 0.15s;
}

@media (max-width: 1000px) {
  .wrap {
    flex-direction: column;
    width: 400px;
  }
}
</style>
