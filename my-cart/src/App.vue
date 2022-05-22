<template>
	<div class="flex">
		<el-row>
			<el-col :span="4">
				<h5 class="mb-2">
					<el-button type="info" plain icon="View">后端商品管理界面</el-button>
				</h5>
				<el-menu router :default-active="$route.path" class="el-menu-vertical-demo nav">
					<el-menu-item index="/goods">
						<template #title>
							<el-icon>
								<Location />
							</el-icon>
							<span>商品列表</span>
						</template>
					</el-menu-item>
					<el-menu-item index="/cart">
						<el-icon>
							<ShoppingCart />
						</el-icon>
						<span>购物车</span>
						<el-badge v-if="totalCount" :value="totalCount" class="item"></el-badge>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="20">
				<router-view v-slot="{Component}">
					<keep-alive>
						<transition :name="animation">
							<component :is="Component"/>
						</transition>
					</keep-alive>
				</router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {Menu} from "@element-plus/icons-vue";
import {mapGetters,mapActions} from"vuex"
import { ref , watch} from 'vue';
import {useRouter , useRoute} from "vue-router";
export default {
	setup(){
		const router = useRouter();
		const route = useRoute();
		const animation = ref('slide');
		watch(route , ()=>{
			animation.value = route.meta.index === 1 ? 'slide-right' : 'slide-left'
		})
		return {
			animation
		}
	},
	components: {Menu},
	computed: {
		...mapGetters([
			"totalCount"
		])
	},
	
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
	font-weight: bold;
	color: #2c3e50;
	text-decoration: none;
}
	
	.router-link-exact-active {
		color: #42b983;
	}
 .item{
	 margin:-36px 0 0 6px;
 }

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
	height: 100%;
	will-change: transform;
	transition: all 500ms cubic-bezier(.55,0,.1,1);
	position: absolute;
	backface-visibility: hidden;
}


.slide-right-enter-active,.slide-left-leave-active{
	opacity: 0;
	transform: translate3d(-100%, 0, 0); //向左滑动
}
.slide-right-leave-active,.slide-left-enter-active{
	opacity: 0;
	transform: translate3d(100%, 0, 0); //向右滑动
}

</style>

