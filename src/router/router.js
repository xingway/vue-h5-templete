import Main from '@/views/main'
const allRouter =  [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component:  () => import('@/views/login/index.vue')
    },
    {
      path: '/me',
      name: 'team',
      component: Main,
      children:[
        {
          path: 'index',
          name: 'me_index',
          meta:{
            title:'个人中心',
            hideBack:true
          },
          component: () => import('@/views/me/index.vue')
        },
      ]
    },
    {
      path:'/register/info/:id',
      name:'register_info',
      meta:{
        title:'申请加入'
      },
      component:() => import('@/views/register/info.vue'),
    },
    {
      path:'/register/success',
      name:'register_success',
      meta:{
        title:'提交成功'
      },
      component:() => import('@/views/register/success.vue'),
    },
    {
      path:'/qr/:id',
      name:'share_QRCode',
      meta:{
        title:'二维码分享'
      },
      component:() => import('@/views/register/QRCode.vue'),
    },
  ]

  export default allRouter