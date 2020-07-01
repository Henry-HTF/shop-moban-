<template>
	<view class="index">
		<!-- 背景 -->
		<view class="top-bg"></view>
		<!-- 搜索 -->
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
		<swiper class="card-swiper" :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.pic" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav-item" v-for="item in navList" :key="item.id">
				<view>
					<image :src="item.img" mode="aspectFill"></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="recommend">
			<view class="rec-title">
				<image src="../../static/img/title.jpg" mode="aspectFit"></image>
			</view>
			<goods-list :recommendList="recommendList"></goods-list>
		</view>
		<view class="loading">---{{loadingTxt}}---</view>
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
				// 搜索功能
				InputBottom: 0,
				keyword: '',
				
				swiperList: [],
				navList: [],
				queryInfo: {
					page: 1,
					pageSize: 8
				},
				recommendList: [],
				loadingTxt: '加载更多',
				loading: false,
			}
		},
		onLoad() {
			this.getBanner()
			this.getNavList()
			this.getRecommendList()
		},
		onReachBottom() {
			this.getRecommendList()
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
					uni.navigateTo({
						url: '/pages/searchList/searchList?keyword=' + this.keyword
					})
				}
			},
			// cardSwiper 轮播图
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},

			// 轮播图网络请求
			getBanner() {
				this.$request({
					url: '/index/getBanner',
					method: 'get',
					data: {
						cate_id: 1
					},
					success: res => {
						this.swiperList = res.data.list
						// console.log(this.swiperList)
					}
				})
			},
			// 菜单列表网络请求
			getNavList() {
				this.$request({
					url: '/index/getGoodCategory',
					success: res => {
						this.navList = res.data.list
						// console.log(this.navList)
					}
				})
			},
			// 首页推荐列表网络请求
			getRecommendList() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.loadingTxt = '加载中'
				uni.showNavigationBarLoading()
				this.$request({
					url: '/index/getGoodsList',
					data: {
						page: this.queryInfo.page,
						pageSize: this.queryInfo.pageSize
					},
					success: res => {
						if (res.data.list.length === 0) {
							this.loadingTxt = "已经到底啦"
							return
						}
						this.recommendList = this.recommendList.concat(res.data.list)
						this.queryInfo.page++
						//停止下拉样式
						uni.stopPullDownRefresh()
						//隐藏标题读取
						uni.hideNavigationBarLoading()
						// console.log(this.recommendList, res.data.list, this.loadingTxt);
						this.loading = false;
					},
					fail: () => {
						this.loading = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		height: 100vh;
		width: 100vw;
		background-color: #f8f8f8;

		.top-bg {
			position: absolute;
			height: 60vh;
			width: 120vw;
			top: -30vh;
			left: -10vw;
			background-color: $uni-bg-color;
			border-radius: 50%;
		}

		.card-swiper {
			height: 400rpx !important;

			swiper-item {
				padding: 20rpx 0 20rpx 0;
			}
		}

		.nav {
			width: 100vw;
			height: 340rpx;
			background-color: #FFFFFF;
			padding: 0 2vw;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			align-items: center;

			.nav-item {
				width: 24vw;
				height: 140rpx;
				text-align: center;

				view {
					image {
						width: 100rpx;
						height: 100rpx;
						margin: 0 auto;
						border-radius: 50%;
					}
				}

				text {
					display: block;
					font-size: 32rpx;
				}
			}
		}

		.recommend {
			width: 100vw;
			margin-top: 20rpx;
			padding: 0 4vw;
			background-color: #FFFFFF;

			.rec-title {
				height: 80rpx;
				border-bottom: 1px solid #f1f1f1;

				image {
					height: 80rpx;
					width: 180rpx;
				}
			}
		}

		.loading {
			text-align: center;
			padding: 20rpx 0;
		}
	}
</style>
