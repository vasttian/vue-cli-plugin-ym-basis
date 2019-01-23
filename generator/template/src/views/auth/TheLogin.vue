<template>
  <div class="panel-wrapper">
    <span class="logo">
      <img
        src="../../assets/logo.png"
        alt=""
      >
    </span>

    <div class="slogan-wrapper">
      <div class="slogan">
        <img
          src="../../assets/login-bg.svg"
          alt=""
        >
      </div>
    </div>

    <div class="panel-content">
      <%_ if (ui === 'element') { _%>
      <%_ if (i18n !== 'none') { _%>
      <base-langbar/>
      <%_ } _%>
      <div class="login-con">
        <el-form class="frame">
          <h1 v-if="!isMobile">
            <%_ if (i18n === 'none') { _%>
            Login
            <%_ } else { _%>
            {{ $t('common.loginN') }}
            <%_ } _%>
          </h1>
          <!-- <p>Don’t have an account? <el-button type="text">Create your account</el-button></p> -->
          <el-form-item>
            <el-input
              size="medium"
              clearable
              <%_ if (i18n === 'none') { _%>
              placeholder="用户名"
              <%_ } else { _%>
              :placeholder="$t('common.username')"
              <%_ } _%>
              v-model="form.username"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              size="medium"
              clearable
              <%_ if (i18n === 'none') { _%>
              placeholder="密码"
              <%_ } else { _%>
              :placeholder="$t('common.password')"
              <%_ } _%>
              v-model="form.password"
              type="password"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <el-button
                type="text"
                @click="redirectForgotPassword"
              >
                <%_ if (i18n === 'none') { _%>
                忘记密码?
                <%_ } else { _%>
                {{ $t('common.forgetPassword') }}
                <%_ } _%>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                size="medium"
                style="width:100%"
                :disabled="loginLoading"
                @click="login"
              >
                <%_ if (i18n === 'none') { _%>
                登录
                <%_ } else { _%>
                {{ $t('common.login') }}
                <%_ } _%>
                <i
                  v-if="loginLoading"
                  class="el-icon-loading"
                ></i>
              </el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <%_ if (organization) { _%>

      <el-footer>
        <%_ if (i18n === 'none') { _%>
        © 2014 - {{ currentYear }} 深圳市一面网络技术有限公司 粤 ICP 备 14054704 号 - 4
        <%_ } else { _%>
        {{ $t('common.copyrightMessage', { currentYear }) }}
        <%_ } _%>
      </el-footer>
      <%_ } _%>
      <%_ } else { _%>
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <v-content>
          <%_ if (i18n !== 'none') { _%>
          <base-langbar/>
          <%_ } _%>
          <v-container
            fluid
            fill-height
          >
            <v-layout
              align-center
              justify-center
            >
              <v-flex class="frame">
                <h1 v-if="!isMobile">
                  <%_ if (i18n === 'none') { _%>
                  Login
                  <%_ } else { _%>
                  {{ $t('common.loginN') }}
                  <%_ } _%>
                </h1>
                <v-form>
                  <v-text-field
                    v-model="form.username"
                    prepend-icon="person"
                    clearable
                    <%_ if (i18n === 'none') { _%>
                    label="用户名"
                    <%_ } else { _%>
                    :label="$t('common.username')"
                    <%_ } _%>
                    @keyup.enter.native="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    prepend-icon="lock"
                    @keyup.enter.native="login"
                    :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    <%_ if (i18n === 'none') { _%>
                    label="密码"
                    <%_ } else { _%>
                    :label="$t('common.password')"
                    <%_ } _%>
                    required
                  ></v-text-field>
                  <v-layout
                    column
                    wrap
                    justify-end
                    align-end
                  >
                    <v-flex>
                      <v-btn
                        flat
                        small
                        color="primary"
                        @click="redirectForgotPassword"
                      >
                        <%_ if (i18n === 'none') { _%>
                        忘记密码?
                        <%_ } else { _%>
                        {{ $t('common.forgetPassword') }}
                        <%_ } _%>
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn
                        :loading="loginLoading"
                        color="primary"
                        @click="login"
                      >
                        <span slot="loader">Loading...</span>
                        <%_ if (i18n === 'none') { _%>
                        登录
                        <%_ } else { _%>
                        {{ $t('common.login') }}
                        <%_ } _%>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
        <%_ if (organization) { _%>

        <v-footer
          color="#fbfbfb"
          height="auto"
        >
          <v-layout>
            <v-flex text-xs-center>
              <%_ if (i18n === 'none') { _%>
              © 2014 - {{ currentYear }} 深圳市一面网络技术有限公司 粤 ICP 备 14054704 号 - 4
              <%_ } else { _%>
              {{ $t('common.copyrightMessage', { currentYear }) }}
              <%_ } _%>
            </v-flex>
          </v-layout>
        </v-footer>
        <%_ } _%>
      </v-app>
      <%_ } _%>
    </div>
  </div>
</template>

<script>
import { isMobile<% if (hamlet) { %>, isEmptyObject<% } %> } from '@/utils/util';
<%_ if (i18n !== 'none') { _%>
import BaseLangbar from '@/components/widgets/BaseLangbar.vue';
<%_ } _%>

export default {
  name: 'Login',
  <%_ if (i18n !== 'none') { _%>
  components: {
    BaseLangbar,
  },
  <%_ } _%>
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
      <%_ if (ui === 'vuetify') { _%>
      showPwd: false,
      <%_ } _%>
      form: {
        username: 'general-demo',
        password: 'Ymdata123',
      },
      loginLoading: false,
      <%_ if (i18n !== 'none') { _%>
      currentLang: this.$i18n.locale,
      <%_ } _%>
    };
  },
  computed: {
    isMobile() {
      return isMobile();
    },
  },
  methods: {
    login() {
      <%_ if (hamlet) { _%>
      if (!this.form.password || !this.form.username) {
        return;
      }

      this.loginLoading = true;
      this.$auth.login(this.form).then(() => {
        try {
          this.$router.push({ name: 'Index' });
        } catch (err) {
          this.$router.push({ path: '/' });
        }
      }).catch((res) => {
        console.error('login failed', res);
        const { data } = res.data;
        const { reason } = res.data;

        if (!data || isEmptyObject(data)) {
          <%_ if (i18n === 'none') { _%>
          this.$message.error(reason === 'not bind to current app'
            ? '对不起，您还没有获得权限，请联系管理员' : '用户名或密码错误！');
          <%_ } else { _%>
          this.$message.error(this.$t(reason === 'not bind to current app'
            ? 'common.notBindApp' : 'common.invalid_password_username'));
          <%_ } _%>
          return;
        }

        const maxAttempts = data.login_max_attempts;
        const failedCount = data.login_failed_count;
        const enableLoginLock = data.enable_login_lock;
        const remainedCount = maxAttempts - failedCount;

        if (enableLoginLock && (reason !== 'invalid login or password'
          || (maxAttempts && maxAttempts <= failedCount))) {
          <%_ if (i18n === 'none') { _%>
          this.$message.error('您的账号已被锁定，请联系管理员！');
          <%_ } else { _%>
          this.$message.error(this.$t('common.account_is_locked'));
          <%_ } _%>
        } else if (enableLoginLock && maxAttempts && failedCount !== null && failedCount <= maxAttempts) {
          <%_ if (i18n === 'none') { _%>
          this.$message.error(`用户名或密码错误, 剩余登录次数${remainedCount}次！`);
          <%_ } else { _%>
          if (this.$locale.current() === 'en' && remainedCount === 1) {
            this.$message.error('Invalid Username or Password. last login Remained.');
          } else {
            this.$message.error(this.$t('common.invalid_password_username_number', { number: remainedCount }));
          }
          <%_ } _%>
        } else {
          <%_ if (i18n === 'none') { _%>
          this.$message.error('用户名或密码错误！');
          <%_ } else { _%>
          this.$message.error(this.$t('common.invalid_password_username'));
          <%_ } _%>
        }
      }).finally(() => {
        this.loginLoading = false;
      });
      <%_ } else {_%>
      console.log('login');
      this.$router.push({ name: 'Index' });
      <%_ if (ui === 'element') { _%>
      this.$message({
        showClose: true,
        message: 'Ahem: Please add login function',
      });
      <%_ } else if (ui === 'vuetify') { _%>
      // this.$message.info('Ahem: Please add login function');
      this.$message({
        type: 'info',
        text: 'Ahem: Please add login function',
      });
      <%_ } _%>
      <%_ } _%>
    },
    <%_ if (i18n !== 'none') { _%>
    switchLang(lang) {
      this.currentLang = lang;
      this.$locale.use(lang);
      localStorage.setItem('<%= rootOptions.projectName.toUpperCase() %>_LANGUAGE', lang);
    },
    <%_ } _%>
    redirectForgotPassword() {
      <%_ if (hamlet) { _%>
      window.open(`${process.env.VUE_APP_HAMLET_URL}/forgot_password?app_key=${process.env.VUE_APP_APP_KEY}&callback_url=${document.location.href}`);
      <%_ } else {_%>
      console.log('redirectForgotPassword');
      <%_ if (ui === 'element') { _%>
      this.$message({
        showClose: true,
        message: 'Ahem: Please add redirect function',
      });
      <%_ } else if (ui === 'vuetify') { _%>
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function',
      });
      <%_ } _%>
      <%_ } _%>
    },
  },
  created() {},
};
</script>

<style lang="scss">
  @import "../../styles/_login.scss";
</style>
