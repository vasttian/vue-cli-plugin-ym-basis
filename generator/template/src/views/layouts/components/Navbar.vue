<template>
  <%_ if (ui === 'element') { _%>
  <el-header
    class="flex-box space-btw">
    <!-- logo -->
    <router-link
      :to="{ path: '/' }">
      <span class="logo">
        <img src="@/assets/logo.png" alt="">
      </span>
    </router-link>
    <span
      class="toggle-btn"
      @click.stop="$emit('toggleSidebar')">
      <img src="@/assets/baseline-menu-24px.svg" alt="">
    </span>

    <!-- menu -->
    <el-menu
      :default-active="activeMenu"
      mode="horizontal"
      background-color="#065bc9"
      text-color="#fff"
      active-text-color="#21d5cb"
      router>
      <template v-for="(route, index) in $router.options.routes[1].children">
        <template
          v-if="route.meta && route.meta.hasSub">
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
            v-if="roleShow(route)"
            :key="index"
            :index="route.name"
            :route="route">
            <span slot="title">{{ route.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

    <!-- avatar -->
    <div class="flex-box">
      <el-dropdown>
        <span class="el-dropdown-link userinfo flex-box">
          <span class="avatar flex-box">
            <img
              src="http://67.218.155.2:8082/cloud.jpg"
              alt="Demo">
          </span>
          <span>{{ user && user.username }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePassword">
            <%_ if (i18n === 'none') { _%>
            修改密码
            <%_ } else { _%>
            {{ $t('common.account') }}
            <%_ } _%>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <%_ if (i18n === 'none') { _%>
            退出登录
            <%_ } else { _%>
            {{ $t('common.logout') }}
            <%_ } _%>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    </div>
  </el-header>
  <%_ } else if (ui === 'vuetify') { _%>
  <header>
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
              src="http://67.218.155.2:8082/cloud.jpg"
              alt="Demo">
          </v-avatar>
          <span style="margin-left: 10px;">vasttian</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile @click.native="changePassword">
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
  </header>
  <%_ } else { _%>
  <header></header>
  <%_ } _%>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
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
      <%_ } else { _%>
      return { username: 'Demo' };
      <%_ } _%>
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
    changePassword() {
      <%_ if (ui === 'element') { _%>
      this.$message({
        showClose: true,
        message: 'Please add a function to change your password',
      });
      <%_ } else if (ui === 'vuetify') { _%>
      this.$message({
        type: 'info',
        text: 'Please add a function to change your password',
      });
      <%_ } _%>
    },
  },
  created() {
  },
};
</script>
