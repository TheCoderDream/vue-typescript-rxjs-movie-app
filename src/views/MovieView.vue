<template>
  <div class="movie-view">
    <Header/>
    <div class="movie-detail" v-if="movieDetail">
      <MovieInfo :movie="movieDetail"/>
      <h1 class="movie-detail__heading">Actors</h1>
      <div class="row">
        <div class="col" v-for="actor in actors">
          <Actor :actor="actor"/>
        </div>
      </div>
    </div>
    <spinner v-else></spinner>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieService from '@/services/MovieService';
import { Cast } from "@/services/types";
import Spinner from "@/components/Spinner.vue";
import MovieInfo from "@/components/MovieInfo.vue";
import Actor from "@/components/Actor.vue";
import Header from "@/components/Header.vue";
@Component({
  components: {Header, Actor, MovieInfo, Spinner}
})
export default class MovieDetail extends Vue {
  movieDetail: any;
  actors: Cast[] = [];

  async mounted(): Promise<void> {
    const movieId = +this.$route.params.movieId as number;
    try {
      const [movieResult, actorsResult] = await Promise.all(
          [
            MovieService.movieService.getMovie(movieId),
            MovieService.movieService.getActors(movieId)
          ]
      );
      this.movieDetail = movieResult.data;
      this.actors = actorsResult.data.cast;
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.movie-detail {
  margin-bottom: 10rem;

  &__heading {
    margin-top: 10rem;
    font-size: 3rem;
    text-align: center;
  }
}

.actor-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
}

.actor-col {
}
</style>
