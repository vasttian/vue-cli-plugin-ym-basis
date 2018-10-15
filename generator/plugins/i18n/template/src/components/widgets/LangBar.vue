<template>
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
</template>

<script>
export default {
  name: 'LangBar',
  data() {
    return {
      <%_ if (i18n !== 'none') { _%>
      currentLang: this.$i18n.locale,
      <%_ } _%>
    };
  },
  methods: {
    <%_ if (i18n !== 'none') { _%>
    switchLang(lang = 'zh-CN') {
      this.currentLang = lang;
      this.$locale.use(lang);
      localStorage.setItem('<%= rootOptions.projectName.toUpperCase() %>_LANGUAGE', lang);
    },
    <%_ } _%>
  },
};
</script>
