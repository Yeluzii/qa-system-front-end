import { useStore } from "vuex";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/LoginPage.vue";
import Register from "../views/RegisterPage.vue";
import AskQuestion from "../views/AskQuestion.vue";
import QuestionList from "../views/QuestionList.vue";
import QuestionDetail from "../views/QuestionDetail.vue";
import MyProfiles from "@/views/MyProfiles.vue";
import OthersProfiles from "@/views/OthersProfiles.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: QuestionList },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/ask", component: AskQuestion },
  { path: "/questions/:id", component: QuestionDetail, name: "QuestionDetail" },
  { path: "/mine", component: MyProfiles, name: "MyProfiles" },
  {
    path: "/others/:uId",
    component: OthersProfiles,
    name: "OthersProfiles",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { top: 0 };
  //   }
  // },
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  if (
    to.path === "/ask" ||
    to.path === "/mine" ||
    to.path.startsWith("/others") ||
    to.path.startsWith("/questions")
  ) {
    const userId = store.getters.getUserId;
    if (!userId) {
      alert("请先登录！");
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
