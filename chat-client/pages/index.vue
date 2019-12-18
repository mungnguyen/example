<template>
  <v-card class="mx-auto" outlined>
    <v-form v-model="valid">
      <v-text-field v-model="user.username" label="User name"></v-text-field>

      <v-text-field v-model="user.password" label="Password"></v-text-field>
    </v-form>

    <center>
      <v-btn type="primary" rounded @click="handleLogin">Đăng nhập</v-btn>
    </center>
  </v-card>
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
      }
    };
  },

  methods: {
    ...mapActions("login", ["login"]),

    async handleLogin() {
      const { isSuccess, user, token } = await this.login(this.user);
      if (isSuccess) {
        if (process.browser) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", user.userId);
          localStorage.setItem("name", user.name);
        }
        this.$router.push("/chat");
      }
    }
  }
};
</script>
