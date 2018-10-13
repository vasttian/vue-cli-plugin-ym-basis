<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    background-color="#065bc9"
    text-color="#fff"
    active-text-color="#21d5cb"
    router>
    <template v-for="(route, index) in $router.options.routes">
      <template v-if="!route.children">
        <el-menu-item
          v-if="roleShow(route)"
          :key="index"
          :index="route.name"
          :route="route">
          <span slot="title">{{ route.name }}</span>
        </el-menu-item>
      </template>
      <template v-else-if="route.meta && route.meta.hasMulSub">
        <el-submenu
          v-if="roleShow(route)"
          :index="route.name"
          :key="index">
          <template slot="title">{{ route.name }}</template>
          <el-menu-item
            v-for="(cRoute, idx) in route.children"
            :key="idx"
            :index="cRoute.name"
            :route="cRoute">
            <span slot="title">{{ cRoute.name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item
          v-if="roleShow(route.children[0])"
          :key="index"
          :index="route.children[0].name"
          :route="route.children[0]">
          <span slot="title">{{ route.children[0].name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menus',
  data() {
    return {

    };
  },
  computed: {
    user() {
      return this.$auth.token() && this.$store.state.auth ? this.$store.state.auth.user || {} : {};
    },
    activeMenu() {
      return this.$route.name;
    },
  },
  methods: {
    roleShow(route) {
      // console.log('route', route);
      if (!route.meta) {
        return true;
      }

      // hack, there is no user when logout
      if (!this.user || route.meta.hidden) {
        return false;
      }

      const { auth } = route.meta;
      return auth ? (!auth.length && !this.user.role) || auth.includes(this.user.role) : !auth;
    },
  },
};
</script>

