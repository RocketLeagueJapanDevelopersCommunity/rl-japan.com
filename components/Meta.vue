<template>
  <div>
    <div class="meta">
      <span v-if="category" :class="`category ${category.id}`">
        {{ category.name }}
      </span>
      <span class="timestamp">
        <img src="/images/icon_clock.svg" alt />
        <time :datetime="$dayjs(createdAt).format('YYYY-MM-DD')">
          {{ $dayjs(createdAt).format('YYYY年MM月DD日') }}
        </time>
      </span>
      <span v-if="author" class="author">
        <picture v-if="author.image">
          <source
            type="image/webp"
            :data-srcset="
              author.image.url + '?w=100&h=100&&q=50&fm=webp&fit=crop&q=0'
            "
          />
          <img
            src="@/static/images/loading.gif"
            :data-src="author.image.url + '?w=100&h=100&q=50&fit=crop&q=0'"
            class="ogimage lazyload"
            alt
            :width="author.image.width"
            :height="author.image.height"
          />
        </picture>
        {{ author.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    createdAt: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: false,
      default: undefined,
    },
    category: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
};
</script>

<style scoped>
@media (min-width: 600px) {
  .meta {
    padding: 10px 0 0;
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .category {
    position: relative;
    display: inline-block;
    padding: 0.25rem 0.5rem 0.25rem 1.5rem;
    color: #616269;
    border-radius: 5px;
    margin-right: 8px;
  }
  .category:before {
    position: absolute;
    top: calc(50% - 8px);
    left: 0px;
    width: 16px;
    height: 16px;
    content: '';
    border-radius: 50%;
    background: #e9433b;
  }
  /* categories */
  .category.tips::before {
    background: var(--cat-tips);
  }
  .category.tournament::before {
    background: var(--cat-tournament);
  }
  .category.update::before {
    background: var(--cat-update);
  }
  .category.information::before {
    background: var(--cat-information);
  }
  .category.rlcs::before {
    background: var(--cat-rlcs);
  }
  .category.interview::before {
    background: var(--cat-interview);
  }
  .category.world-topics::before {
    background: var(--cat-world-topics);
  }
  .category.offline-event::before {
    background: var(--cat-offline-event);
  }
  /* categories end */

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;

    margin-right: 20px;
    white-space: nowrap;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }

  .author {
    display: flex;
    align-items: center;
    justify-items: center;
    color: #616269;
    white-space: nowrap;

    picture {
      display: flex;
      align-items: center;
      justify-items: center;
      white-space: nowrap;
    }

    img {
      margin-right: 6px;
      height: 32px;
      width: 32px;
      object-fit: contain;
      border-radius: 50%;
    }
  }
}
@media (max-width: 600px) {
  .meta {
    padding: 4px 0 0;
    font-size: 14px;

    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .category {
    position: relative;
    display: inline-block;
    padding: 0.25rem 0.5rem 0.25rem 1.5rem;
    color: #616269;
    border-radius: 5px;
    margin-right: 10px;
  }
  .category:before {
    position: absolute;
    top: calc(50% - 7px);
    left: 4px;
    width: 14px;
    height: 14px;
    content: '';
    border-radius: 50%;
    background: #e9433b;
  }

  /* categories */
  .category.tips::before {
    background: var(--cat-tips);
  }
  .category.tournament::before {
    background: var(--cat-tournament);
  }
  .category.update::before {
    background: var(--cat-update);
  }
  .category.information::before {
    background: var(--cat-information);
  }
  .category.rlcs::before {
    background: var(--cat-rlcs);
  }
  .category.interview::before {
    background: var(--cat-interview);
  }
  .category.world-topics::before {
    background: var(--cat-world-topics);
  }
  .category.offline-event::before {
    background: var(--cat-offline-event);
  }
  /* categories end */

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #616269;
    margin-right: 20px;
    white-space: nowrap;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;

    img {
      margin-right: 6px;
      height: 20px;
    }
  }

  .author {
    display: flex;
    align-items: center;
    justify-items: center;
    color: #616269;
    white-space: nowrap;

    picture {
      display: flex;
      align-items: center;
      justify-items: center;
      white-space: nowrap;
    }

    img {
      margin-right: 6px;
      height: 26px;
      width: 26px;
      object-fit: contain;
      border-radius: 50%;
    }
  }
}
</style>
