<template>
  <div class="index">
    <el-table :data="listData" stripe style="width: 100%">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date.match(/(\S*)T/)[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
		<el-pagination
			class="text-right index-page"
			@current-change=currentChange
			background
			layout="prev, pager, next"
			:pager-count="5"
			:total=pageData.total>
		</el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      listData: [],
      pageData: {
				current: 1,
				total: 10
      }
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
    getList(){
      var _self = this;
      _self.$axios({
        method:'post',
        data: _self.pageData,
        url:'http://localhost:3001/',
        headers:{
        "Conten-Type":"http://localhost:3001/"
        }
      })
      .then(function(res){
        _self.listData = res.data[0].sort(self.inverted);
				_self.pageData.total = res.data[1][0].count;
      })
      .catch(function(err){
        _self.$alert('发生错误！', '提示', {
          confirmButtonText: '确定'
        });
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    currentChange(val){
			this.pageData.current = val;
			this.getList();
		}
  }
}
</script>

<style scoped>
.index-page{
  margin-top: 20px;
}
</style>
