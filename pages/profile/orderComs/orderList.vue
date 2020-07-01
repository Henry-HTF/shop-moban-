<template>
	<view>
		<scroll-view scroll-x class="bg-white nav top-scroll" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item, index) in 5" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="cu-list card-menu bg-white sm-border shadow margin-top-sm">
			<view class="cu-item" v-for="(item, index) in 5" :key="index">
				<view class="content padding-tb-sm flex">
					<view class="padding-lr"><image src="@/static/img/bg.jpg" class="radius" mode="aspectFill" style="width: 150rpx; height: 150rpx;"></image></view>
					<view class="flex-treble flex flex-direction justify-between">
						<view class="text-lg text-grey">
							<text>商品名商品名商品名商品</text>
						</view>
						<view class="text-sm text-gray">
							<text>规格规格规格</text>
						</view>
					</view>
					<view class="flex-sub flex flex-direction justify-between align-center">
						<view class="text-df">
							<text>价格</text>
						</view>
						<view class="text-xs">
							<text>数量</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				navId: null
			};
		},
		methods: {
			// 顶部nav
			// tabSelect(item, index) {
			// 	this.TabCur = index;
			// 	this.scrollLeft = (index - 1) * 60
			// 	if (this.navId != item) {
			// 		this.navId = item
			// 	}
			// },
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">

</style>
