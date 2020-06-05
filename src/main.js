// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuex from 'vuex';
import vGallery from 'v-gallery';
// import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
// import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
// //import 'quill/dist/quill.core.css'
// //import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(vGallery);

Vue.use(vuex);
Vue.use(ElementUI)
Vue.use(iView);
Vue.config.productionTip = false

const store = new vuex.Store({
  state:{
    size:'100',  //已用的空间
    isLog: '', // 临时改动
    isNote: false,
    user:'未知',
    source:{
      near:[],
      all:[],
      img:[],
      doc:[],
      video:[],
      radio:[],
      // note:[],
      trash: [],
      coffer:[]
      // 保险箱
    },
    // 当前的笔记
    note: {
      title: '',
      date: '',
      display: true,
      file_id: ''
    }, 
    checkList:0,//选中的个数
    focusTitle: '',
    focusDate: '',
    ListData:[], //选中的信息
  },
  mutations:{
    changeSize(state,it){
      state.size=it
    },
    changeListData(state,it){
      if(it.select=='push'){
        state.ListData.push(it.data);
         // console.log('changeListData:' + it.data.filename)

        // console.log('push之后ListData:' + [].slice.call(state.ListData))
      }else if(it.select=='pop'){
        let theindex = '';
        state.ListData.forEach(function (item,index) {
          if(item.filename==it.data.filename){
            theindex = index
          }
        })
        state.ListData.splice(theindex,1);
      }else if(it.select=='reset'){
        state.ListData=[]
      }
      console.log(state.ListData)
      // debugger; 

    },
    check(state,it){
      // debugger
      if(it.select=='reset'){
        state.checkList=0;
      }else if(it.select=='add'){
        state.checkList++;
      }else if(it.select=='sub'){
        state.checkList--;
      }
    },
    // login({state} = state,it){
    //   debugger;
    //   state.isLog = true;
    //   state.user=it;
    //   console.log(state)
    //   return state;
    // },
    out(state){
      state.isLog=false;
      state.user=''
    },
    updateSource(state,it){
      // debugger;
      if(it.type=='img'){
        state.source.img=it.files
      }else if(it.type=='note'){
        state.source.note=it.files
      }else if(it.type=='doc'){
        state.source.doc=it.files
      }else if(it.type=='video'){
        state.source.video=it.files
      }else if(it.type=='radio'){
        state.source.radio=it.files
      }else if(it.type=='all'){
        state.source.all=it.files;
        console.log(state.source.all)
        ['img','doc','video','radio','note'].forEach(function (item,index,array) {
          state.source[item]=[];
        })
        it.files.forEach(function (item,index,array) {
          Array.prototype.push.call(state.source[item.type],item);
        })
      }else if(it.type=='near'){
        state.source.near=it.files;
        // 这里单独放了一份，不牵扯任何类型
        // to do
      }else if(it.type=='trash'){
        state.source.trash=it.files;
      }else if(it.type=='coffer'){
        state.source.coffer=it.files;
      }
    }
  },
  actions: {
    login({state} = state,it){
      state.isLog = true;
      state.user=it;
      return state;
    },
    getNote({state} = state, it) {
      state.note = it;
    }
  }
})

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
