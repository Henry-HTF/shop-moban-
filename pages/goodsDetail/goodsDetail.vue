<template>
	<view class="gooods-detail">
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="3000"
		 duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 基本信息 -->
		<view class="base-info padding margin-top-sm bg-white margin-bottom-sm">
			<view class="name text-xl text-black text-bold">{{detailInfo.title}}</view>
			<view class="desc text-df text-gray padding-top-sm padding-bottom-sm">{{detailInfo.desc}}</view>
			<view class="info-bottom flex justify-between">
				<view class="price">
					<text class="text-xxl text-price text-red">{{detailInfo.price}}</text>
					<text class="text-sm text-gray" style="text-decoration: line-through;">{{detailInfo.money}}</text>
				</view>
				<view class="sales text-gray text-sm padding-top-sm">销量：{{detailInfo.sales}}</view>
			</view>
		</view>
		<!-- 参数 -->
		<view class="parameter padding bg-white">
			<view class="youfei flex">
				<view class="title basis-xs text-gray text-df">
					运费
				</view>
				<view class="yf-content basis-xl text-black text-df">
					{{detailInfo.freight == 0? '包邮' : detailInfo.freight + '元'}}
				</view>
			</view>
			<view class="baozhang flex margin-top-sm">
				<view class="title basis-xs text-gray text-df">
					保障
				</view>
				<view class="bz-content basis-xl text-black text-df">
					假一赔十，急速退款，货坏包退，承诺3天内发货
				</view>
			</view>
			<view class="canshu flex margin-top-sm">
				<view class="title basis-xs text-gray text-df">
					参数
				</view>
				<view class="cs-content basis-xl text-black text-df flex justify-between" @tap="showModal" data-target="canshuModal">
					<text>品牌 型号...</text><text class="cuIcon-right" style="padding-top: 4rpx;"></text>
				</view>
			</view>
			<!-- 模态框 -->
			<view class="cu-modal bottom-modal" :class="modalName=='canshuModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog">
					<view class="content padding text-bold">产品参数</view>
					<view class="padding-xl">
						Modal 内容。
					</view>
				</view>
			</view>
			<view class="canshu flex margin-top-sm">
				<view class="title basis-xs text-gray text-df">
					选择
				</view>
				<view class="cs-content basis-xl text-black text-df flex justify-between" @tap="showModal" data-target="xuanzeModal">
					<text>{{showtext == ''? '请选择颜色分类...' : showtext}}</text><text class="cuIcon-right" style="padding-top: 4rpx;"></text>
				</view>
			</view>
			<!-- 模态框 -->
			<view class="cu-modal bottom-modal" :class="modalName=='xuanzeModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog">
					<view class="content padding text-bold">图片和文字</view>
					<view class="padding-xl">
						Modal 内容。
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-bar cu-bar bg-white tabbar border shop">
			<button class="action" open-type="contact">
				<view class="cuIcon-service">
				</view>
				客服
			</button>
			<view class="action">
				<view class=" cuIcon-shop"></view> 店铺
			</view>
			<view class="action" @click="collectClick">
				<view :class="isCollect == 1?'cuIcon-favorfill text-yellow' : 'cuIcon-favor'"></view> {{isCollect == 1? '已收藏' : '收藏'}}
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur margin-">加入购物车</button>
				<button class="cu-btn bg-red round shadow-blur">立即订购</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailInfo: {},
				swiperList: [],
				goodsId: null,
				modalName: null,
				isCollect: null,

				// 选择显示的文本
				showtext: ''
			}
		},
		onLoad(option) {
			this.goodsId = option.id
			this.getDetailInfo()
		},
		methods: {
			// 模态框方法
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 是否收藏
			collectClick() {
				if (this.isCollect == 1) {
					uni.showModal({
						content: "确定取消收藏吗？",
						success: res => {
							if (res.confirm) {
								// console.log('用户点击确定');
								this.collectInfo()
							}
						}
					})
				} else {
					this.collectInfo()
				}
			},


			// 详情页网络请求
			getDetailInfo() {
				this.$request({
					url: '/goods/getGoodsDetail',
					data: {
						goods_id: this.goodsId
					},
					success: res => {
						this.detailInfo = res.data.data
						this.swiperList = this.detailInfo.goods_img
						this.isCollect = res.data.data.is_collect
						// console.log(this.isCollect,this.detailInfo.id)
					}
				})
			},
			// 收藏网络请求
			collectInfo() {
				this.$request({
					url: '/user/doCollect',
					data: {
						goods_id: this.goodsId,
						type: this.isCollect == 1 ? '2' : '1'
					},
					method: 'post',
					success: res => {
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						this.isCollect = !this.isCollect
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: err.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gooods-detail {
		width: 100vw;
		height: 100vh;

		.bottom-bar {
			width: 100vw;
			position: fixed;
			bottom: 0;
			// left: 0;
		}
	}
</style>
