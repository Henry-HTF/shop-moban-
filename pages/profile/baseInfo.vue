<template>
	<view class="base-info">
		<view class="cu-form-group margin-top flex justify-between align-center">
			<view class="title">头像</view>
			<view class="padding-sm" @tap="ChooseImage">
				<image :src="baseUrl+userInfo.avatar" mode="aspectFill" class="radius" style="height: 150rpx; width: 150rpx"></image>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">用户名</view>
			<input placeholder="暂无用户名" name="input" v-model="userInfo.username"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input name="input" disabled v-model="userInfo.phone"></input>
		</view>
		<button class="margin-lg bg-green" @click="updateInfo">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				baseUrl: "http://192.168.31.238",
				filePaths: ''
			};
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			// 上传图片
			// ChooseImage() {
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album', 'camera'], //从相册选择
			// 		success: (res) => {
			// 			const tempFilePaths = res.tempFilePaths;
			// 			uni.uploadFile({
			// 				url: '', //接口地址
			// 				filePath: tempFilePaths,
			// 				name: 'file',
			// 				// formData: { // 参数
			// 				// 	'user': 'test'
			// 				// },
			// 				success: (res) => {
			// 					console.log(res.data);
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			
			// 修改用户信息网络请求
			updateInfo() {
				
			},
			// 个人信息网络请求
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
							this.userInfo = res.data.data
							console.log(this.userInfo)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
