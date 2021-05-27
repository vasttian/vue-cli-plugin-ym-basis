<template>
  <%_ if (ui === 'element') { _%>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    text-color="#fff"
    background-color="#065bc9"
    active-text-color="#21d5cb"
    router
  >
    <template v-for="(route, index) in routes">
      <el-menu-item
        v-if="!route.children && roleShow(route)"
        :key="index"
        :index="route.name"
        :route="route"
      >
        <span slot="title">
          <%_ if (i18n === 'none') { _%>
          {{ route.name }}
          <%_ } else { _%>
          {{ i18nRouteName(route.name) }}
          <%_ } _%>
        </span>
      </el-menu-item>
      <el-submenu
        v-else-if="route.meta && route.meta.hasMulSub && roleShow(route)"
        :index="route.name"
        :key="index"
      >
        <span slot="title">
          <%_ if (i18n === 'none') { _%>
          {{ route.name }}
          <%_ } else { _%>
          {{ i18nRouteName(route.name) }}
          <%_ } _%>
        </span>
        <el-menu-item
          v-for="(cRoute, idx) in route.children"
          :key="idx"
          :index="cRoute.name"
          :route="cRoute"
        >
          <span slot="title">
            <%_ if (i18n === 'none') { _%>
            {{ cRoute.name }}
            <%_ } else { _%>
            {{ i18nRouteName(cRoute.name) }}
            <%_ } _%>
          </span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else-if="roleShow(route) && route.children && roleShow(route.children[0])"
        :key="index"
        :index="getRouteName(route)"
        :route="route.children[0]"
      >
        <span slot="title">
          <%_ if (i18n === 'none') { _%>
          {{ getRouteName(route) }}
          <%_ } else { _%>
          {{ i18nRouteName(getRouteName(route)) }}
          <%_ } _%>
        </span>
      </el-menu-item>
    </template>
  </el-menu>
  <%_ } else if (ui === 'vuetify') { _%>
  <v-toolbar-items>
    <template v-for="(route, index) in $router.options.routes">
      <v-btn
        v-if="!route.children && roleShow(route)"
        flat
        :key="index"
        :input-value="activeMenu === route.name"
        :to="{ name: route.name }"
      >
        <%_ if (i18n === 'none') { _%>
        {{ route.name }}
        <%_ } else { _%>
        {{ i18nRouteName(route.name) }}
        <%_ } _%>
      </v-btn>
      <v-menu
        v-else-if="route.meta && route.meta.hasMulSub && roleShow(route)"
        :key="index"
        bottom
        offset-y
        origin="bottom center"
        transition="scale-transition"
      >
        <v-btn
          slot="activator"
          flat>
          <%_ if (i18n === 'none') { _%>
          {{ route.name }}
          <%_ } else { _%>
          {{ i18nRouteName(route.name) }}
          <%_ } _%>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-btn>
        <v-list :key="index">
          <v-list-tile
            v-for="(cRoute, idx) in route.children"
            :key="idx"
            :to="{ name: cRoute.name }"
          >
            <v-list-tile-action v-if="cRoute.meta && cRoute.meta.icon">
              <v-icon>{{ cRoute.meta.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <%_ if (i18n === 'none') { _%>
                {{ cRoute.name }}
                <%_ } else { _%>
                {{ i18nRouteName(cRoute.name) }}
                <%_ } _%>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        v-else-if="roleShow(route) && route.children && roleShow(route.children[0])"
        :key="index"
        flat
        :input-value="activeMenu === getRouteName(route)"
        :to="{ name: getRouteName(route) }"
      >
        <%_ if (i18n === 'none') { _%>
        {{ getRouteName(route) }}
        <%_ } else { _%>
        {{ i18nRouteName(getRouteName(route)) }}
        <%_ } _%>
      </v-btn>
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
    return {};
  },
  computed: {
    user() {
      <%_ if (hamlet) { _%>
      return this.$auth.token() && this.$store.state.auth ? this.$store.state.auth.user || {} : {};
      <%_ } else {_%>
      return { username: 'Demo' };
      <%_ }_%>
    },
    routes() {
      const { routes } = this.$router.options;
      return routes.filter(route => (!route.meta || !route.meta.hidden));
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
    getRouteName(route = {}) {
      return route.name || (route.children && route.children[0].name) || '';
    },
    i18nRouteName(name) {
      return name ? this.$t(`route.${name.toLowerCase()}`) : '';
    },
  },
};
</script>
