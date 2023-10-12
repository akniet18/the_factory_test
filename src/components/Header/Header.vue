<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const props = defineProps<{
	height: string;
}>();

const styles = computed(() => ({
	height: `${props.height}`,
}));
</script>

<template>
	<header class="header" :style="styles">
		<div class="container">
			<div class="header__inner">
				<RouterLink class="header__logo" to="/">
					<img src="@/assets/logo.svg" alt="logo" />
				</RouterLink>
				<ul class="header__nav">
					<li v-if="route.path !== '/'" class="header__nav-item">
						<RouterLink class="title" to="/">
							<img src="@/assets/icons/search.svg" alt="">
							<span>Поиск</span>
						</RouterLink>
					</li>
					<li class="header__nav-item">
						<RouterLink class="title" to="/favorites">
							<img src="@/assets/icons/heart.svg" alt="">
							<span>Избранное</span>
						</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	position: sticky;
	top: 0;
	left: 0;
	background-color: black;
	z-index: 999;
	&__inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
	&__logo {
		width: 112px;
		height: 43px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	&__nav {
		display: flex;
		align-items: center;
		&-item {
			margin-right: 37px;
			&:last-child {
				margin-right: 0;
			}
			.icon {
				margin-right: 12px;
			}
			.title {
				display: flex;
				align-items: center;
				font-size: 18px;
				grid-gap: 10px;
				color: white;
				img {
					width: 20px;
					height: 20px;
				}
				span {
					@include responsive(mobile) {
						display: none;
					}
				}
			}
		}
	}
}
</style>
