<template>
	<view class="new-address">
		<form>
			<view class="cu-form-group margin-top">
				<input placeholder="收货人" name="input"></input>
			</view>
			<view class="cu-form-group">
				<input placeholder="手机号码" name="input"></input>
			</view>
			<view class="cu-form-group text-grey">
				<pick-regions @getRegion="handleGetRegion">
					<view class="city">
						<text v-if="show">{{cityAddress}}</text>
						<text v-if="!show">选择城市</text>
					</view>
				</pick-regions>
				<text class="cuIcon-right"></text>
			</view>
			<view class="cu-form-group">
				<input placeholder="详细地址" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">设为默认地址</view>
				<switch @change="SwitchA" :class="isDefault?'checked ':''" :checked="isDefault?true:false"></switch>
			</view>
		</form>
		<view class="flex margin-top-xl justify-center flex-direction">
			<button class="cu-btn bg-green margin-xl" @click="addClick">保存</button>
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				region: [],

				cityAddress: '',

				show: false,
				isDefault: false,
			};
		},
		components: {
			pickRegions
		},
		methods: {
			// 城市选择器点击事件
			handleGetRegion(region) {
				this.show = true
				this.region = region
				this.cityAddress = this.region.map(item => item.name).join(' ')
				console.log(this.cityAddress)
			},
			// 设为默认地址按钮选择器
			SwitchA(e) {
				this.isDefault = e.detail.value
				// console.log(this.isDefault)
			},
			// 保存按钮点击事件
			addClick() {
				
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.new-address {
		form {
			.cu-form-group {
				.city {
					font-size: 30rpx; 
					color: #777;
				}
			}
		}
	}
</style>
