// 新建的Home.vue,先去index.js导入
// 登录后才能访问，所以要到index.js添加路由导航守卫
<template>
  <el-container>
    <el-header>
      <div class="box">
        <img class="images" src="../assets/tpl.jpg" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="outlogin">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iss? '64px':'200px'">
        <div class="toggler" @click="isss">|||</div>
        <!-- 一级按钮 -->
        <el-menu
          default-active="/users"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="iss"
          router
        >
          <!-- router启动路由跳转 -->
          <!-- unique-opened每次只能打开一个 -->
          <el-submenu :index="item.id+''" v-for="(item) in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconobj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="(subitem) in item.children"
              :key="subitem.id"
            >
              <i class="el-icon-menu"></i>
              {{subitem.authName}}
            </el-menu-item>
            <!-- 二级菜单 -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iconobj: {
        125: 'el-icon-s-custom',
        103: 'el-icon-s-unfold',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      },
      iss: false
    }
  },
  created () {
    this.getmenulist()
  },
  methods: {
    outlogin () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getmenulist () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        // 要用弹窗先去element.js挂载mesage
        // Vue.prototype.$message = Message
        return this.$message.error('获取失败！')
      }
      this.menulist = res.data
      this.$message.success('获取成功！')
      // 把token储存到本地
    },
    isss () {
      this.iss = !this.iss
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  padding-left: 0;
  align-items: center;
  .box {
    display: flex;
    align-items: center;
  }
  span {
    margin: 1.2rem;
    color: #fff;
    font-size: 1.1rem;
    display: block;
  }
}
.images {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 3.5rem;
}
.el-aside {
  background-color: #333744;
  height: 100vh;
}
.el-main {
  background-color: #ccc;
}
.toggler {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //   字体间距
  letter-spacing: 0.2rem;
  //   鼠标悬浮为小手
  cursor: pointer;
}
.el-menu {
  border: 0;
}
</style>
