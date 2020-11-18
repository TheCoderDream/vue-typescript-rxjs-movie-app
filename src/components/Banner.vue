<template>
  <div class="banner" :style="bannerStyle">
    <div class="banner__content">
      <div class="banner__text-container">
        <h1 class="banner__heading">{{movie.title}}</h1>
        <p class="banner__overview">{{movie.overview}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MovieService from '@/services/MovieService';
import { Movie } from '@/services/types';

@Component
export default class Banner extends Vue {
  @Prop() movie!: Movie;
  get bannerStyle() {
    return {
      backgroundImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 39%,rgba(0,0,0,0) 41%,rgba(0,0,0,0.65) 100%), url('+ MovieService.movieService.getMainImagePath(this.movie.backdrop_path)+') '
    }
  }
}
</script>

<style scoped lang="scss">
.banner  {
  background-size: 100%, cover !important;
  background-position: center, center !important;
  height: 100%;
  width: 100%;
  position: relative;

&__content {
   max-width: 120rem;
   margin: 0 auto;
   padding: 2rem;
   z-index: 100;
 }

&__text-container {
   max-width: 70rem;
   position: absolute;
   bottom: 4rem;
   margin-right: 2rem;
   min-height: 10rem;
   background: rgba(0, 0, 0, 0.0);
   color: #fff;
 }

&__heading {
   font-size:4.8rem;
 }

&__overview {
   font-size: 2.2rem;
   line-height: 2.6rem;
 }


}
</style>
