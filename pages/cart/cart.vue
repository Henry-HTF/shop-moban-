<template>
	<view class="cart">
		<view class="top-bg"></view>
		<view class="cu-list menu sm-border card-menu margin-top bg-white shadow" style="margin-top: -30vh;">
			<view class="cu-item">
				<view class="content flex align-center">
					<!-- <checkbox class='round blue margin-right-sm' style="transform: scale(.7);"></checkbox> -->
					<text class="cuIcon-shop text-gray" style="font-size: 20px;"></text>
					<text class="text-black">商户名</text>
				</view>
			</view>
			<checkbox-group class="block" @change="CheckboxChange">
				<view class="cu-form-group" v-for="(item, index) in checkboxData" :key="index">
					<view class="padding-tb-sm flex align-center">
						<checkbox class='round blue margin-right-sm' style="transform: scale(.7);" :value="item.value":checked="checkedArr.includes(String(item.value))" :class="{'checked':checkedArr.includes(String(item.value))}"></checkbox>
						<view class="padding-right">
							<image src="@/static/img/bg.jpg" class="radius" mode="aspectFill" style="width: 150rpx; height: 150rpx;"></image>
						</view>
						<view class="flex-treble flex flex-direction justify-between">
							<view class="text-lg text-grey">
								<text>商品名商品名商品名商品商品名商品名商品名</text>
							</view>
							<view class="text-sm text-gray">
								<text>规格规格规格</text>
							</view>
							<view class="flex justify-between">
								<view class="text-df">
									<text class="text-olive">价格</text>
								</view>
								<view class="text-xs flex">
									<button class='cu-btn bg-gray sm cuIcon-move round' style="font-size: 26rpx;" @click="moveClick"></button>
									<input style="width: 60rpx; padding: 0; font-size: 24rpx;" class="text-center" v-model="goodsNum" disabled></input>
									<button class='cu-btn bg-gray sm cuIcon-add round' style="font-size: 30rpx;" @click="addClick"></button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view style="height: 65px; widows: 100vw;"></view>
		<view class="all">
			<view class="cu-form-group flex justify-between ">
				<view class="flex align-center">
					<!-- <checkbox class='round blue margin-right-sm' @change="allChoose"></checkbox>
					<text class="text-lg">全选</text> -->
					<checkbox-group @change="allChoose">
						<label>
							<checkbox class="round blue margin-right-sm" value="all" :class="{'checked':allChecked}" :checked="allChecked?true:false"></checkbox>
							全选
						</label>
					</checkbox-group>
				</view>
				<view class="">
					<text>合计：</text><text class="text-olive text-xl">￥{{5+7}}</text><button class="cu-btn round bg-gradual-green margin-left">结算</button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsNum: 1,
				isChecked: false,
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选

				checkboxData: [{
						'value': 0,
						'label': '选项一'
					},
					{
						'value': 1,
						'label': '选项二'
					},
					{
						'value': 2,
						'label': '选项三'
					},
					{
						'value': 3,
						'label': '选项四'
					},
					{
						'value': 4,
						'label': '选项五'
					},
				]
			}
		},
		methods: {
			// 商品数量减少
			moveClick() {
				if (this.goodsNum > 1) {
					this.goodsNum--
				} else {
					uni.showToast({
						icon: 'none',
						title: '商品数量不能少于1'
					})
				}
			},
			// 商品数量增加
			addClick() {
				this.goodsNum++
			},
			// 全选按钮
			// 多选复选框改变事件
			CheckboxChange(e) {
				console.log(e)
				this.checkedArr = e.detail.value;
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if (this.checkedArr.length > 0 && this.checkedArr.length == this.checkboxData.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			// 全选事件
			allChoose(e) {
				let chooseItem = e.detail.value;
				// 全选
				if (chooseItem[0] == 'all') {
					this.allChecked = true;
					for (let item of this.checkboxData) {
						let itemVal = String(item.value);
						if (!this.checkedArr.includes(itemVal)) {
							this.checkedArr.push(itemVal);
						}
					}
				} else {
					// 取消全选
					this.allChecked = false;
					this.checkedArr = [];
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart {
		height: 100vh;
		width: 100vw;
		background-color: #f8f8f8;
		padding-top: 10vh;

		.top-bg {
			height: 60vh;
			width: 120vw;
			margin-top: -30vh;
			margin-left: -10vw;
			background-color: $uni-bg-color;
			border-radius: 50%;
		}

		.all {
			width: 100vw;
			position: fixed;
			bottom: 0;
		}
	}
</style>
