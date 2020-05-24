<!-- note -->
<template>
<div class='main'>
    <Row>
        <i-col span="6" class="left-nav">
            <header><h2>全部笔记</h2></header>
            <div class="list">
                <h2 v-if="noteList.length===0">暂无笔记</h2>
                <div v-for="(item, index) in noteList" :key="item.index" v-else>
                    <div style="background:#eee;padding: 5px">
                        <Card :bordered="true" style="height: 100px;">
                            <div style="text-align:center">
                                <!-- item.display = false -->
                                <input style="width: 200px" v-model="item.title" v-on:blur="change(item)" v-show="item.display"></input>
                                <p slot="title"  v-on:dblclick="item.display = true" v-show="!item.display" >{{item.title}}</p>
                                <p>{{item.date}}</p>
                                <i-button size="small" @click="see(item)">查看</i-button>
                                <i-button type="error" size="small" @click.stop="del(item)">删除</i-button>
                            </div>                            
                            <!-- <p>这是你的笔记</p> -->
                        </Card>
                    </div>
                </div>

            </div>
        </i-col>
        <i-col span="18" class="right-nav"><div class="note" v-if="$route.path=='/no'">
            <img src="../../static/img/nonote.jpg" style="padding-top:190px" width="250px">
            <p style="font-size:20px; color:rgb(196,202,210)">请点击左上角的“新建笔记”按钮添加</p>
        </div>
        <router-view @init="init"></router-view>
        </i-col>
    </Row>
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
data() {
// 这里存放数据
return {
    noteList: [
    // {title: '使用阴影效果', date: '2019-12-14', display: true, id: 1},
    // {title: '使用阴影效果', date: '2019-12-14', display: true, id: 2},
    // {title: '使用阴影效果', date: '2019-12-14', display: true, id: 3}
    ],
    // length: 3,
    isNote: true,
    show: false

    

};
},
// 监听属性 类似于data概念
computed: {},
// 监控data中的数据变化
watch: {
    // 'item.title': function(newVal, oldVal) {
    //     this.$store.state.focusTitle = newVal
    // }
},
// 过滤器
filters: {},

// 方法集合
methods: {
    change (item) {
        item.display = false
        this.$store.state.focusTitle = item.title
        this.$store.state.focusDate = item.date

    },
    // 父组件调用了它， 给noteList里传入一个临时的值
    addNote() {
        this.noteList.push({title: '未命名', date: Date.now(), display: true, id: -1})
        this.length += 1;
    },
    see (item) {
        console.log('see:'+item.title)
        this.$store.state.focusTitle = item.title
        this.$store.state.focusDate = item.date
        console.log('see:'+this.$store.state.focusTitle)
        this.$router.push({ name: 'note', params: { id: item.file_id}})
    },
    del (item) {
        // console.log('aDS')
        axios({
              method: 'get',
              baseURL: baseUrl,
              url: '/note/delNote',
              params: {
                file_id: item.file_id
              },
              timeout: 30000
            })
              .then(response => {
                console.log(response.data)
                this.noteList = response.data
              })
              .catch(error => {
                console.error(error)
              })
    },
    init () {
        axios({
              method: 'get',
              baseURL: baseUrl,
              url: '/note/getList',
              timeout: 30000
            })
              .then(response => {
                // console.log(response.data)
                this.noteList = response.data
                
              })
              .catch(error => {
                console.error(error)
              })
    }

},
// 生命周期 - 创建完成（可以访问当前this实例）
created() {
    // 返回笔记列表合集
    // 还需要一个长度 自己可以获取
    // this.noteList = responce.data.list
    // this.noteList.forEach   添加新屬性map
    // this.length  = responce.data.list.length
    this.init()
},
// 生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, // 生命周期 - 创建之前
beforeMount() {}, // 生命周期 - 挂载之前
beforeUpdate() {}, // 生命周期 - 更新之前
updated() {}, // 生命周期 - 更新之后
beforeDestroy() {}, // 生命周期 - 销毁之前
destroyed() {}, // 生命周期 - 销毁完成
activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.left-nav {
    height: 600px;
    border-right: solid 1px rgb(206,228,221);
}
.left-nav header {width: 100%;height: 50px;}
.left-nav header h2 {float: left;margin: 0 0 0 20px}
.list {
    height: 550px;
    width: 100%;
}
.list h2 {padding-top:220px;color:rgb(196,202,210)}
</style>