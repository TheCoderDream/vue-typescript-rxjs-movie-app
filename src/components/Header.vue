<template>
  <div class="header">
    <div class="header__content">
      <router-link to="/" exact>
        <img
          src="https://w7.pngwing.com/pngs/98/367/png-transparent-imdb-cinematographer-television-film-producer-logo-actor.png"
          alt="imdb">
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
}
</script>

<style scoped lang="scss">
.header {
  background-color: #2c3e50;
  padding: 20px 50px;

  & img {
    width: 50px;
    object-fit: cover;
  }
}
</style>
