<template>
	<view class="forget">
		<view class="bg"></view>
		<view class="forget-form bg-white shadow padding">
			<view class="text-center text-bold text-green text-xxl">
				忘记密码
			</view>
			<form @submit="" @reset="">
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号" type="number" v-model="phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">验证码</view>
					<input placeholder="请输入验证码" type="number" v-model="verify"></input>
					<button class='cu-btn bg-green shadow' @click="verifyClick">验证码</button>
				</view>
				<view class="cu-form-group">
					<view class="title">新密码</view>
					<input placeholder="请输入密码" type="password" v-model="password"></input>
				</view>
				<view class="flex margin-top-sm">
					<button class="relogin-btn cu-btn margin-tb-sm round bg-green lg flex-sub" form-type="submit">确 定</button>
				</view>
				<view class="text-center margin-tb-sm text-green" @tap="toLoginClick">
					去登陆
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					verify: '',
					password: ''
				}
			}
		},
		methods: {
			// 去登录点击事件
			toLoginClick() {
				uni.navigateBack({
					delta:1,
				})
			},
			
			// 获取验证码请求
			verifyClick() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.forget {
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;

		.bg {
			width: 100vw;
			height: 60vh;
			background: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1287527925,3407796655&fm=26&gp=0.jpg) no-repeat center center;
		}

		.forget-form {
			width: 90%;
			height: 65vh;
			margin: -30vh auto 0 auto;
			border-radius: 20rpx;
			z-index: 1;
			form {
				view {
					.title {
						min-width: calc(4em + 15px);
					}
				}
			}
		}
	}
</style>
