import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/TheLogin.vue';
import AppLayout from '@/views/layouts/AppLayout.vue';

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
*   hidden: false,    // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
*   auth: [],         // It will control the page roles (you can set multiple roles)
*   icon: 'home',     // Icon will appear in the navigation bar or sidebar
*   hasMulSub: false, // It has multiple children
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
      redirect: { name: 'Index' },
      meta: {
        hidden: true,
      },
    },
    {
      path: '/index',
      component: AppLayout,
      redirect: { name: 'Index' },
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/common/VHomepage.vue'),
          meta: {
            icon: 'home',
            auth: [],
          },
        },
      ],
    },
    {
      path: '/users',
      component: AppLayout,
      redirect: { name: 'Users' },
      children: [
        {
          path: 'index',
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
      component: AppLayout,
      redirect: { name: 'Create' },
      meta: {
        hasMulSub: true,
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
