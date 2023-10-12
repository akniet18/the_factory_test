<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
	modelValue: string;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", val: string): void;
}>();

const value = computed({
	get(): string {
		return props.modelValue;
	},
	set(val: string): void {
		emit("update:modelValue", val);
	},
});
</script>

<template>
	<div class="search-wrapper">
		<input
			v-model="value"
			class="input search"
			type="search"
			placeholder="Поиск"
		/>
		<img class="search-icon" src="@/assets/icons/searchBlack.svg" alt="">
	</div>
</template>

<style lang="scss" scoped>
.search-wrapper {
	position: relative;
	height: 70px;
	width: 866px;
	@include responsive(tablet) {
		width: 100%;
	}
	.search {
		height: 100%;
		width: 100%;
		outline: none;
		padding-left: 39px;
		font-size: 24px;
		&::placeholder {
			color: black;
		}
		&-icon {
			color: black;
			position: absolute;
			right: 34px;
			top: calc(50% - 12px);
			svg {
				path {
					fill: #000;
				}
			}
		}
	}
}
</style>
