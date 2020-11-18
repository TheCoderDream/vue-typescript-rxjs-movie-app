<template>
  <div
      :style="movieInfoStyle"
      class="movie-info">
    <div class="movie-info__content">
      <div class="movie-info__thumb">
        <img
        :src="moviePoster"
        alt=""/>
      </div>
      <div class="movie-info__text">
        <h1>{{movie.title}}</h1>
        <h3>PLOT</h3>
        <p>{{movie.overview}}</p>
        <h3>IMDB RATING</h3>
        <div class="movie-info__rating">
          <meter min="0" max="100" optimum="100" low="40" high="70"
                 :value="movie.vote_average *10"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MovieService from '../services/MovieService';
import {Movie} from '../services/types';

@Component
export default class MovieInfo extends Vue {
  @Prop() movie!: Movie;

  get movieInfoStyle() {
    return {
      backgroundImage: 'url(' + MovieService.movieService.getMainImagePath(this.movie.backdrop_path)+ ')'
    }
  }

  get moviePoster(): string {
    return MovieService.movieService.getMoviePoster(this.movie.poster_path);
  }
}
</script>

<style scoped lang="scss">
.movie-info {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 60rem;
  padding: 4rem 2rem;


&__content {
   max-width: 120rem;
   width: 100%;
   height: 100%;
   margin: 0 auto;
   background: rgba(0, 0, 0, 0.7);
   position: relative;
   display: flex;
   flex-direction: row;
 }

&__thumb {
   height: 100%;
   overflow: hidden;
   flex-basis: 25%;
 }

&__text {
   position: relative;
   height: 100%;
   width: auto;
   padding: 40px;
   color: #fff;
   overflow: hidden;
   flex-basis: 75%;

h1 {
  font-size: 3.4rem;
}

h3 {
  font-size: 1.6rem;
  line-height: 0;
  margin: 3rem 0;
}

p {
  font-size: 1.8rem;
  line-height: 2.6rem;
}
}

&__rating {
   width: 25rem;
   height: 2rem;
   margin-top: 2rem;
 }


}

meter::-webkit-meter-bar {
  background: #FFF;
  width: 200px;
}

meter::-webkit-meter-optimum-value {
  background: linear-gradient(to bottom, #16d47b);
}

meter::-webkit-meter-suboptimum-value {
  background: linear-gradient(to bottom, #fbb450);
}

meter::-webkit-meter-even-less-good-value {
  background: linear-gradient(to bottom, #ee5f5b);
}
</style>
