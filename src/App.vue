<template>
  <div id="app">
    <el-container>
      <el-header v-if="ifLogin" class="clearfix"> 
        <app-nav class="pull-left"></app-nav>
        <div class="quit pull-right" @click="quit">
          <i class="icon iconfont">&#xe6ad;</i>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
	name: 'App',
	data(){
		return{
			ifLogin: true
		}
	},
	mounted() {
		this.changeHead()
	},
	methods: {
		changeHead () {
			var _self = this;
			if(this.$route.path == "/"){
				_self.ifLogin = false;
			}
		},
		quit(){
			var _self = this;
			this.$confirm('此操作将退出系统, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			.then(() => {
				sessionStorage.removeItem('token');
				_self.$router.push('/');
			})
			.catch(() => {});
		}
	},
	watch:{
		$route(to,from){
			var _self = this;
			if(to.path != "/"){
				_self.ifLogin = true;
			} else {
				_self.ifLogin = false;
			}
		}
	}
}
</script>

<style>
#app,
.el-container,
.el-main{
  height: 100%;
}
.quit{
  color: #fff;
	width: 60px;
	height: 60px;
  line-height: 60px;
  cursor: pointer;
  text-align: center
}
.quit:hover{
  background: rgba(67,74,80);
}
.quit .icon{
  font-size: 18px;
}
</style>
