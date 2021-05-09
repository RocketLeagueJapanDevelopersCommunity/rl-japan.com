<template>
  <div class="wrapper">
    <Header />
    <div class="container"></div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'イベント',
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: -120px;
}
.status {
  font-family: 'Times New Roman', Times, serif;
  font-size: 120px;
  font-weight: bold;
  color: #999;
}
.list {
  background: #eee;
  color: #f44;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}
</style>
