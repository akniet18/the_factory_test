<script setup lang="ts">
import { Button } from "@/components/ui";
import { Header } from "@/components/Header";
import { unsplash } from "@/api";
import { useRoute } from "vue-router";
import { ref, Ref } from "vue";
import { useFavoriteStore } from "@/store/favorites";

const route = useRoute();
const favoriteStore = useFavoriteStore();

const photoData: Ref<any> = ref({} as any);

unsplash.photos.get({ photoId: String(route.params.id) }).then((res) => {
	photoData.value = res.response;
});

const toggleFavorite = () => {
	if (favoriteStore.inFavorite(photoData.value.id)) {
		favoriteStore.removeFromFavorite(photoData.value.id);
	} else {
		favoriteStore.addToFavorite({
			id: photoData.value.id,
			url: photoData.value.urls.full,
		});
	}
};

const downloadImage = (download_location: string): void => {
	unsplash.photos
		.trackDownload({
			downloadLocation: download_location,
		})
		.then((res) => {
			window.open(res.response?.url, "_blink");
		});
};
</script>

<template>
	<section
		class="detail"
		:style="{ 'backgroundImage': `url(${photoData.urls.full})` }"
	>
		<Header height="81px"></Header>
		<div class="container">
			<div class="detail__inner">
				<div class="detail__header">
					<div class="detail__header-left">
						<div class="avatar">
							<img :src="photoData.user.profile_image.medium" alt="" />
						</div>
						<div class="user">
							<h4 class="user-name">{{ photoData.user.username }}</h4>
							<p class="user-social">
								@{{
									photoData.user.instagram_username ??
									photoData.user.twitter_username
								}}
							</p>
						</div>
					</div>
					<div class="detail__header-right">
						<div class="btn-icon" @click="toggleFavorite">
							<img
								src="@/assets/icons/heart.svg"
								:class="{
									active: favoriteStore.inFavorite(photoData.id),
								}"
								alt="heart"
							/>
						</div>
						<Button
							icon="download"
							@click="downloadImage(photoData.links.download_location)"
						>
							Downloand
						</Button
						>
					</div>
				</div>
				<div class="detail__image">
					<img :src="photoData.urls?.full" :alt="photoData.alt_description" />
				</div>
			</div>
		</div>
		<div class="overflow"></div>
	</section>
</template>

<style lang="scss" scoped>
.detail {
	width: 100%;
	height: 70vh;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	@include responsive(mobile) {
		background-image: none !important;
	}
	&__inner {
		position: relative;
		margin-top: 43px;
		z-index: 2;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-left {
			display: flex;
			align-items: center;
			.avatar {
				width: 54px;
				height: 54px;
				margin-right: 10px;
				border-radius: 8px;
				border: 1px solid white;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.user {
				color: white;
				&-name {
					font-size: 18px;
					font-weight: 500;
					@include responsive(mobile) {
						color: black;
					}
				}
				&-social {
					font-size: 14px;
					@include responsive(mobile) {
						color: #bdbdbd;
					}
				}
			}
		}
		&-right {
			display: grid;
			grid-template-columns: 50px 1fr;
			grid-column-gap: 20px;
		}
	}
	&__image {
		margin-top: 40px;
		width: 100%;
		overflow: hidden;
		border-radius: 8px;
		img {
			width: 100%;
			max-height: 744px;
			object-fit: contain;
		}
	}
}

.btn-icon {
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	img {
		filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%)
			hue-rotate(111deg) brightness(98%) contrast(103%);
	}
	img.active {
		filter: brightness(0) saturate(100%) invert(26%) sepia(74%) saturate(3274%)
			hue-rotate(348deg) brightness(106%) contrast(84%);
	}
}

.overflow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	@include responsive(mobile) {
		display: none;
	}
}
</style>
