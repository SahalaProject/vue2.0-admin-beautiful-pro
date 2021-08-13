<template>
  <div class="login-container" id="logo">
    <!-- <el-alert
      title="beautiful boys and girls欢迎加入vue-admin-beautifulQQ群：972435319"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert> -->
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <div class="title">hello !</div>
          <div class="title-tips">欢迎来到 Vue admin</div>
          <!-- <div class="title-tips">欢迎来到{{ title }}！</div> -->
          <el-form-item style="margin-top: 40px" prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.username"
              v-focus
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>

            <!-- 滑动验证 -->
            <div class="verify-container">
              <vab-verify
                ref="slideDiv"
                :w="350"
                :slider-text="text"
                :h="175"
                @success="handleSuccess"
                @fail="handleError"
              ></vab-verify>
            </div>
          
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            @click="handleLogin"
            :disabled="!is_verify_success"
          >
            登录
          </el-button>
          <router-link to="/register">
            <div style="margin-top: 20px">注册</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from '@/utils/validate'
  import VabVerify from '@/plugins/vabVerify'

  export default {
    name: 'Login',
    components: { VabVerify },
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      const validateusername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        // 滑动验证码
        text: '向右滑动',
        is_verify_success: false,

        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
    },
    
    methods: {
      // 滑动验证码
      handleSuccess() {
        this.$baseMessage('校验成功', 'success')
        this.is_verify_success = true;
      },
      handleError() {
        this.$baseMessage('校验失败', 'error')
        this.is_verify_success = false;
      },

      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },

      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.form)
              .then(() => {
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
      },
    },
    mounted() {
      this.form.username = 'admin'
      this.form.password = '123456'
      // setTimeout(() => {
      //   this.handleLogin()
      // }, 3000)
      // 随机背景
      const image1 = 'https://lofter.lf127.net/1611802734076/tata.gif?imageView&stripmeta=0&thumbnail=2000x2000&tostatic=0'
      const image2 = 'https://lofter.lf127.net/1611802201375/hanyijie.jpg?imageView&type=jpg&quality=80&stripmeta=0&thumbnail=3000x3000'
      const image3 = 'https://lofter.lf127.net/1611802653795/lost7.jpg?imageView&type=jpg&quality=80&stripmeta=0&thumbnail=4000x4000'
      const image4 = 'https://lofter.lf127.net/1611802494106/JimmyhE.jpg?imageView&type=jpg&quality=80&stripmeta=0&thumbnail=4000x4000'
      const image5 = 'https://lofter.lf127.net/1611802021488/bangqiaoyan-feng.jpg?imageView&type=jpg&quality=80&stripmeta=0&thumbnail=4000x4000'
      const image6 = 'https://cdn.magdeleine.co/wp-content/uploads/2018/07/DSCF0780-1400x933.jpg'
      const image7 = 'https://cdn.magdeleine.co/wp-content/uploads/2018/07/beautiful-bloom-blooming-1222868-1400x933.jpg'
      const image8 = 'https://cdn.magdeleine.co/wp-content/uploads/2021/06/cat-in-house-1400x933.jpg'
      const image9 = 'https://cdn.magdeleine.co/wp-content/uploads/2021/05/cute-rabbits-1400x933.jpg'
      const image10 = 'https://cdn.magdeleine.co/wp-content/uploads/2021/03/girl_standing_in_a_triticale_field_4-1400x933.jpg'
      const image11 = 'https://cdn.magdeleine.co/wp-content/uploads/2020/12/6005015226_5e767d58b5_4k-1400x933.jpg'
      const image12 = 'https://cdn.magdeleine.co/wp-content/uploads/2020/11/foodiesfeed.com_fresh-ripe-figs-on-a-wooden-background-1400x933.jpg'
      const image13 = 'https://cdn.magdeleine.co/wp-content/uploads/2020/08/iphone-photography-landscape-1400x933.jpg'
      const image14 = 'https://cdn.magdeleine.co/wp-content/uploads/2020/07/foodiesfeed.com_drinking-a-fresh-young-coconut-water-1400x933.jpg'

      const image_list = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14]
      const nowImage = (image_list[Math.floor(Math.random()*image_list.length)])
      var div=document.getElementById("logo");
      div.style = `background-image: url(${nowImage});`
    //  console.log(div)
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    // background: url('~@/assets/login_images/background.jpg') center center fixed no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
