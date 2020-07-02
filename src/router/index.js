import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/dashboard";
import NewWord from "@/components/newWord.vue";
import ViewWord from "@/views/viewWord.vue";
import EditWord from "@/components/editWord.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/new/",
    name: "new-word",
    component: NewWord
  },
  {
    path: "/edit/:word_id",
    name: "edit-word",
    component: EditWord
  },
  {
    path: "/view/:word_id",
    name: "view-word",
    component: ViewWord
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
