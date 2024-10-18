import { createStore } from "vuex";
import axios from "axios";

// 定义用户类型
interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  avatar: string;
}

export default createStore({
  state: {
    user: null as User | null, // 明确 state.user 的类型
  },
  getters: {
    // 确保 state.user 存在且有 id 属性
    getUserId: (state): number | null => {
      if (state.user && state.user.id) {
        return state.user.id;
      }
      return null;
    },
    getAvatar: (state): string | null => {
      if (state.user && state.user.avatar) {
        return state.user.avatar;
      }
      return null;
    },
    getUsername: (state): string | null => {
      if (state.user && state.user.username) {
        return state.user.username;
      }
      return null;
    },
    getEmail: (state): string | null => {
      if (state.user && state.user.email) {
        return state.user.email;
      }
      return null;
    },
    getCreatedAt: (state): string | null => {
      if (state.user && state.user.createdAt) {
        return state.user.createdAt;
      }
      return null;
    },
  },
  mutations: {
    // 更新 setUser 以确保传入的 user 具有正确的类型
    setUser(state, user: User | null) {
      console.log("设置用户为:", user); // 调试信息
      state.user = user;
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const response = await axios.get("http://localhost:8080/users/current");
        console.log("Response data:", response.data); // 调试信息
        if (response.data.code === 200 && response.data.data) {
          const user = response.data.data as User;
          commit("setUser", user);
        } else {
          commit("setUser", null);
          console.error("未成功获取当前用户:", response.data.msg);
        }
      } catch (error) {
        commit("setUser", null);
        console.error("未成功获取当前用户:", error);
      }
    },
  },
  modules: {},
});
