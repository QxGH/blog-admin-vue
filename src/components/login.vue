<template>
<div class="login-bg" style="padding: 0;">
	<el-form class="login-box" ref="form" :model="form" autoconplete="off">
		<el-form-item prop="name" :rules="[{required: true, message: '用户名不能为空', trigger: 'blur'}]">
			<el-input v-model="form.name" placeholder="用户名/ID"></el-input>
		</el-form-item>
		<el-form-item prop="password" :rules="[{required: true, message: '密码不能为空', trigger: 'blur'}]">
			<el-input v-model="form.password" type="password" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button class="login-btn" round @click="submitForm" @keyup.enter.native="searchEnterFun">登录</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			form: {
				name: "",
				password: ""
			},
			encryptPW: ""
		}
	},
	created() {
		this.keyupSubmit()
	},
	methods: {
		keyupSubmit() {
			var _self = this;
			document.onkeydown = e => {
				let _key = window.event.keyCode;
				if (_key === 13) {
					_self.submitForm();
				}
			}
		},
		submitForm() {
			var _self = this;
			// 密码加密
			var encrypt = md5(_self.form.password);
			_self.encryptPW = encrypt;
			// ajax
			this.$refs["form"].validate((valid) => {
				if (valid) {
					_self.$axios({
							method: 'post',
							data: {
								id: _self.form.name,
								password: _self.encryptPW
							},
							url: 'http://localhost:3001/login/',
							headers: {
								"Conten-Type": "http://localhost:3001/login/"
							}
						})
						.then(function(res) {
							if (res.data.success) {
								_self.$store.commit('ADD_COUNT', res.data.token);
								_self.$router.push('/index');
							} else {
								_self.$message.error('用户名或密码输入错误！');
							}
						})
						.catch(function(err) {
							_self.$alert('发生错误！', '提示', {
								confirmButtonText: '确定'
							});
						})
				} else {
					return false;
				}
			});
		}
	}
}
</script>

<style>
.login-bg {
	height: 100%;
	background: url("http://qny.qxtodo.com/login-bg-min.png") no-repeat;
	background-size: 100% 100%;
	position: relative;
}

.login-box {
	position: absolute;
	top: 50%;
	left: 50%;
	background: transparent;
	width: 290px;
	height: auto;
	-webkit-transform: translate(-145px, -150px);
	-moz-transform: translate(-145px, -150px);
	-ms-transform: translatX(-145px, -150px);
	-o-transform: translate(-145px, -150px);
	transform: translate(-145px, -150px);
}

.login-btn {
	width: 100%;
	background: #38587F;
	color: #fff;
	border: 0;
}
</style>
