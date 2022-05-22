<template>
	<div class="cart">
		<el-row>
			<el-col :span="1" >
				<el-tag>购物车列表</el-tag>
			</el-col>
			<el-col :span="24">
				<el-table :data="cartProducts"  style="width: 100%" @selection-change="handleSelectionChange"
									ref="multipleTable">
					<el-table-column type="selection" width="55" ></el-table-column>
					<el-table-column prop="id" label="商品编号" width="180" />
					<el-table-column prop="name" label="商品名称" width="180" />
					<el-table-column prop="num" label="数量" width="180" >
						<template #default="scope">
							<el-input-number v-model="scope.row.num" controls-position="right" :min="1" :max="99" @change="changeNum(scope.row)" />
						</template>
					</el-table-column>
					<el-table-column prop="price" label="价格" />
					<el-table-column prop="total_num" label="总价" />
					<el-table-column label="操作">
						<template #default="scope">
							<el-button size="small" type="primary" icon="Delete" @click="dialogVisibleTrue(scope.row)" >删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row class="select-info">
					<el-col :span="4">
						<el-button type="primary" plain icon="Delete" @click="delOneProduct">删除已选商品</el-button>
					</el-col>
					<el-col :span="16">
						<span>您选择<mark>{{totalCount}}</mark> 件商品</span>
						<span class="proNum">总价合计:￥ <mark>{{totalPrice}}</mark> </span>
					</el-col>
					<el-col :span="4">
						<el-button type="danger" @click="clearCart">清空购物车</el-button>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 删除对话框 -->
		<el-dialog
				v-model="dialogVisible"
				title="用户请注意"
				width="30%">
			<span>确定要删除这个商品吗?</span>
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogSure">确 定</el-button>
	    </span>
			</template>
		</el-dialog>
		<!--清除对话框	-->
		<el-dialog
				v-model="dialogVisible1"
				title="用户请注意"
				width="30%">
			<span>确定要清除购物车吗?</span>
			<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogSureCart">确 定</el-button>
	    </span>
			</template>
		</el-dialog>
	</div>
 
	
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
export default {
	name: "cart",
	data() {
		return {
			dialogVisible:false,
			dialogVisible1:false,
			result:null,
			res:null,
			multipleTable:[],
			totalPrice:0,
			totalCount:0
		}
	},
	computed: {
		...mapGetters(["cartProducts"])
	},
	methods: {
		...mapActions(["changeNumAction", "delProductAction",'clearAllCart']),
		//控制商品数量
		changeNum(data) {
			this.changeNumAction(data);
		},
		
		//弹出删除对话框
		dialogVisibleTrue(data) {
			this.dialogVisible = true;
			this.result = data;
		},
		//确定删除
		dialogSure() {
			this.delProductAction(this.result);
			this.dialogVisible = false;
		},
		
		clearCart(){
			this.dialogVisible1 = true;
		},
		
		dialogSureCart(){
			this.clearAllCart(this.res);
			this.dialogVisible1 = false;
		},
		
		//多选框操作的数据状态
		handleSelectionChange(val) {
			this.multipleTable = val;
			if (this.totalPrice != 0 && this.totalCount != 0) {
				this.totalPrice = 0;
				this.totalCount = 0;
			}
			this.multipleTable.forEach(item => {
				Number(this.totalPrice);
				this.totalPrice += parseFloat(item.total_num);
				this.totalCount += parseInt(item.num);
			})
		},
		
		//删除已选中商品
		delOneProduct(){
			this.multipleTable.forEach(item => {
				this.delProductAction(item);
			})
			this.multipleTable = [];
		},
	},
	
}
</script>

 <style scoped>
 .dialog-footer button:first-child {
	 margin-right: 10px;
 }
 
 .select-info{
	 margin-top: 30px;
 }
 
 .proNum{
	 margin-left: 10px;
 }
 
</style>