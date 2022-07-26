<template>
  <div>
    <hooper :settings="hooperSettings">
      <slide v-for="sliderContent in sliderContents" :key="sliderContent.id">
        <nuxt-link :to="`/${sliderContent.id}`" class="box">
          <picture v-if="sliderContent.ogimage" class="image">
            <source
              type="image/webp"
              :data-srcset="
                sliderContent.ogimage.url + '?w=600&h=315&fit=crop&q=50&fm=webp'
              "
            />
            <img
              src="@/static/images/loading.gif"
              :data-src="
                sliderContent.ogimage.url + 'w=600&h=315&fit=crop&q=50'
              "
              class="ogimage lazyload"
              alt
              width="630"
              height="1200"
            />
          </picture>
          <div v-if="sliderContent.title" class="overlay">
            <div class="category">
              <span>{{ sliderContent.category.id.toUpperCase() }}</span>
            </div>
            <span class="title" :data-content="bytes(sliderContent.title)">
            </span>
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
      const TRIMCOUNT = 40;
      let r;
      const c = countBytes(text, TRIMCOUNT);
      if (c.targetIndex > TRIMCOUNT) {
        r = text.slice(0, TRIMCOUNT) + '…';
      } else r = text;
      return r;
    },
  },
};
</script>

<style>
@import url('hooper/dist/hooper.css');

.hooper-list {
  border-radius: 5px;
  padding-bottom: 25px;
}
.hooper-pagination {
  padding-top: 0;
  padding-bottom: 2px;
  bottom: 30px;
}
.hooper-indicator {
  width: 0.5em;
  height: 0.5em;
  border-radius: 1em;
  background-color: rgb(165, 165, 165);
}
.hooper-indicator:hover,
.hooper-indicator.is-active {
  background-color: var(--color-main-red);
  transition: background-color 0.3s ease-out;
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
  background-color: var(--color-main-red);
  transition: background-color 0.5s;
}
.hooper-navigation button svg {
  fill: #616269;
}
.hooper-navigation button:hover svg {
  fill: #f5f5f7;
}
.hooper {
  width: 100% !important;
  height: 100% !important;
  min-height: 150px;
  border-radius: 5px;
}

.hooper-track .hooper-slide.is-active.is-current .title {
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.hooper-track .hooper-slide.is-active.is-current .title::after {
  content: attr(data-content);
  position: relative;
  opacity: 0;
  animation: active-title 0.8s 0.7s ease-out forwards;
}

.overlay > .category {
  display: block;
  margin: 8px;
  padding: 4px 8px;
  background: var(--color-main-red);
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
}

@keyframes active-title {
  0% {
    opacity: 0;
    left: 50%;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}

.box {
  position: relative;
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
  min-height: 53px;
  box-shadow: 0 0 4px 0 rgba(20, 22, 29, 0.05),
    0 12px 14px 0 rgba(20, 22, 29, 0.08);
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
  z-index: 999;
  transition: background-color 0.3s ease-out;
}
.box .overlay .ctabtn:hover {
  transition: all 300ms;
  color: white;
  background-color: var(--color-main-red);
}

@media (min-width: 1160px) {
  .box .overlay {
    padding: 10px;
    margin: 20px;
  }

  .box picture img.ogimage {
    width: 820px;
    height: 430px;
    border-radius: 5px;
    object-fit: cover;
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
  img.ogimage {
    width: 740px;
    height: 388px;
    border-radius: 5px;
    object-fit: cover;
  }
}
@media (max-width: 820px) {
  .hooper-navigation button {
    margin: -1em;
    padding: 0.5em;
  }
  .box .overlay {
    position: static;
    padding: 1rem 0.5em;
    margin: 0.5em;
    /* position: absolute;
    left: 0;
    right: 0;
    bottom: -35px;
    padding: 1rem 0.5em;
    margin: 1em; */
  }
  .box .overlay .title {
    font-size: 14px;
  }
  .box .overlay .ctabtn {
    display: none;
  }
  .hooper-pagination {
    padding-top: 0;
    padding-bottom: 2px;
    bottom: 8px;
  }
  img.ogimage {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }
}
</style>
