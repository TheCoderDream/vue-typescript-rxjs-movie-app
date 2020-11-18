<template>
  <div class="search-bar">
    <div class="search-bar__content">
      <i class="search-bar__icon fas fa-search"></i>
      <input
          placeholder="SearchMovies"
          class="search-bar__input"
          :value="value"
          @input="$emit('input', $event.target.value)"
          type="text"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  model: {
    prop: 'value',
    event: 'input'
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  max-width: 120rem;
  margin: 0 auto;
  height: 105px;
  text-align: center;
  position: relative;
  padding: 2.5rem 2rem 0 2rem;
  color: #ffffff;

  &__content {
    width: 50%;
    height: 5.5rem;
    font-size: 3rem;
    display: inline-block;
    background:#353535;
    border-radius: 4rem;
    position: relative;
  }

  &__icon {
    position: absolute;
    left: 2rem;
    top: 1.2rem;
    color: #ffffff;
  }

  &__input {
    font-size: 3.8rem;
    position: absolute;
    left: 7rem;
    top: .7rem;
    border: none;
    background-color: transparent;
    height: 4rem;
    color: white;
  }

  &__input:focus {
    outline: none;
  }
}
</style>
