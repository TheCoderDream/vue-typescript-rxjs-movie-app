<template>
  <div class="movie-info-bar">
    <div class="movie-info-bar__content">
      <div class="movie-info-bar__col">
        <i class="far fa-calendar-times"></i>
        <span class="movie-info-bar__info">Running time: {movie.runtime}</span>
      </div>
      <div class="movie-info-bar__col">
        <i class="fas fa-dollar-sign"></i>
        <span class="movie-info-bar__info">Budget: {movie.budget}</span>
      </div>
      <div class="movie-info-bar__col">
        <img  alt=""/>
        <span class="movie-info-bar__info">Revenue: : {{movie.r}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, } from 'vue-property-decorator';
import { Movie } from '../services/types';

@Component
export default class MovieInfoBar extends Vue{
  @Prop() movie!: Movie;
}
</script>

<style scoped>

</style>
