<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide><SliderEvent /></slide>
      <slide><SliderEvent /></slide>
      <slide><SliderEvent /></slide>
      <slide><SliderEvent /></slide>
      <slide><SliderEvent /></slide>

      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination,
} from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  data() {
    return {
      hooperSettings: {
        autoPlay: true,
        infiniteScroll: true,
        mouseDrag: false,
        touchDrag: false,
        playSpeed: 5000,
        transition: 500,
      },
    };
  },
};
</script>

<style>
.hooper-list {
  border-radius: 5px;
}
.hooper-indicator {
  width: 40px;
  height: 6px;
  border-radius: 2px;
  background-color: rgba(20, 20, 20, 0.25);
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: #f5f5f7;
  transition: background-color 0.5s;
}
.hooper-navigation button {
  padding: 1em;
  height: 100%;
  background-color: rgba(230, 230, 230, 0.15);
}
.hooper-navigation button:hover {
  background-color: rgba(230, 230, 230, 0.5);
  color: #f5f5f7;
  transition: background-color 0.5s;
}
.hooper-navigation button:hover svg {
  fill: #fff;
}
</style>

<style scoped>
.hooper {
  height: 250px;
}
</style>
