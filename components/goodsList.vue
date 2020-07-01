<template>
	<view class="goods-list">
		<view class="list">
			<view class="item" v-for="item in recommendList" :key="item.id" @click="itemClick(item.id)">
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
		<view class="kong">
			
		</view>
	</view>
</template>

<script>
	export default {
		name: "goodsList",
		data() {
			return {

			};
		},
		props: {
			recommendList : {
				type: Array,
				default: [] 
			}
		},
		methods: {
			itemClick(id) {
				uni.navigateTo({
					url: '/pages/goodsDetail/goodsDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		.list {
			margin-top: 20rpx;
			width: 100%;
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
						width: 450rpx;
						font-weight: bold;
						font-size: 36rpx;
					}

					.desc {
						width: 60%;
						font-size: 26rpx;
						color: #787878;
						margin: 20rpx 0;
					}

					.bottom {
						display: flex;
						align-items: baseline;

						.price {
							color: $uni-bg-color;
							font-size: 40rpx;
							font-weight: bold;
						}

						.money {
							color: #787878;
							font-size: 22rpx;
							text-decoration: line-through;
							margin-left: 10rpx;
						}

					}
				}
			}
		}
	}
</style>
