<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import store from "./store";
import user from "./store/modules/user";
export default {
  name: "App",
  created() {
    if (sessionStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo") as any);
      let menus = JSON.parse(sessionStorage.getItem("menus") as any);
      (this as any).$store.dispatch("user/setUserInfo", userInfo);
      (this as any).$store.dispatch("user/setMenus", menus);
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify(store.getters.userInfo)
      );
      sessionStorage.setItem("menus", JSON.stringify(store.getters.menus));
    });
  }
};
</script>
