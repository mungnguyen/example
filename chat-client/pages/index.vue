<template>
  <div class="login">
    <v-card width="30em" height="30em" style="margin: auto" shaped>
      <v-card-title>
        <template>
          <h3 style="margin: auto">
            <b>ĐĂNG NHẬP</b>
          </h3>
        </template>
      </v-card-title>
      <v-form v-model="valid" style="margin: 3em" ref="loginForm">
        <v-text-field
          :rules="emailRules"
          color="success"
          append-icon="mdi-email"
          v-model="user.username"
          label="Email"
        ></v-text-field>

        <v-text-field
          :rules="passRules"
          v-model="user.password"
          :type="!openPass ? 'password': 'text'"
          label="Password"
        >
          <template slot="append">
            <v-icon v-if="openPass" @click="openPass = false">mdi-eye-off-outline</v-icon>
            <v-icon v-else @click="openPass = true">mdi-eye</v-icon>
          </template>
        </v-text-field>
      </v-form>

      <center>
        <v-btn color="#8a2be2" dark rounded @click="handleLogin">Đăng nhập</v-btn>
      </center>
    </v-card>
    <v-snackbar v-model="snackbar" top color="#fff" :timeout="timeout">
      <v-alert text type="error">Email hoặc mật khẩu không chính xác</v-alert>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: true,
      user: {
        username: "",
        password: ""
      },
      openPass: false,
      passRules: [v => !!v || "Bạn chưa nhập password"],
      emailRules: [
        v => !!v || "Bạn chưa nhập email",
        v => /.+@.+\..+/.test(v) || "Email không hợp lệ"
      ],
      snackbar: false,
      timeout: 1000
    };
  },

  async mounted() {
    const data = await this.getGroupList();
    if (data) {
      localStorage.setItem("groupList", JSON.stringify(data));
    }
  },

  methods: {
    ...mapActions("login", ["login"]),
    ...mapActions("message", ["getGroupList"]),

    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        const { isSuccess, user, token } = await this.login(this.user);
        if (isSuccess) {
          if (process.browser) {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("id", user.userId);
            sessionStorage.setItem("name", user.name);
          }
          this.$router.push({ path: "/chat" });
        } else {
          this.snackbar = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scope>
html {
  height: 100%;
  body {
    height: 100%;
    #__nuxt {
      height: 100%;
    }

    #__layout {
      height: 100%;
    }

    .chat-client {
      height: 100%;
    }
    .login {
      padding-top: 5em;
      widows: 100%;
      height: 100%;
      background: #ef32d9; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #89fffd,
        #ef32d9
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #89fffd,
        #ef32d9
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      .v-icon.notranslate {
        color: #8a2be2;
      }

      .v-label--active {
        color: #8a2be2;
        font-weight: bold;
      }

      .v-text-field {
        .v-input__control {
          .v-input__slot::after {
            border-color: #8a2be2;
          }
        }
      }

      .v-messages__wrapper {
        color: #ff0000;
      }

      .v-snack__content {
        padding: 0;

        .v-alert--text {
          margin: 0;
          padding: 0 1em;
          background-color: transparent !important;
          .v-alert__wrapper {
            color: red;
          }
        }
      }
    }
  }
}
</style>
