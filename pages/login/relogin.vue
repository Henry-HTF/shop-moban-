<template>
	<view class="relogin">
		<view class="bg"></view>
		<view class="relogin-form bg-white shadow padding">
			<view class="text-center text-bold text-green text-xxl">
				注册
			</view>
			<form @submit="formSubmit">
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="请输入手机号" type="number" name="phone" v-model="form.phone"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">验证码</view>
					<input placeholder="请输入验证码" type="number" name="verify" v-model="form.verify"></input>
					<button class='cu-btn bg-green shadow' @click="verifyClick">验证码</button>
				</view>
				<view class="cu-form-group">
					<view class="title">密码</view>
					<input placeholder="请输入密码" type="password" name="password" v-model="form.password"></input>
				</view>
				<view class="flex margin-top-sm">
					<button class="relogin-btn cu-btn margin-tb-sm round bg-green lg flex-sub" form-type="submit">注 册</button>
				</view>
				<view class="text-center margin-tb-sm text-green" @tap="toLoginClick">
					前往登录
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
					verify: '',
					password: ''
				},
			};
		},
		methods: {
			// 表单验证
			formSubmit(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [{
						name: "phone",
						checkType: "phoneno",
						errorMsg: "请填写正确的11位手机号码"
					},
					{
						name: "verify",
						checkType: "string",
						checkRule: "4,6",
						errorMsg: "请填写正确的验证码"
					},
					{
						name: "password",
						checkType: "string",
						checkRule: "6,12",
						errorMsg: "请填写新密码，长度6-12位"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: 'none'
					});
					this.userRelogin()
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},

			// 获取验证码按钮点击事件
			verifyClick() {
				var rule = [{
					name: "phone",
					checkType: "phoneno",
					errorMsg: "请填写正确的11位手机号码"
				}]
				var formData = this.form;
				console.log(formData)
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证码已发送",
						icon: 'none'
					});
					this.getVerify()
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},

			// 前往登录点击事件
			toLoginClick() {
				uni.navigateBack({
					delta: 1,
				});
			},

			// 获取验证码网络请求
			getVerify() {
				this.$request({
					url: '/login/getVerify',
					data: {
						phone: this.form.phone
					},
					success: res => {
						this.form.verify = res.data.verify
					}
				})
			},
			// 注册的网络请求
			userRelogin() {
				this.$request({
					method: 'post',
					url: "/login/register",
					data: {
						phone: this.form.phone,
						verify: this.form.verify,
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
							uni.showToast({
								title: "注册成功，可以前往登录了",
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.relogin {
		width: 100vw;
		height: 100vh;
		background-color: #f8f8f8;

		.bg {
			width: 100vw;
			height: 60vh;
			background: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1287527925,3407796655&fm=26&gp=0.jpg) no-repeat center center;
		}

		.relogin-form {
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

					.relogin-btn {
						margin: 0 auto;
						width: 300rpx;
					}
				}

			}
		}
	}
</style>
