<template>
	<view class="login">
		<view class="bg"></view>
		<view class="login-form bg-white shadow padding">
			<view class="text-center text-bold text-green text-xxl">
				登录
			</view>
			<form @submit="loginSubmit">
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号" type="number" name="phone" v-model="form.phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入密码" type="password" name="password" v-model="form.password"></input>
				</view>
				<view class="flex margin-top-sm">
					<button class="relogin-btn cu-btn margin-tb-sm round bg-green lg  flex-sub" form-type="submit">登 录</button>
				</view>
				<view class="text-center margin-tb-sm">
					<text class="text-gray">没有账号？</text><text class="text-green" @tap="toReloginClick">去注册</text>
				</view>
				<view class="text-center margin-tb-sm text-green" @tap="toForgetClick">
					忘记密码？
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				form: {
					phone: '',
					password: ''
				}
			};
		},
		methods: {
			// 表单验证
			loginSubmit(e) {
				var rule = [{
						name: "phone",
						checkType: "phoneno",
						errorMsg: "请填写正确的11位手机号码"
					},
					{
						name: "password",
						checkType: "string",
						checkRule: "6,12",
						errorMsg: "请填写密码，长度6-12位"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					this.userLogin()
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},

			// 去注册点击事件
			toReloginClick() {
				uni.navigateTo({
					url: '/pages/login/relogin'
				})
			},
			// 忘记密码点击事件
			toForgetClick() {
				uni.navigateTo({
					url: '/pages/login/forget'
				})
			},

			// 登录网络请求
			userLogin() {
				this.$request({
					method: "post",
					url: "/login/index",
					data: {
						phone: this.form.phone,
						password: this.form.password
					},
					success: res => {
						console.log(res)
						if (res.code !== 200) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						} else {
							uni.setStorageSync('auth-token', res.data.token)
							uni.showToast({
								icon: 'none',
								title: '登陆成功'
							})
							this.$store.dispatch("changeHasLogin", false);
							setTimeout(function() {
								uni.switchTab({
									url: '/pages/profile/profile'
								})
							}, 1500)
						}
					},
					fail: err => {
						uni.showToast({
							icon: 'none',
							title: err.msg
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;

		.bg {
			width: 100vw;
			height: 60vh;
			background: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1287527925,3407796655&fm=26&gp=0.jpg) no-repeat center center;
		}

		.login-form {
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
