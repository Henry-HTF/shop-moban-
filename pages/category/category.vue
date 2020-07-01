<template>
	<view class="category">
		<!-- 大类 -->
		<scroll-view scroll-x class="bg-white nav top-scroll" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item, index) in navList" :key="index" @tap="tabSelect(item, index)">
				{{item.title}}
			</view>
		</scroll-view>
		<view class="content flex">
			<!-- 子类 -->
			<scroll-view scroll-y="true" class="nav basis-xs flex-wrap left-scroll" scroll-with-animation :scroll-top="scrollTop">
				<view class="left-item" :class="index==NavCur?'text-green bg-white':''" v-for="(item, index) in subNavList" :key="index"
				 @tap="navSelect(item, index)">
					{{item.title}}
				</view>
			</scroll-view>
			<!-- 商品 -->
			<scroll-view scroll-y="true" class="basis-xl right-scroll">
				<view class="list">
					<view class="item" v-for="item in goodsList" :key="item.id" @click="itemClick(item.id)">
						<view class="left">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="right">
							<view class="title text-cut">{{item.title}}</view>
							<view class="desc text-cut">{{item.desc}}</view>
							<view class="bottom">
								<text class="price">{{item.price}}</text>
								<text class="money">{{item.money}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="loading">---{{loadingTxt}}---</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部nav
				TabCur: 0,
				scrollLeft: 0,
				navList: [],
				curentNav: {},

				// 侧边nav
				NavCur: 0,
				scrollTop: 0,
				subNavList: [],
				subNavMap: {},

				// 父级id
				pId: null,
				// 子级id
				sId: null,
				// 商品列表
				queryInfo: {
					page: 1,
					pageSize: 10
				},
				goodsList: [],
			}
		},
		onLoad() {
			this.getNavList()
		},
		onReachBottom() {
			this.getGoodsList()
		},
		methods: {
			// 顶部nav
			tabSelect(item, index) {
				this.TabCur = index;
				this.scrollLeft = (item.id - 1) * 60
				if (this.pId != item.id) {
					this.pId = item.id
					this.getSubNavList()
				}
			},
			// 侧边nav
			navSelect(item, index) {
				this.NavCur = index;
				console.log(index, item.id)
				if (this.sId != item.id) {
					this.goodsList = []
					this.queryInfo.page = 1
					this.sId = item.id
					this.getGoodsList()
				}
			},
			// item点击事件
			itemClick(id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?id=' +id
				})
			},

			// 主分类网络请求
			getNavList() {
				this.$request({
					url: '/index/getGoodCategory',
					success: res => {
						this.navList = res.data.list
						if (this.navList.length > 0) {
							this.curentNav = this.navList[0];
							this.pId = this.curentNav.id;
							// 调用获取子类
							this.getSubNavList();
						}
					}
				})
			},
			// 子分类网络请求
			getSubNavList() {
				let navs = this.subNavMap[this.pId]
				if (navs) { // 已获取过
					this.subNavList = navs;
					// 获取当前小类的商品
					if (this.subNavList.length > 0) {
						this.navSelect(this.subNavList[0], 0);
					} else {
						this.goodsList = [];
					}
					return;
				}
				this.$request({
					url: '/goods/getSubCategory',
					data: {
						p_id: this.pId
					},
					success: res => {
						this.subNavList = res.data.list
						this.subNavMap[this.pId] = this.subNavList
						// 获取当前小类的商品
						if (this.subNavList.length > 0) {
							this.navSelect(this.subNavList[0], 0);
						} else {
							this.goodsList = [];
						}
					}
				})
			},
			getGoodsList() {
				this.$request({
					url: '/index/getGoodsList',
					data: {
						page: this.queryInfo.page,
						pageSize: this.queryInfo.pageSize,
						cate_id: this.subNavList[this.NavCur].id
					},
					success: res => {
						if (res.data.list.length === 0) {
							return
						}
						this.goodsList = this.goodsList.concat(res.data.list)
						this.queryInfo.page++
						// console.log(this.goodsList);
					},
					erro: () => {
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category {
		width: 100vw;
		height: 100vh;
		
		.top-scroll {
			border-bottom: 1px solid #f8f8f8;
		}
		.content {
			.left-scroll {
				.left-item {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
				}
			}

			.right-scroll {
				height: calc(100vh - 95rpx);
				overflow: hidden;

				.list {
					width: 100%;
					background-color: #fff;

					.item {
						height: 250rpx;
						width: 100%;
						display: flex;
						align-items: center;
						border-bottom: 1px solid #f1f1f1;
						padding: 25rpx 0;

						.left {
							flex: 1;

							image {
								width: 200rpx;
								height: 200rpx;
							}
						}

						.right {
							flex: 2;
							margin-left: 20rpx;

							text {
								display: block;
							}

							.title {
								width: 350rpx;
								font-weight: bold;
								font-size: 32rpx;
							}

							.desc {
								width: 60%;
								font-size: 24rpx;
								color: #787878;
								margin: 20rpx 0;
							}

							.bottom {
								display: flex;
								align-items: baseline;

								.price {
									color: $uni-bg-color;
									font-size: 38rpx;
									font-weight: bold;
								}

								.money {
									color: #787878;
									font-size: 20rpx;
									text-decoration: line-through;
									margin-left: 10rpx;
								}

							}
						}
					}
				}

				.loading {
					text-align: center;
				}
			}

		}
	}
</style>
