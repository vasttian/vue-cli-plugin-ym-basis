<template>
  <%_ if (ui === 'element') { _%>
  <el-main>
    <transition
      name="move"
      mode="out-in"
    >
      <router-view />
    </transition>
  </el-main>
  <%_ } else if (ui === 'vuetify') { _%>
  <v-content>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-container>
  </v-content>
  <%_ } else { _%>
  <router-view />
  <%_ } _%>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>
