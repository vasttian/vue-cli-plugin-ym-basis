<template>
  <%_ if (ui === 'element') { _%>
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
  <%_ } else if (ui === 'vuetify') { _%>
  <v-toolbar-items>
    <template v-for="(route, index) in $router.options.routes">
      <template v-if="!route.children">
        <v-btn
          v-if="roleShow(route)"
          :key="index"
          :input-value="activeMenu === route.name"
          flat
          :to="{ name: route.name }">
          {{ route.name }}
        </v-btn>
      </template>
      <template v-else-if="route.meta && route.meta.hasMulSub">
        <v-menu
          v-if="roleShow(route)"
          :key="index"
          bottom
          origin="bottom center"
          offset-y
          transition="scale-transition">
          <v-btn
            slot="activator"
            flat>
            {{ route.name }}
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list :key="index">
            <v-list-tile
              v-for="(cRoute, idx) in route.children"
              :to="{ name: cRoute.name }"
              :key="idx">
              <v-list-tile-action v-if="cRoute.meta && cRoute.meta.icon">
                <v-icon>{{ cRoute.meta.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ cRoute.name }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn
          v-if="roleShow(route.children[0])"
          :key="index"
          :input-value="activeMenu === route.children[0].name"
          flat
          :to="{ name: route.children[0].name }">
          {{ route.children[0].name }}
        </v-btn>
      </template>
    </template>
  </v-toolbar-items>
  <%_ } else { _%>
  <div></div>
  <%_ } _%>
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
      <%_ if (hamlet) { _%>
      return this.$auth.token() && this.$store.state.auth ? this.$store.state.auth.user || {} : {};
      <%_ } else {_%>
      return { username: 'Demo' };
      <%_ }_%>
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

