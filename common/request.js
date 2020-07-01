import config from "@/common/config.js";
import store from '@/store';

module.exports = (params) => {
	let url = params.url;
	let method = params.method;
	let header = params.header || {};
	header['auth-token'] = uni.getStorageSync('auth-token') || '';
	let data = params.data || {};
	// 请求方式 GET POST
	if (method) {
		method = method.toUpperCase(); // 转换为大写
	}
	if (!params.hideLoading) {
		uni.showLoading({
			title: "加载中"
		})
	}

	const allUrl = config.baseApiUrl + url;
	// 发送网络请求
	uni.request({
		url: allUrl,
		method: method || 'GET',
		header: header,
		data: data,
		dataType: 'json',
		sslVerify: false, // 是否验证ssl证书 
		success: res => { // 成功回调
			// console.log(res)
			// 当借口返回值为-2时，跳转至登录页面
			if (res.data.code == -2) {
				if(!store.getters.toLogin){
					store.dispatch("changeToLogin", true);
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 1500)
				}
				
			}
			typeof params.success == 'function' && params.success(res.data);
		},
		fail: err => { // 失败回调
			uni.showToast({
				content: err.msg
			})
			typeof params.file == 'function' && params.fail(err.data)
		},
		complete: (e) => {
			// console.log("请求成功");
			uni.hideLoading()
			typeof params.complete == 'function' && params.complete(e.data)
			return
		}
	})
}
