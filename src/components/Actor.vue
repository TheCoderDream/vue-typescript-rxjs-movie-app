<template>
  <div class="actor">
    <img class="actor__thumb" :src="actorPoster"/>
    <span class="actor__name">{{actor.name}}</span>
    <span class={'actor__character'}>{{actor.character}}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MovieService from "../services/MovieService";
import { Cast } from "../services/types";

@Component
export default class Actor extends Vue {
  @Prop() actor: Cast;

  get actorPoster(): string {
    return MovieService.movieService.getMoviePoster(this.actor.profile_path);
  }
}
</script>

<style scoped lang="scss">
.actor {
  color: #ffffff;
  max-width: 19rem;
  height: 30rem;
  box-shadow: 1rem 2rem 5rem rgba(0,0,0,0.2);
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  transition: all .3s;

  &__thumb {
    width: 100%;
    height: 100%;
    transform: scale(1.2);
    transition: all .3s;
  }

  &__name {
    font-size: 1.5rem;
    margin: 1rem 2rem;
    position: absolute;
    top: 2rem;
    right: -20rem;
    transition: all .3s;
  }

  &__character {
    font-size: 1rem;
    margin: 0 2rem 1rem 2rem;
    position: absolute;
    bottom: -3rem;
    left: 0;
    transition: all .3s;
  }

  &:hover{
    top: -1rem;
  }

  &:hover &__thumb {
    transform: scale(1);
    filter: blur(3px);
  }
  &:hover &__name {
    right: 1rem;
  }

  &:hover &__character {
    bottom: 1rem;
  }
}
</style>
