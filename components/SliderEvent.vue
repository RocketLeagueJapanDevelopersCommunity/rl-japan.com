<template>
  <div class="layer">
    <div class="box">
      <div class="title">Suncom Cup Tier2 vol.7</div>
      <div class="description">
        <p>国内唯一？のRocket League 2V2（ダブルス）大会</p>
      </div>
      <div class="footer">
        <button class="button">詳細を見る</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('https://pbs.twimg.com/media/E0TV1ceVEAAIQ36?format=jpg&name=large');
  background-size: 100% 100%;
  text-align: center;
}

.box {
  backdrop-filter: blur(40px);
  background-color: rgba(200, 200, 200, 0.8);
}

.button {
  padding: 0.4em 0.8em;
  margin: 1em 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-width: 0;
  border-radius: 0.25em;
  cursor: pointer;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.75);
  transition: background-color 0.5s;
}

.title {
  color: #f5f5f7;
  font-size: 3em;
}

.description {
  color: #f5f5f7;
  font-size: 1em;
}
</style>
