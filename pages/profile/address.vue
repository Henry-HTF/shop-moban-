<template>
	<view class="address">
		<view class="cu-list menu sm-border card-menu margin-top bg-white shadow">
			<view class="cu-item" v-for="(item, index) in 5" :key="index">
				<view class="content padding-tb-sm">
					<view><text>收货人</text><text class="text-sm text-gray margin-left-sm">13888888888</text></view>
					<view class="text-sm">收货详细地址</view>
				</view>
				<view class="action solids-left">
					<text class="padding-lr-sm text-gray" @click="updateClick(index)">编辑</text>
				</view>
			</view>
		</view>
		<view class="flex justify-center margin">
			<button class="cu-btn bg-olive lg flex-sub" @tap="addNewClick">添加新地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			
		},
		methods: {
			// 添加按钮点击事件
			addNewClick() {
				uni.navigateTo({
					url: '/pages/profile/addressComs/newAddress'
				})
			},
			// 修改地址点击事件
			updateClick(index) {
				uni.navigateTo({
					url: '/pages/profile/addressComs/updateAddress'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
