<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide v-for="sliderContent in sliderContents" :key="sliderContent.id">
        <nuxt-link :to="`/${sliderContent.id}`" class="box">
          <picture v-if="sliderContent.ogimage" class="image">
            <source
              type="image/webp"
              :data-srcset="
                sliderContent.ogimage.url + '?w=600&h=315&fit=crop&fm=webp'
              "
            />
            <img
              :data-src="sliderContent.ogimage.url + 'w=600&h=315&fit=crop'"
              class="ogimage lazyload"
              alt
            />
          </picture>
          <div class="overlay">
            <div class="title">
              {{ bytes(sliderContent.title) }}
            </div>
            <div class="ctabtn">詳しく見る</div>
          </div>
        </nuxt-link>
      </slide>

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
import countBytes from '@/plugins/count-bytes.js';

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination,
  },
  props: {
    sliderContents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      hooperSettings: {
        autoPlay: true,
        infiniteScroll: true,
        mouseDrag: true,
        touchDrag: false,
        playSpeed: 5000, // 5000
        transition: 300,
        trimWhiteSpace: true,
      },
    };
  },
  methods: {
    bytes(text) {
      let r;
      const c = countBytes(text);
      if (c > 40) {
        r = text.slice(0, c / 2) + '…';
      } else r = text;
      return r;
    },
  },
};
</script>

<style>
.hooper-list {
  border-radius: 5px;
  padding-bottom: 25px;
}
.hooper-indicator {
  width: 0.5em;
  height: 0.5em;
  border-radius: 1em;
  background-color: #eee;
  margin-bottom: 30px;
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: #e9433b;
  transition: background-color 0.5s;
}
.hooper-navigation button {
  border-radius: 5px;
  margin: 0 1em;
  padding: 1em;
  color: #616269;
  background-color: #f5f5f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.hooper-navigation button:hover {
  background-color: #e9433b;
  transition: background-color 0.5s;
}
.hooper-navigation button svg {
  fill: #616269;
}
.hooper-navigation button:hover svg {
  fill: #f5f5f7;
}
.hooper {
  height: 100%;
  border-radius: 5px;
}
.box {
  position: relative;
}
.box picture .ogimage {
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.box .overlay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.box .overlay .title {
  font-size: 18px;
}
.box .overlay .ctabtn {
  min-width: 100px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.box .overlay .ctabtn:hover {
  transition: all 300ms;
  color: white;
  background-color: #e9433b;
}
@media (min-width: 1160px) {
  .box .overlay {
    padding: 10px;
    margin: 20px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .box .overlay {
    padding: 0.5em;
    margin: 1em;
  }
  .box .overlay .title {
    font-size: 16px;
  }
  .box .overlay .ctabtn {
    display: block;
  }
}
@media (max-width: 820px) {
  .hooper-navigation button {
    margin: -1em;
    padding: 0.5em;
  }
  .box .overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -35px;
    padding: 1rem 0.5em;
    margin: 1em;
  }
  .box .overlay .title {
    font-size: 14px;
  }
  .box .overlay .ctabtn {
    display: none;
  }
  .hooper-indicator {
    margin-bottom: 0;
  }
}
</style>
