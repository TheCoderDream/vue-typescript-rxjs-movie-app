<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
name: "Spinner"
}
</script>

<style scoped>

.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2);
}
.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #16d47b;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  margin: 40px auto 80px;

}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
