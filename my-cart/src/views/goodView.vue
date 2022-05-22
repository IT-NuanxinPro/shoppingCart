<template>
	<div class = "goods">
		<el-col :span="1">
			<el-tag>商品列表</el-tag>
		</el-col>
		<el-table :data = "goodList" style = "width: 100%">
			<el-table-column prop = "id" label = "商品编号" width = "180"/>
			<el-table-column prop = "name" label = "商品名称" width = "180"/>
			<el-table-column prop = "price" label = "价格" width="260" />
			<el-table-column label = "操作">
				<template #default = "scope">
					<el-button size = "small" type = "primary" icon = "Edit" @click = "addCart(scope.row)">添加购物车</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { mapState,mapActions} from 'vuex'

export default {
	name: "goods",
	computed: {
		...mapState(["goodList"])  // 将vuex中的goodList映射到当前组件的goodList中
	},
	methods:{
		...mapActions(["addCart"]),
	},
};
</script>
