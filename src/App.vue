<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import user from "./store/modules/user";
export default {
  name: "App",
  created() {
    if (sessionStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
      (this as any).$store.dispatch("user/setUserInfo", userInfo);
    }
  }
};
</script>
