<template>
  <div class="ads">
    <div class="login-box">
      <div class="avatarbox">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 绑定数据对象loginform，绑定验证规则对象loginrules -->
      <!-- loginref是表单实例对象 -->
      <el-form
        :model="loginform"
        :rules="loginrules"
        ref="loginref"
        label-width="0px"
        class="loginform"
      >
        <!-- prop="规则名称username就是v-model="loginform.username"的password必须一样"定义好的规则 -->
        <el-form-item prop="username">
          <!-- 双向绑定对象里面的属性值loginform.username,前面图标prefix-icon -->
          <el-input v-model="loginform.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- prop="规则名称password就是v-model="loginform.password"的password必须一样"定义好的规则 -->
        <el-form-item prop="password">
          <el-input v-model="loginform.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login" round>登录</el-button>
          <!-- 点击重置执行函数resetlogin -->
          <el-button type="info" @click="resetlogin" round>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        username: 'admin',
        password: '123456'
      },
      loginrules: {
        // 随意第一规则名称，上面用prop="规则名称"验证表单
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () { },
  methods: {
    login () {
      // 检测表单规则对表单数据是否通过，通过返回true
      this.$refs.loginref.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        console.log(valid)
        // 把res.data结构出来
        console.log(this.loginform)
        const { data: res } = await this.$http.post('login', this.loginform)
        console.log(res)
        if (res.meta.status !== 200) {
          // 要用弹窗先去element.js挂载mesage
          // Vue.prototype.$message = Message
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功！')
        // 把token储存到本地
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航到 /home
        this.$router.push('/home')
      })
    },
    resetlogin () {
      console.log(this)
      //  ref="loginref"
      this.$refs.loginref.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.ads {
  background-color: yellow;
  height: 100%;
}

.login-box {
  width: 28.135rem;
  height: 18.75rem;
  background-color: #fff;
  // 绝对定位
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 3px;
  // 回退偏移
  transform: translate(-50%, -50%); //(x, y)

  .avatarbox {
    width: 8.13rem;
    height: 8.13rem;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 0.2rem;
    box-shadow: 0 0 0.2rem #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.loginform {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 1.4rem;
  box-sizing: border-box;
}
</style>
