<template>
  <div class="home">
    <Header></Header>
    <Slider :movies="slideMovies"></Slider>
    <SearchBar v-model="searchTerm"></SearchBar>
    <MovieList :movie-list="movieList"/>
    <Spinner v-if="loading" />
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import MovieList from '@/containers/MovieList.vue';
import Slider from '@/components/Slider.vue';
import Header from '@/components/Header.vue';
import MovieService from '@/services/MovieService';
import { Movie } from '@/services/types';
import {from, fromEvent, Subject, Subscription} from "rxjs";
import {debounceTime, delay, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import Spinner from "@/components/Spinner.vue";
import SearchBar from "@/components/SearchBar.vue";

@Component({
  components: {
    SearchBar,
    Spinner,
    Header,
    MovieList,
    Slider,
  },
})
export default class Home extends Vue {
  movieList: Array<Movie> = [];
  slideMovies: Array<Movie> = [];
  moviesClone: Array<Movie> = [];
  currentPage = 1;
  searchTerm = '';
  loading = false;
  scrollFetchDisabled = false;
  subscription: Subscription = new Subscription();
  noResult = false;
  query$ = new Subject<string>();

  @Watch('searchTerm')
  changedQuery(value: string): void {
    console.log(value);
    this.query$.next(value);
  }

  async mounted(): Promise<void> {
    this.loading = true;
    try {
      const data = await MovieService.movieService.getMovies();
      this.movieList = data.data.results;
      this.moviesClone = this.movieList.slice();
      this.slideMovies = this.movieList.slice(0, 5);
      this.currentPage = data.data.page;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }

    this.handleScroll();
    this.handleSearch();
  }

  destroyed(): void {
    this.subscription.unsubscribe();
  }

  handleScroll(): void {
    const sub = fromEvent(window, 'scroll')
        .pipe(
            debounceTime(300),
            filter(() => !this.scrollFetchDisabled && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight))
        ).subscribe(async () => {
          this.loading = true;
          this.scrollFetchDisabled = true;
          try {
            const data = await MovieService.movieService.getMovies(this.currentPage + 1);
            this.currentPage++;
            this.movieList = this.movieList.concat(data.data.results);
          } catch (e) {
            console.log(e);
          } finally {
            this.loading = false;
            this.scrollFetchDisabled = false;
          }
        });
    this.subscription.add(sub);
  }

  handleSearch(): void {
    const sub = this.query$.pipe(
        debounceTime<string>(200),
        map((val: string) => val.trim().toLocaleLowerCase()),
        distinctUntilChanged(),
        filter((value: string) => {
          if (!value || value.length <= 2) {
            this.movieList = this.moviesClone.concat();
            return false;
          }
          return true;
        }),
        tap(() => {
          this.loading = true;
        }),
        switchMap((query: string) => from(MovieService.movieService.searchMovies(query))),
    )
    .subscribe(
        (data: any) => {
          this.loading = false;
          this.movieList = data.data.results;
        }
    );

    this.subscription.add(sub);
  }

}
</script>
