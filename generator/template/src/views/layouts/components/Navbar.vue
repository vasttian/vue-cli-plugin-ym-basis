<template>
  <header>
    <%_ if (ui === 'element') { _%>
    <%_ } else { _%>
    <v-toolbar
      class="primary"
      dark
      app
      flat
      dense
      height="56"
      :clipped-left="true">
      <v-toolbar-side-icon
        @click.stop="$emit('toggleSidebar')"></v-toolbar-side-icon>
      <v-toolbar-title v-if="$vuetify && $vuetify.breakpoint.smAndUp">
        <%= rootOptions.projectName.toUpperCase() %>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <template v-for="(route, index) in $router.options.routes[1].children">
          <template v-if="route.meta && route.meta.hasSub">
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
              v-if="roleShow(route)"
              :key="index"
              :input-value="activeMenu === route.name"
              flat
              :to="{ name: route.name }">
              {{ route.name }}
              </v-btn>
          </template>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-toolbar-title slot="activator">
          <v-avatar size="40">
            <img
              src="http://67.218.155.2:8082/1.png"
              alt="Demo">
          </v-avatar>
          <span style="margin-left: 10px;">vasttian</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>
              <%_ if (i18n === 'none') { _%>
              修改密码
              <%_ } else { _%>
              {{ $t('common.account') }}
              <%_ } _%>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>
              <%_ if (i18n === 'none') { _%>
              退出登录
              <%_ } else { _%>
              {{ $t('common.logout') }}
              <%_ } _%>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <%_ if (i18n !== 'none') { _%>
      <div class="change-lang">
        <span
          @click="switchLang('zh-CN')"
          :class="{ 'active-lang': currentLang === 'zh-CN' }">
          中文
        </span> /
        <span
          @click="switchLang('en')"
          :class="{ 'active-lang': currentLang === 'en' }">
          En
        </span>
      </div>
      <%_ } _%>
    </v-toolbar>
    <%_ } _%>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
      <%_ if (i18n !== 'none') { _%>
      currentLang: this.$i18n.locale,
      <%_ } _%>
    };
  },
  computed: {
    activeMenu() {
      return this.$route.name;
    },
    user() {
      <%_ if (hamlet) { _%>
      return this.$auth.token() && this.$store.state.auth ? this.$store.state.auth.user || {} : {};
      <%_ } else {_%>
      return { username: 'Demo' };
      <%_ }_%>
    },
  },
  methods: {
    roleShow(route) {
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
    <%_ if (i18n !== 'none') { _%>
    switchLang(lang = 'zh-CN') {
      this.currentLang = lang;
      this.$locale.use(lang);
      localStorage.setItem('<%= rootOptions.projectName.toUpperCase() %>_LANGUAGE', lang);
    },
    <%_ } _%>
    logout() {
      <%_ if (hamlet) { _%>
      this.$auth.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
      <%_ } else {_%>
      console.log('logout');
      this.$router.push({ name: 'Login' });
      <%_ if (ui === 'element') { _%>
      this.$message({
        showClose: true,
        message: 'Ahem: Please add logout function',
      });
      <%_ } else if (ui === 'vuetify') { _%>
      this.$message({
        type: 'info',
        text: 'Ahem: Please add logout function',
      });
      <%_ } _%>
      <%_ } _%>
    },
  },
  created() {
  },
};
</script>
