<script setup lang="ts">
import { Header } from "@/components/Header";
import { useFavoriteStore } from "@/store/favorites";
import { useRouter } from "vue-router";

const router = useRouter();
const favoriteStore = useFavoriteStore();

const toDetail = (id: string): void => {
	router.push({ name: "PhotoDetail", params: { id: id } });
};
</script>

<template>
	<div class="favorites">
		<Header height="80px"></Header>
		<div class="line"></div>
		<div class="container">
			<div class="favorites__inner">
				<h2 class="favorites__title">Избранное</h2>
				<div class="favorites__list">
					<div
						v-for="favoriteItem in favoriteStore.favorites"
						:key="favoriteItem.id"
						class="favorites__list-item"
						@click="toDetail(favoriteItem.id)"
					>
						<img :src="favoriteItem.url" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.favorites {
	&__inner {
		margin-top: 94px;
	}
	&__title {
		text-align: center;
		font-size: 40px;
		font-weight: 700;
	}
	&__list {
		margin-top: 100px;
		padding-bottom: 30px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-template-rows: repeat(auto-fill, 400px);
		grid-column-gap: 27px;
		grid-row-gap: 23px;
		&-item {
			border-radius: 8px;
			overflow: hidden;
			img {
				object-fit: cover;
				min-width: 300px;
				width: 100%;
				height: 400px;
			}
		}
	}
}
</style>
