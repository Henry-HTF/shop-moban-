<template>
	<view class="profile">
		<view class="my-info flex justify-center align-center bg-gradual-green">
			<view class="footprint text-white padding text-center flex-sub">
				<text class="block text-xxl">{{footprintNum}}</text>
				<text class="block">足迹</text>
			</view>
			<view class="base-info text-white padding text-center" v-if="isShow">
				<image :src="baseUrl+userInfo.avatar" mode="aspectFill" class="head block margin-bottom-sm" style="border-radius: 50%;"></image>
				<text>用户名</text>
			</view>
			<view class="unlogin text-white text-lg padding text-center flex-sub" v-if="!isShow">
				<text class="block">未登录账号，请前往</text><button class="cu-btn round line-white" @click="btnClick">登录</button>
			</view>
			<view class="collect text-white padding text-center flex-sub">
				<text class="block text-xxl">{{collectNum}}</text>
				<text class="block">收藏</text>
			</view>
		</view>
		<view class="my-order margin bg-white padding-sm shadow">
			<view class="title flex justify-between align-center">
				<text class="text-black text-lg text-bold">我的订单</text><text class="text-gray text-sm" @click="viewOrder">查看所有订单<text class="cuIcon-right"></text></text>
			</view>
			<view class="icon-menu flex padding-tb justify-between text-sm">
				<view class="text-center flex-sub">
					<text class="block cuIcon-pay text-green margin-bottom-sm" style="font-size: 55rpx;"></text>
					<text>待付款</text>
				</view>
				<view class="text-center flex-sub">
					<text class="block cuIcon-send text-green margin-bottom-sm" style="font-size: 55rpx;"></text>
					<text>待发货</text>
				</view>
				<view class="text-center flex-sub">
					<text class="block cuIcon-deliver text-green margin-bottom-sm" style="font-size: 55rpx;"></text>
					<text>待收货</text>
				</view>
				<view class="text-center flex-sub">
					<text class="block cuIcon-comment text-green margin-bottom-sm" style="font-size: 55rpx;"></text>
					<text>评价</text>
				</view>
				<view class="text-center flex-sub">
					<text class="block cuIcon-refund text-green margin-bottom-sm" style="font-size: 55rpx;"></text>
					<text>退款/售后</text>
				</view>
			</view>
			<view class="logistics bg-gray radius padding-sm">
				<view class="flex text-sm text-gray justify-between">
					<text>最近物流</text>
					<text>12-18</text>
				</view>
				<view class="flex margin-top-sm">
					<view class="">
						<image src="../../static/img/bg.jpg" mode="" class="radius" style="width: 90rpx; height: 95rpx;"></image>
					</view>
					<view class="padding-lr-sm flex-twice">
						<text class="block cuIcon-roundcheckfill  margin-bottom-sm text-green">已签收</text>
						<text class="block text-gray text-cut" style="width: 65vw;">物流的详细内容物流的详细内物流的详细内容物流的详细内</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top bg-white shadow">
			<view class="cu-item arrow" @click="infoClick">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">个人信息</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="addressClick">
				<view class="content">
					<text class="cuIcon-addressbook text-green"></text>
					<text class="text-grey">收货地址</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				footprintNum: "0",
				collectNum: "0",

				userInfo: {},
				isShow: false,
				baseUrl: "http://192.168.31.238",
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 登录按钮点击事件
			btnClick() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 个人信息点击事件
			infoClick() {
				uni.navigateTo({
					url: '/pages/profile/baseInfo'
				})
			},
			// 收获地址点击事件
			addressClick() {
				uni.navigateTo({
					url: '/pages/profile/address'
				})
			},
			// 查看所有订单点击事件
			viewOrder() {
				uni.navigateTo({
					url: '/pages/profile/orderComs/orderList'
				})
			},

			// 个人中心的网络请求
			getUserInfo() {
				this.$request({
					url: '/user/getUserInfo',
					success: res => {
						if (res.code != 200) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							this.isShow = true
							this.userInfo = res.data.data
							// console.log(this.userInfo)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		height: 100vh;
		width: 100vw;

		.my-info {
			height: 30vh;

			.base-info {
				image {
					width: 150rpx;
					height: 150rpx;
				}
			}
		}

		.my-order {
			// height: 35vh;
			border-radius: 10rpx;
		}
	}
</style>
