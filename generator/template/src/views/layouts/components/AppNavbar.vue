<template>
  <%_ if (ui === 'element') { _%>
  <el-header
    class="flex-box space-btw">
    <span
      class="toggle-btn"
      @click.stop="$emit('toggleSidebar')">
      <img src="@/assets/baseline_menu_white_24dp.png" alt="">
    </span>

    <!-- logo -->
    <router-link
      :to="{ path: '/' }">
      <span class="logo">
        <img src="@/assets/logo.png" alt="">
      </span>
    </router-link>

    <!-- menu -->
    <navbar-menu></navbar-menu>

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
      <base-langbar/>
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

      <!-- menu -->
      <navbar-menu/>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-toolbar-title slot="activator">
          <v-avatar size="40">
            <img
              src="http://67.218.155.2:8082/cloud.jpg"
              alt="Demo">
          </v-avatar>
          <span style="margin-left: 5px;font-weight: 500;font-size: 16px;">
            {{ user && user.username }}
          </span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile @click="changePassword">
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
      <base-langbar/>
      <%_ } _%>
    </v-toolbar>
  </header>
  <%_ } else { _%>
  <header></header>
  <%_ } _%>
</template>

<script>
<%_ if (i18n !== 'none') { _%>
import BaseLangbar from '@/components/widgets/BaseLangbar.vue';
<%_ } _%>
import NavbarMenu from './menus/TheIndex.vue';

export default {
  name: 'AppNavBar',
  components: {
    <%_ if (i18n !== 'none') { _%>
    BaseLangbar,
    <%_ } _%>
    NavbarMenu,
  },
  data() {
    return {

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
    logout() {
      <%_ if (hamlet) { _%>
      this.$auth.logout().then(() => {
        this.$router.push({ name: 'Login' });
      });
      <%_ } else {_%>
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
