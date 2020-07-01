<template>
	<view class="search-list">
		<view class="cu-bar search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索商品" confirm-type="search"
				 @confirm="" v-model="keyword"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @click="searchClick">搜索</button>
			</view>
		</view>
		<view class="padding-lr" v-if="isShow">
			<goods-list :recommendList="recommendList"></goods-list>
		</view>
		<view class="text-center text-gray text-sm" v-if="!isShow">
			暂无数据
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goodsList.vue'

	export default {
		components: {
			goodsList,
		},
		data() {
			return {
				InputBottom: 0,
				keyword: '',

				recommendList: [],
				isShow: true
			};
		},
		onLoad(option) {
			this.keyword = option.keyword
			// console.log(option)
			this.getSearchInfo()
		},
		methods: {
			// 搜索
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 搜索按钮点击事件
			searchClick() {
				if(this.keyword == ''){
					uni.showToast({
						icon: 'none',
						title: '搜索内容不能为空'
					})
				}else {
					this.getSearchInfo()
				}
			},

			// 搜索结果网络请求
			getSearchInfo() {
				this.$request({
					url: '/index/search',
					data: {
						keyword: this.keyword
					},
					success: res => {
						// console.log(res)
						if(res.data.list.length == 0){
							this.isShow = false
						}else{
							this.recommendList = res.data.list
							this.isShow = true
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
