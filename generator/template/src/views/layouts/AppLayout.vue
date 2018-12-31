<template>
  <%_ if (ui === 'element') { _%>
  <el-container
    class="app-wrapper"
    direction="vertical">
  <%_ } else if (ui === 'vuetify') { _%>
  <v-app class="app-wrapper">
  <%_ } else { _%>
  <div class="app-wrapper">
  <%_ } _%>
    <app-navbar
      class="nav-container"
      @toggleSidebar="toggleSidebar"/>
    <%_ if (ui === 'element') { _%>
    <el-container>
      <app-sidebar
        ref="sidebar"
        class="sidebar-container"/>
      <app-main class="main-container"/>
    </el-container>
    <%_ } else { _%>
    <app-sidebar
      ref="sidebar"
      class="sidebar-container"/>
    <app-main class="main-container"/>
    <%_ } _%>
  <%_ if (ui === 'element') { _%>
  </el-container>
  <%_ } else if (ui === 'vuetify') { _%>
  </v-app>
  <%_ } else { _%>
  </div>
  <%_ } _%>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppSidebar from './components/AppSidebar.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppSidebar,
    AppMain,
  },
  data() {
    return {

    };
  },
  methods: {
    toggleSidebar() {
      if (this.$refs.sidebar) {
        this.$refs.sidebar.toggleSidebar();
      }
    },
  },
};
</script>
