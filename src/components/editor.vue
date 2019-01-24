<template>
	<div id="Editor">
		<el-form ref="form" :model="form" label-width="80px" :rules="rules">
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="分类" prop="type">
				<el-select v-model="form.type" placeholder="分类" @change="selectType">
				  <el-option label="HTML" value="HTML"></el-option>
				  <el-option label="JavaScript" value="JavaScript"></el-option>
				  <el-option label="CSS" value="CSS"></el-option>
				  <el-option label="VUE" value="VUE"></el-option>
				  <el-option label="NodeJs" value="NodeJs"></el-option>
				  <el-option label="Sass" value="Sass"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标签" prop="tag">
				<el-select v-model="form.tag" multiple placeholder="标签" @change="selectTag">
					<el-option
					  v-for="item in tagOption"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<mavon-editor
					:ishljs = "true"
					@change="getVal"
					:toolbars = "{bold: true, italic: true, header: true, underline: true, strikethrough: true, mark: true, ol: true, ul: true, link: true,
						imagelink: true, code: true, table: true, fullscreen: true, readmodel: true, undo: true, redo: true, trash: true, subfield: true}"
				></mavon-editor>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
		</el-form>
	</div>
</template>

<script>
// import VmMarkdown from 'vm-markdown'
export default {
	name: 'Editor',
	data() {
		return {
			form: {
				title: '',
				type: '',
				tag: [],
				content: ''
			},
			tagOption: [{
					value: 'JavaScript',
					label: 'JavaScript'
				}, {
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'VUE',
					label: 'VUE'
				},{
					value: 'JQuery',
					label: 'JQuery'
				}, {
					value: 'NodeJs',
					label: 'NodeJs'
				}, {
					value: 'Sass',
					label: 'Sass'
				}
			],
			rules: {
				title: [
					{ required: true, message: '请输入标题', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请选择类型', trigger: 'change' }
				],
				tag: [
					{ required: true, message: '请选择标签', trigger: 'change' }
				],
				content: [
					{ required: true, message: '请输入内容', trigger: 'blur' }
				],
			}
		}
    },
	methods: {
		getVal(value, render){
			this.form.content = render;
		},
		selectType(typeVal){
			this.type = typeVal;
		},
		selectTag(tagVal){
			this.tag = tagVal;
		},
		submit(){
			var self = this;
			this.$refs["form"].validate((valid) => {
				if (valid) {
					var newDate = parseFloat(new Date().getTime().toString().substr(0,10));
					var postData = {
						title: self.form.title,
						type: self.form.type,
						tag: self.form.tag.toString(),
						date: newDate,
						content: self.form.content
					};
					this.$axios({
						method:'post',
						data: postData,
						url:'http://localhost:3001/blog/creatBlog/',
						headers:{
							"Conten-Type":"http://localhost:3001/blog/creatBlog/"
						}
					})
					.then(function(res){
						if(res.data.success){
							self.$alert('创建成功！', '提示', {
								confirmButtonText: '确定'
							});
							self.resetForm("form");
						} else {
							self.$alert('创建失败！', '提示', {
								confirmButtonText: '确定'
							});
						}
					})
					.catch(function(err){
						self.$alert('发生错误！', '提示', {
							confirmButtonText: '确定'
						});
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs['form'].resetFields()
		}
	}
}
</script>

<style scoped>
.el-select{
	width: 50%;
}
.el-input{
	width: 50%;
}
#Editor .v-note-wrapper .shadow {
    box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227)!important;
}
#Editor .v-note-wrapper {
	min-height: 500px;
}
</style>
