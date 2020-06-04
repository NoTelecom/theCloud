import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:(resolve) => require(['../components/login'],resolve),
    },
    {
      path: '/docdetail/:user/:location/:file',
      component:(resolve) => require(['../components/docdetail'],resolve)
    },
    {
      path: '/index',
      meta:{
        title:'首页'
      },
      component:(resolve) => require(['../components/index'],resolve),
      children:[
        {
          path: '/near',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/near'],resolve)
        },
        {
          path: '/classify',
          meta:{
            title:'分類'
          },
          component:(resolve) => require(['../components/classify'],resolve)
        },
        {
          path: '/all',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/doc',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/img',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/video',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/radio',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/coffer',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        },{
          path: '/photo',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/photo'],resolve)
        },
        // {
        //   path: '/note',
        //   meta:{
        //     title:'首页'
        //   },
        //   component:(resolve) => require(['../components/note'],resolve)
        // },
        {
          path: '/no',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/no'],resolve),
          children:[
            {
              path: '/note/:id',
              name: 'note',
              meta:{
                title:'首页'
              },
              component:(resolve) => require(['../components/note'],resolve)
            }]
        },{
          path: '/trash',
          meta:{
            title:'首页'
          },
          component:(resolve) => require(['../components/list'],resolve)
        }
      ]
    },
    {
      path:'*',
      redirect:'/'
    },
  ]
})
