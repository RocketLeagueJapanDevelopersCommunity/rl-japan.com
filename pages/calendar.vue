<template>
  <div class="wrapper">
    <Header />
    <div class="container">
      <h1>大会カレンダー</h1>
      <div class="grid">
        <Calendar :events="events" />
      </div>
      <ul>
        <li v-for="event in events" :key="event.id" class="list">
          <div class="title">【{{ event.title || '(No title)' }}】</div>
          <div class="who">主催: {{ event.who || '(No name)' }}</div>
          <div class="who">
            日時: {{ formatDate(event.start_dt) || '(未定)' }}
          </div>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  async asyncData({ params, payload, $config }) {
    const url = `https://api.teamup.com/${$config.calendarKey}`;
    const resEvent = await axios.get(`${url}/events`, {
      headers: {
        'Teamup-Token': $config.calendarApiKey,
      },
      params: {
        startDate: '2021-05-01',
        endDate: '2021-05-31',
      },
    });
    return {
      events: resEvent.data.events,
    };
  },
  computed: {
    formatDate() {
      return function (date) {
        return dayjs(date).format('YYYY/MM/DD HH:mm');
      };
    },
  },
  head() {
    return {
      title: 'カレンダー',
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 20px;
  padding: 10px 20px;
  border-radius: 5px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: -120px;
  margin: 16px;
}
.status {
  font-family: 'Times New Roman', Times, serif;
  font-size: 120px;
  font-weight: bold;
  color: #999;
}
.list {
  background-color: #eee;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}
.grid {
  width: 100%;
}
@media screen and (min-width: 480px) {
  /* for iPhone Landscape (iPhone 横) */
  .fc {
    padding: 0;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* for iPad  */
  .fc {
    padding: 0 6rem;
  }
}
@media screen and (min-width: 1024px) {
  /* for PC */
  .fc {
    padding: 0 12rem;
  }
}
</style>
