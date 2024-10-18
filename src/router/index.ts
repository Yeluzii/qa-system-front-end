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
  { path: "/questions", component: QuestionList },
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
});

export default router;
