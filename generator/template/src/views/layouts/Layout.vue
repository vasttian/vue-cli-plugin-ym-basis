<template>
  <%_ if (ui === 'vuetify') { _%>
  <v-app class="app-wrapper">
  <%_ } else { _%>
  <div class="app-wrapper">
  <%_ } _%>
    <navbar
      class="nav-container"
      @toggleSidebar="toggleSidebar"/>
    <sidebar
      ref="sidebar"
      class="sidebar-container"/>
    <app-main class="main-container"/>
  <%_ if (ui === 'vuetify') { _%>
  </v-app>
  <%_ } else { _%>
  </div>
  <%_ } _%>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
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

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
