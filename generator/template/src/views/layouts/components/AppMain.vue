<template>
  <section>
    <%_ if (ui === 'element') { _%>
    <el-main>
      <transition name="move" mode="out-in">
        <router-view />
      </transition>
    </el-main>
    <%_ } else { _%>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <%_ } _%>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>
