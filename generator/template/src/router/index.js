import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Layout from '@/views/layouts/Layout.vue';

Vue.use(Router);

const Create = {
  template: '<div class="title">Create</div>',
};

const Read = {
  template: '<div class="title">Read</div>',
};

const Update = {
  template: '<div class="title">Update</div>',
};

const Delete = {
  template: '<div class="title">Delete</div>',
};

/**
* TIPS:
* meta: {
*   hidden: false,   // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
*   auth: [],        // It will control the page roles (you can set multiple roles)
*   icon: 'home',    // Icon will appear in the navigation bar or sidebar
* }
*/
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/',
      component: Layout,
      redirect: { name: 'Index' },
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/common/Homepage.vue'),
          meta: {
            icon: 'home',
            hidden: false,
            auth: [],
          },
        },
      ],
    },
    {
      path: '/users',
      component: Layout,
      redirect: { name: 'Users' },
      children: [
        {
          path: '',
          name: 'Users',
          component: () => import('@/views/admin/TheUsers.vue'),
          meta: {
            icon: 'people_outline',
            auth: [],
          },
        },
      ],
    },
    {
      path: '/actions',
      name: 'Actions',
      component: Layout,
      redirect: { name: 'Create' },
      meta: {
        hasSub: true,
      },
      children: [
        {
          path: '/create',
          name: 'Create',
          component: Create,
          meta: {
            icon: 'add',
            auth: [],
          },
        },
        {
          path: '/read',
          name: 'Read',
          component: Read,
          meta: {
            icon: 'insert_drive_file',
            auth: [],
          },
        },
        {
          path: '/update',
          name: 'Update',
          component: Update,
          meta: {
            icon: 'update',
            auth: [],
          },
        },
        {
          path: '/delete',
          name: 'Delete',
          component: Delete,
          meta: {
            icon: 'delete',
            auth: [],
          },
        },
      ],
    },
    {
      path: '/403',
      meta: {
        hidden: true,
      },
      // redirect: { name: 'Index' },
      component: Login,
    },
    {
      path: '*',
      meta: {
        hidden: true,
      },
      redirect: { name: 'Index' },
    },
  ],
});
