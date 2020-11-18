<template>
  <div class="slider" :hidden="hide">
    <transition-group  tag="div" :name="transitionName" class="slider__group">
      <div v-if="show" :key="current" class="slide">
        <Banner v-if="currentMovie" :movie="currentMovie"/>
      </div>
    </transition-group>
    <div
      class="slider__btn"
      aria-label="Previous slide"
      @click="slide(directions.LEFT)">
      &#10094;
    </div>
    <div class="slider__btn slider__btn--next"
         aria-label="Next slide"
         @click="slide(directions.RIGHT)">
      &#10095;
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { Movie } from '@/services/types';
import Banner from "@/components/Banner.vue";

enum Direction {
  RIGHT = 1,
  LEFT = -1
}

@Component({
  components: {
    Banner
  }
})
export default class Slider extends Vue {
  @Prop({ default: false }) hide!: boolean;
  @Prop({ required: true })  movies!: Movie[];

  current = 0;
  directions = Direction;
  direction = 1;
  transitionName = 'fade';
  show = true;
  currentMovie: Movie | null = null;

  @Watch('movies')
  onMoviesChange(val: Movie[], oldVal: Movie[]) {
      if (val?.length ) this.currentMovie = val[0];
  }

  slide(dir: Direction): void {
    this.direction = dir;
    if (dir === 1) {
      this.transitionName = 'slide-next';
    } else {
      this.transitionName = 'slide-prev';
    }
    const len = this.movies.length;
    this.current = ((this.current + (dir % len) + len)) % len;
    this.currentMovie = this.movies[this.current];
  }
}

</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Crimson+Text");

.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}

/* SLIDES CLASSES */

.blue {
  background: #4a69bd;
}

.red {
  background: #e55039;
}

.yellow {
  background: #f6b93b;
}

.slider {
  width: 100%;
  height: 40vh;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  &__group {
    width: 100%;
    height: 100%;
  }
  &__btn {
    z-index: 10;
    cursor: pointer;
    border: 3px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    position: absolute;
    top: calc(50% - 35px);
    left: 1%;
    transition: transform 0.3s ease-in-out;
    user-select: none;
    font-size: 25px;

    &:hover {
      transform: scale(1.1);
    }
    &--next {
      left: auto;
      right: 1%;
    }
  }
}

.slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-next-enter-active,
  &-next-leave-active {
    transition: transform 0.5s ease-in-out;
  }

  &-next-enter {
    transform: translate(100%);
  }

  &-next-leave-to {
    transform: translate(-100%);
  }

  &-prev-enter-active,
  &-prev-leave-active {
    transition: transform 0.5s ease-in-out;
  }

  &-prev-enter {
    transform: translate(-100%);
  }

  &-prev-leave-to {
    transform: translate(100%);
  }
}
</style>
