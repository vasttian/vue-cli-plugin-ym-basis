<template>
  <%_ if (ui === 'element') { _%>
  <el-aside width="">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="!drawer">
      <el-submenu
        index="1"
        :style="{ width: drawer ? '199px' : '60px' }">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <%_ } else if (ui === 'vuetify') { _%>
  <v-navigation-drawer
    class="blue-grey lighten-5"
    width="210"
    :clipped="$vuetify && $vuetify.breakpoint.mdAndUp"
    fixed
    app
    :mini-variant="miniVariant"
    v-model="drawer">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon="account_circle"
        value="true">
        <v-list-tile slot="activator">
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          no-action
          sub-group
          value="true">
          <v-list-tile slot="activator">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(admin, i) in admins"
            :key="i">
            <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-group
          sub-group
          no-action>
          <v-list-tile slot="activator">
            <v-list-tile-title>Actions</v-list-tile-title>
          </v-list-tile>

          <v-list-tile
            v-for="(crud, i) in cruds"
            :key="i">
            <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
            <v-list-tile-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <%_ } else { _%>
  <div></div>
  <%_ } _%>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      <%_ if (ui === 'element') { _%>
      drawer: true,
      <%_ } else if (ui === 'vuetify') { _%>
      drawer: this.$vuetify && this.$vuetify.breakpoint.mdAndUp,
      miniVariant: false,
      admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
      <%_ } _%>
    };
  },
  computed: {

  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<%_ if (ui === 'element') { _%>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
<%_ } _%>
