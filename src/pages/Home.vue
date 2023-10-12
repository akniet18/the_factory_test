<script setup lang="ts">
import { Header } from "@/components/Header";
import { Search } from "@/components/ui";
import { unsplash } from "@/api";
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const photos: Ref<any[] | any | undefined> = ref([]);
const search: Ref<string> = ref("");
const windowWidth: Ref<number> = ref(0);

const toDetail = (id: string): void => {
	router.push({ name: "PhotoDetail", params: { id: id } });
};

const getSearchResult = () => {
	if (search.value) {
		let params = {
			query: search.value,
			perPage: 8
		}
		unsplash.search.getPhotos(params).then((res) => {
			if (res.type === "success") {
				photos.value = res.response.results;
			}
		});
	} else {
		getRandomPhotos()
	}
};

const getRandomPhotos = () => {
	unsplash.photos
		.getRandom({
			count: 8,
		})
		.then((res) => {
			photos.value = res.response;
		});
}

onMounted(() => {
	getRandomPhotos()
	window.addEventListener("resize", (e: Event) => {
		const target = e.target as Window;
		windowWidth.value = target.innerWidth;
	});
});
</script>

<template>
	<div class="home">
		<Header :height="windowWidth > 480 ? '148px' : '81px'"></Header>
		<div class="banner">
			<div class="banner__search">
				<Search v-model="search" @change="getSearchResult()"></Search>
			</div>
			<div class="overflow"></div>
		</div>
		<div class="line"></div>
		<div class="container">
			<div class="gallery">
				<div
					class="gallery__item"
					v-for="photo in photos"
					:key="photo.id"
					@click="toDetail(photo.id)"
				>
					<img :src="photo.urls.small" :alt="photo.alt_description" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.gallery {
	margin-top: 100px;
	padding-bottom: 30px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-template-rows: repeat(auto-fill, 400px);
	grid-column-gap: 27px;
	grid-row-gap: 23px;
	&__item {
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

.banner {
	width: 100%;
	height: 253px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20px;
	background-image: url("@/assets/banner.png");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	position: relative;
	&__search {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 1;
		width: 100%;
	}
}

.overflow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba($color: #000000, $alpha: 0.5);
}
</style>
