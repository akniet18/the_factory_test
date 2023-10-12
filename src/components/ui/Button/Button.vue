<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		variant?: string;
		width?: string;
		icon?: string;
		iconColor?: string;
	}>(),
	{
		variant: "primary",
		iconColor: "black",
	}
);

const emit = defineEmits<{
	(e: "click", event: MouseEvent): void;
}>();

const classes = computed(() => ({
	[`btn-${props.variant}`]: props.variant,
}));

const onClick = function (e: MouseEvent) {
	emit("click", e);
};

function getImageUrl(name: string){
    const svgs: any = import.meta.globEager('../../../assets/icons/*.svg');
    return svgs[`../../../assets/icons/${name}.svg`].default
}
</script>

<template>
	<button class="btn" :class="classes" @click="onClick">
		<img v-if="icon" :src="getImageUrl(icon)" alt="">
		<span>
			<slot></slot>
		</span>
	</button>
</template>

<style lang="scss" scoped>
.btn {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	grid-gap: 10px;
	padding: 0 23px;
	border-radius: 8px;
	outline: none;
	border: none;
	font-size: 18px;
	font-weight: 400;
	@include responsive(tablet) {
		padding: 0;
		width: 50px;
	}
	@include responsive(mobile) {
		padding: 0;
		width: 50px;
	}
	span {
		@include responsive(tablet) {
			display: none;
		}
		@include responsive(mobile) {
			display: none;
		}
	}
	img{
		width: 20px;
		height: 20px;
	}
}

.btn-primary {
	background-color: #fff200;
	color: black;
}
</style>
