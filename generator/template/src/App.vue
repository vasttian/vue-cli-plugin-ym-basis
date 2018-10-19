<template>
  <div<% if ( ui !== 'vuetify') { %> id="app"<% } %>>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
