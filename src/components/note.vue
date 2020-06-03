<template>
        <div id="editor" style="height: 800px">
            <mavon-editor style="height: 100%;position: relative; z-index: 1;" 
                           ref="md" defaultOpen="edit" v-model="text"
                           @change="change" @save="saveMavon"></mavon-editor>
        </div>
</template>
<script>
    // Local Registration
    // import mavonEditor from 'mavon-editor'
    import {baseUrl} from '../assets/js/util'
    import axios from 'axios';
    axios.defaults.withCredentials=true;
    var mavonEditor = require('mavon-editor')
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        // props:['title','date'],
        data() {
            return {
                text: ""
            }
        },
        created () {
          // console.log(this.$route.params.id)
          if (this.$route.params.id != -1) {
            this.checkNote(this.$route.params.id)
          } else {
            this.change(null,null)
          }
         //  let id = this.$router.params.Id ? this.$router.params.Id : -1
         

        },
        beforeRouteUpdate (to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 `this`
          // console.log(to.params.id)
          if (to.params.id != -1) {
            this.checkNote(to.params.id)
          } else {
            this.change(null,null)
          }
          next()
        },
        methods: {
          change (markdown, html) {
            this.text = html;
              // console.log(markdown)
              // console.log(html)
          },
          saveMavon(value,render){           
            console.log('note:'+this.$store.state.focusTitle)
            // let title = this.$store.state.focusTitle
            // let date = this.$store.state.focusDate
            console.log(this.$store.state.focusDate)
            let note = this.$store.state.note;
            console.log(note)
            let { file_id, title, date } = note;
            // debugger;
            // let id = this.$route.params.id > -1 ? this.$route.params.id : -1
            let that = this
            axios({
              method: 'post',
              baseURL: baseUrl,
              url: '/file/updatenote',
              data: {
                data: {
                  file_id,
                  title,
                  date,
                  content: value
                } // text
              },
              timeout: 30000
            })
            .then(res => {
              let { code, data } = res.data;
              code = Number(code);
              console.log(code)
              if (code === 200) {
                let { file_id, date, title, content } = data;
                this.$Message.success('保存成功');
              } else {
                this.$Message.error('保存失败');
              }
              // console.log(response.data)
              this.$emit('init')
              // this.init()

            })

            .catch(error => {
              console.error(error)
            })
          },
          checkNote (id) {
            console.log(id)
            // // this.change('<h1>的撒顶起# 十大</h1>', '的撒顶起# 十大v')
          axios({
              method: 'get',
              baseURL: baseUrl,
              url: '/file/getnote',
              params: {
                file_id: id 
              },
              timeout: 30000
            })
              .then(res => {
                let { code, data } = res.data;
                code = Number(code);
                if (code === 200) {
                  let { content } = data;
                  this.change(content, content);
                }
              })
              .catch(error => {
                console.error(error)
              })
          },
        //日期格式化
        }
      }

</script>
