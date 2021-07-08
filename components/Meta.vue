<template>
  <div>
    <div class="meta">
      <span v-if="category" :class="`category ${category.id}`">{{
        category.name
      }}</span>
      <span class="timestamp">
        <img src="/images/icon_clock.svg" alt />
        <time :datetime="$dayjs(createdAt).format('YYYY-MM-DD')">
          {{ $dayjs(createdAt).format('YYYY/MM/DD') }}
        </time>
      </span>
      <span v-if="author" class="author">
        <img src="/images/icon_author.svg" alt />
        {{ author }}
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
      type: String,
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
    flex-wrap: wrap;
  }

  .category {
    position: relative;
    display: inline-block;
    padding: 0.25rem 0.5rem 0.25rem 1.5rem;
    color: #616269;
    border-radius: 5px;
    background: white;
    margin-right: 20px;
  }
  .category:before {
    position: absolute;
    top: calc(50% - 5px);
    left: 10px;
    width: 10px;
    height: 10px;
    content: '';
    border-radius: 50%;
    background: #e9433b;
  }
  .category.tournament::before {
    background: var(--cat-tournament);
  }
  .category.update::before {
    background: var(--cat-update);
  }
  .category.interview::before {
    background: var(--cat-interview);
  }
  .category.notes::before {
    background: var(--cat-notes);
  }
  .category.tips::before {
    background: var(--cat-tips);
  }
  .category.offline-event::before {
    background: var(--cat-offline-event);
  }
  .category.information::before {
    background: var(--cat-information);
  }

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
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;

    img {
      margin-right: 6px;
      height: 16px;
    }
  }
}
@media (max-width: 600px) {
  .meta {
    padding: 4px 0 0;
    font-size: 14px;
  }

  .category {
    position: relative;
    display: inline-block;
    padding: 0.25rem 0.5rem 0.25rem 1.5rem;
    color: #616269;
    border-radius: 5px;
    background: white;
    margin-right: 20px;
  }
  .category:before {
    position: absolute;
    top: calc(50% - 5px);
    left: 10px;
    width: 10px;
    height: 10px;
    content: '';
    border-radius: 50%;
    background: #e9433b;
  }
  .category.tournament::before {
    background: var(--cat-tournament);
  }
  .category.update::before {
    background: var(--cat-update);
  }
  .category.interview::before {
    background: var(--cat-interview);
  }
  .category.notes::before {
    background: var(--cat-notes);
  }
  .category.tips::before {
    background: var(--cat-tips);
  }
  .category.offline-event::before {
    background: var(--cat-offline-event);
  }
  .category.information::before {
    background: var(--cat-information);
  }

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
      height: 14px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #616269;
    white-space: nowrap;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;

    img {
      margin-right: 6px;
      height: 14px;
    }
  }
}
</style>
