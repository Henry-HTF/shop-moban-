<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			backUrl: { // h5从页面子页面进来不能到别的页面问题
				type: String,
				default: ''
			},
			switchUrl: { // h5从页面子页面进来不能到别的页面问题
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				var pages = getCurrentPages();
				if(pages.length > 1){
					uni.navigateBack({
						delta: 1
					});
				}else if(this.switchUrl){
					uni.switchTab({
						url: this.switchUrl
					})
				}else{
					uni.redirectTo({
						url: this.backUrl
					})
				}
			}
		}
	}
</script>

<style>
	.cu-bar .action:first-child {
		font-size: 40upx;
	}
</style>
