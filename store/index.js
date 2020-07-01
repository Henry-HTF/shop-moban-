import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 存放组件之间共享的数据
	state: {
		sendSmsInterval: 0,
		showLoading: false,
		showModal: false,
		hasLogin: false,
		hasShowLogout: false,
		toLogin: false,
	},
	// 获取数据的方法
	getters: {
		sendSmsInterval: function(state) {
			return state.sendSmsInterval;
		},
		showLoading: function(state) {
			return state.showLoading;
		},
		showModal: function(state) {
			return state.showModal;
		},
		hasLogin: function(state) {
			return state.hasLogin;
		},
		toLogin: function(state) {
			return state.toLogin;
		},
		hasShowLogout: function(state) {
			return state.hasShowLogout;
		},
	},
	// 显式的更改state里的数据
	mutations: {
		setSendSmsInterval(state, sendSmsInterval) {
			state.sendSmsInterval = sendSmsInterval;
		},
		setShowLoading(state, showLoading) {
			state.showLoading = !!showLoading;
		},
		setShowModal(state, showModal) {
			state.showModal = !!showModal;
		},
		setHasLogin(state, hasLogin) {
			state.hasLogin = !!hasLogin;
		},
		setHasShowLogout(state, hasShowLogout) {
			state.hasShowLogout = hasShowLogout;
		},
	},
	// 调用mutations修改state的值
	actions: {
		changeSendSmsInterval: function(context, sendSmsInterval) {
			context.commit('setSendSmsInterval', sendSmsInterval);
		},
		changeShowLoading: function(context, showLoading) {
			context.commit('setShowLoading', showLoading);
		},
		changeShowModal: function(context, showModal) {
			context.commit('setShowModal', showModal);
		},
		changeHasLogin: function(context, hasLogin) {
			context.commit('setHasLogin', hasLogin);
		},
		changeToLogin: function(context, toLogin) {
			context.commit('setHasLogin', toLogin);
		},
		changeHasShowLogout: function(context, hasShowLogout) {
			context.commit('setHasShowLogout', hasShowLogout);
		},
	}
})

export default store
