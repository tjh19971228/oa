import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    menus: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENUS:(state,menus)=>{
    state.menus=menus
    console.log("state",menus)
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo;
    console.log("userInfo", userInfo);
    return new Promise((resolve, reject) => {
      login(
        JSON.stringify({
          username: username.trim(),
          password: password,
          captcha,
        })
      )
        .then(res => {
          const { result } = res;
          if (!res.code) {
            commit('SET_TOKEN', result.token)
            commit('SET_MENUS',result.roleMenu)
            commit("SET_USERINFO", result)
            console.log(state.menus)
            setToken(result.token)
            sessionStorage.setItem("userInfo", JSON.stringify(result))
            sessionStorage.setItem("menus",JSON.stringify(result.roleMenu))
            resolve(res);
          }
          else {
            resolve(res)
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then(response => {
    //       const { data } = response;

    //       if (!data) {
    //         reject("Verification failed, please Login again.");
    //       }

    //       const { name, avatar } = data;

    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       resolve(data);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
    if (Object.keys(state.userInfo).length) {
      resolve(true)
    }
    else {
      reject(false)
    }

  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {

      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();


    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },

  // setUserInfo
  setUserInfo({ commit }, data) {
    commit('SET_TOKEN', data.token)
    commit("SET_USERINFO", data)
  },
  // setMenus
  setMenus({commit},data){
    commit("SET_MENUS",data)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
