<template>
  <div class="row">
    <div class="col" v-for="movie in movieList" :key="movie.id">
      <MovieListItem :movie="movie"></MovieListItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MovieListItem from '@/components/MovieListItem.vue';
import { Movie } from '@/services/types';

@Component({
  components: {
    MovieListItem,
  },
})
export default class MovieList extends Vue {
  @Prop() movieList!: Array<Movie>;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
