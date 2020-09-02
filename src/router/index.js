import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "主页", icon: "el-icon-s-home" }
      }
    ]
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project/myProject",
    name: "project",
    meta: { title: "项目", icon: "iconfont iconxiangmu" },
    children: [
      {
        path: "myProject",
        name: "myproject",
        component: () => import("@/views/table/index"),
        meta: { title: "我的项目", icon: "iconfont iconwodexiangmu" }
      },
      {
        path: "allProjecT",
        name: "allproject",
        component: () => import("@/views/tree/index"),
        meta: { title: "全部项目", icon: "iconfont iconsuoyouxiangmu" }
      }
    ]
  },

  {
    path: "/customer",
    component: Layout,
    redirect: "/customer/myCustomer",
    meta: { title: "客户", icon: "iconfont iconkehu" },
    children: [
      {
        path: "myCustomer",
        name: "myCustomer",
        component: () => import("@/views/form/index"),
        meta: { title: "我的客户", icon: "iconfont iconwodekehu" }
      },
      {
        path: "customerPublic",
        name: "customerPublic",
        component: () => import("@/views/form/index"),
        meta: { title: "公共库", icon: "iconfont icongonggongku" }
      },
      {
        path: "allCustomer",
        name: "allCustomer",
        component: () => import("@/views/form/index"),
        meta: { title: "所有客户", icon: "iconfont iconsuoyoukehu" }
      }
    ]
  },
  {
    path: "/talent",
    component: Layout,
    redirect: "/talent/talentPool",
    meta: { title: "人才", icon: "iconfont iconrencai" },
    children: [
      {
        path: "talentPool",
        name: "talentPool",
        component: () => import("@/views/form/index"),
        meta: { title: "人才库", icon: "iconfont iconrencaiku" }
      },
      {
        path: "talentPublic",
        name: "talentPublic",
        component: () => import("@/views/form/index"),
        meta: { title: "公共库", icon: "iconfont icongonggongku" }
      },
      {
        path: "allTalent",
        name: "allTalent",
        component: () => import("@/views/form/index"),
        meta: { title: "所有人才", icon: "iconfont iconrencai1" }
      }
    ]
  },


  {
    path: "/message",
    component: Layout,
    redirect: "/message/myMessage",
    name: "message",
    meta: { title: "消息", icon: "iconfont iconxiaoxi" },
    children: [
      {
        path: "myMessage",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "mymessage",
        meta: { title: "我的消息", icon: "iconfont iconwodexiaoxi" }
      },
      {
        path: "notification",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "公告管理", icon: "iconfont icongaokaobei" }
      }
    ]
  },

  {
    path: "/EHR",
    component: Layout,
    redirect: "/EHR/contractManagement",
    name: "EHR",
    meta: { title: "EHR", icon: "iconfont iconEHR" },
    children: [
      {
        path: "contractManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "合同管理", icon: "iconfont iconprehetong" }
      },
      {
        path: "companyPolicy",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "公司制度", icon: "iconfont iconzhidu" }
      },
      {
        path: "leaveManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "请假管理", icon: "iconfont iconqingjiaguanli" }
      },
      {
        path: "attendanceManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "考勤管理", icon: "iconfont iconkaoqinguanli" }
      },
      {
        path: "invoiceManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "发票管理", icon: "iconfont iconfapiaoguanli" }
      },
    ]
  },
  {
    path: "/personal",
    component: Layout,
    redirect: "/personal/infoManagement",
    name: "personal",
    meta: { title: "个人", icon: "el-icon-user-solid" },
    children: [
      {
        path: "infoManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "信息管理", icon: "iconfont iconxinxiguanli" }
      },
      {
        path: "leaveApply",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "请假申请", icon: "iconfont iconqingjia" }
      },
      {
        path: "myAttendence",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "我的考勤", icon: "iconfont iconkaoqin" }
      },
      {
        path: "invoiceApply",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "发票申请", icon: "iconfont iconhuabanfuben" }
      },
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/userManagement",
    name: "system",
    meta: { title: "系统", icon: "el-icon-s-tools" },
    children: [
      {
        path: "userManagement",
        component: () => import("@/views/system/userManagement/index.vue"),
        meta: { title: "用户管理", icon: "iconfont iconyonghuguanli" }
      },
      {
        path: "authorityManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "权限管理", icon: "iconfont iconquanxian" }
      },
      {
        path: "roleManagement",
        component: () => import("@/views/system/roleManagement/index.vue"),
        meta: { title: "角色管理", icon: "iconfont iconjiaoseguanli" }
      },
      {
        path: "organizationManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "机构管理", icon: "iconfont iconjigouguanli" }
      },
      {
        path: "menuManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "菜单管理", icon: "iconfont iconccgl-fahuodanguanli-2" }
      },
      {
        path: "dictionaryManagement",
        component: () => import("@/views/nested/menu2/index"),
        meta: { title: "字典管理", icon: "iconfont iconccgl-shujuzidian-1" }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
