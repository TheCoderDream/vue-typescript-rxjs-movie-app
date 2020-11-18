<template>
  <div class="movie" @click="goToDetail">
    <span class="movie__rate">
      <i class="far fa-star" style="color: white; font-size: 1.2rem"></i>
      {{movie.vote_average}}
    </span>
    <div class="movie__genres">{{getGenreListAsString(movie.genre_ids)}}</div>
    <img class="movie__image" :src="getMoviePoster(movie.poster_path)" alt="movie image"/>
    <p class="movie__overview">{{movie.overview | overviewShorter}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
import MovieService from '@/services/MovieService';
import { Movie } from '@/services/types';

@Component
export default class MovieListItem extends Vue {
  @Prop({ required: true }) movie!: Movie;

  getGenreListAsString(genres: number[]): string {
    return MovieService.movieService.getGenreListAsString(genres);
  }

  getMoviePoster(value: string): string {
    return MovieService.movieService.getMoviePoster(value);
  }

  goToDetail(): void {
    this.$router.push(`/movies/${this.movie.id}`);
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.movie {
  display: block;
  position: relative;
  transition: all .2s;
  overflow: hidden;
  font-size: 1.2rem;
  cursor: pointer;
  &__image {
    width: 50rem;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    transition: all 0.3s;
  }

  &__genres {
    position: absolute;

    top: 1rem;
    right: -16rem;
    background-color: rgba(lightgray, 1);
    padding: 1rem 1.5rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    opacity: 0;
    transition: all .3s;
  }

  &__overview {
    position: absolute;
    bottom: -20rem;
    background-color: rgba(lightgray, 1);
    padding: 1rem 1.5rem;
    transition: all .3s;
    left: 0;

    i {
      color: white; font-size: 1.2rem
    }
  }

  &__rate {
    position: absolute;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    top: 1rem;
    left: -10rem;
    background-color: gold;
    padding: 1rem 1.5rem;
    color: white;
    transition: all .3s;
  }

  &:hover {
    top: -1rem;
    outline-offset: .4rem;
    outline: 3px solid gray;
  }

  &:hover &__genres {
    right: 0;
    opacity: 1;
  }

  &:hover &__overview {
    bottom: 0;
  }

  &:hover &__rate {
    left: 0;
  }
}
</style>
