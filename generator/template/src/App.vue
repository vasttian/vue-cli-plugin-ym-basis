<template>
  <div<% if ( ui !== 'vuetify') { %> id="app"<% } %>>
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      isUpdateTip: false,
      timerVersion: null,
    };
  },
  mounted() {
    // 轮询版本更新，间隔 10 秒
    this.timerVersion = setInterval(this.listenerVersionUpdate, 10000);
  },
  beforeDestroy() {
    clearInterval(this.timerVersion);
  },
  methods: {
    getHash(doc) {
      const docType = Object.prototype.toString.call(doc).match(/\[object (.*)?\]/)[1];

      if (docType !== 'HTMLDocument' && docType !== 'HTMLHtmlElement') return false;

      const appNode = [...doc.getElementsByTagName('script')]
        .map(node => node.src)
        .find(item => item.includes('app'));

      // 匹配 <script src="app.<hash>.js">
      return appNode ? appNode.match(/app(.*?)\.js/)[0] : false;
    },
    async getServerHash() {
      const { location } = window;
      const { data } = await axios.get(`${location.protocol}//${location.host}/`);

      const el = document.createElement('html');
      el.innerHTML = data;

      return this.getHash(el);
    },
    async listenerVersionUpdate() {
      if (process.env.NODE_ENV === 'development') return;

      const localHash = this.getHash(document);
      const serverHash = await this.getServerHash();

      if (localHash === serverHash) return;

      if (!this.isUpdateTip) {
        this.isUpdateTip = true;

        <%_ if (ui === 'element') { _%>
        this.$msgbox.confirm('新版本已准备好，请刷新。', '更新提示', {
          center: true,
          showClose: false,
          showCancelButton: false,
          closeOnPressEscape: false,
          confirmButtonText: '刷新',
        })
          .then(() => {
          // 参数 true 强制浏览器从服务器加载页面资源
            window.location.reload(true);
          })
          .catch(() => {})
          .finally(() => { this.isUpdateTip = false; });
        <%_ } else { _%>
        const result = window.confirm('新版本已准备好，请刷新。');

        if (result) {
          this.isUpdateTip = false;
          window.location.reload(true);
        }
        <%_ } _%>
      }
    },
  },
};
</script>
