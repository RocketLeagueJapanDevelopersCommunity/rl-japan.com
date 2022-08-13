<template>
  <div class="post" v-html="body"></div>
</template>

<script>
export default {
  props: {
    body: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
@media (min-width: 600px) {
  .post {
    & >>> h1 {
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      font-size: 2em;
      font-weight: bold;
      margin: 40px 0 20px;
      background-color: var(--color-bg-purple-light);
      padding: 10px 20px;
      border-radius: 5px;
      padding-left: 30px;
    }

    & >>> h2 {
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      font-size: 1.5em;
      font-weight: bold;
      margin: 40px 0 16px;
      border-bottom: 2px solid var(--color-bg-purple-light);
    }

    & >>> h3 {
      margin-block-start: 1em;
      margin-block-end: 1em;
      font-size: 1.17em;
      font-weight: bold;
      margin: 30px 0 12px;
    }

    & >>> h4 {
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      font-size: 1em;
      font-weight: bold;
      margin: 24px 0 10px;
    }

    & >>> h5 {
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      font-size: 0.83em;
      font-weight: bold;
      margin: 20px 0 6px;
    }

    & >>> p {
      line-height: 1.8;
      letter-spacing: 0.2px;

      & > code {
        color: var(--color-pink);
        background-color: var(--color-gray-light);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        margin: 0 2px;
        padding: 2px 4px;
      }
    }

    & >>> em {
      font-style: italic;
    }

    & >>> ol {
      list-style-type: decimal;
      list-style-position: inside;

      & > li {
        line-height: 2;
      }
    }

    & >>> ul > li {
      line-height: 2;
      margin-left: 20px;

      &::before {
        content: '▸';
        padding-right: 8px;
      }

      & > ul > li {
        &::before {
          content: '◦';
        }

        & > ul > li {
          &::before {
            content: '▪';
          }
        }
      }
    }

    & >>> img {
      max-width: 100%;
      margin: 40px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    & >>> a {
      color: var(--color-purple);
      text-decoration: underline;
      word-wrap: break-word;
      word-break: break-all;
    }

    & >>> strong {
      /* background: linear-gradient(transparent 75%, #ecafac 75%); */
      font-weight: bold;
    }

    & >>> blockquote {
      background: url('/images/icon_quote.svg') no-repeat 20px 10px, #eee;
      background-size: 36px 36px;
      padding: 50px 20px 20px;
      margin: 20px 0;
      border-radius: 3px;
    }

    & >>> pre {
      border-radius: 3px;
      margin: 20px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;

      & > code {
        padding: 10px 20px;
        border-radius: 5px;
      }
    }
  }
}
@media (max-width: 600px) {
  .post {
    font-size: 14px;

    & >>> h1 {
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      font-size: 2em;
      font-weight: bold;
      margin: 40px 0 20px;
      background-color: var(--color-bg-purple-light);
      padding: 10px 20px;
      border-radius: 5px;
    }

    & >>> h2 {
      position: relative;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      font-size: 1.5em;
      font-weight: bold;
      margin: 36px 0 16px;
      border-bottom: 2px solid var(--color-bg-purple-light);
    }

    & >>> h3 {
      margin-block-start: 1em;
      margin-block-end: 1em;
      font-size: 1.17em;
      font-weight: bold;
      margin: 30px 0 12px;
    }

    & >>> h4 {
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      font-size: 1em;
      font-weight: bold;
      margin: 24px 0 10px;
    }

    & >>> h5 {
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      font-size: 0.83em;
      font-weight: bold;
      margin: 20px 0 6px;
    }

    & >>> p {
      line-height: 1.8;
      letter-spacing: 0.2px;

      & > code {
        color: var(--color-pink);
        background-color: var(--color-gray-light);
        border: 1px solid var(--color-border);
        border-radius: 3px;
        margin: 0 2px;
        padding: 2px 4px;
      }
    }

    & >>> em {
      font-style: italic;
    }

    & >>> ol {
      list-style-type: decimal;
      list-style-position: inside;

      & > li {
        line-height: 2;
      }
    }

    & >>> ul > li {
      line-height: 2;
      margin-left: 20px;

      &::before {
        content: '▸';
        padding-right: 8px;
      }

      & > ul > li {
        &::before {
          content: '◦';
        }

        & > ul > li {
          &::before {
            content: '▪';
          }
        }
      }
    }

    & >>> img {
      max-width: 100%;
      margin: 40px 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    & >>> a {
      color: var(--color-main-red);
      text-decoration: underline;
      word-wrap: break-word;
      word-break: break-all;
    }

    & >>> strong {
      /* background: linear-gradient(transparent 75%, #ecafac 75%); */
      font-weight: bold;
    }

    & >>> blockquote {
      background: url('/images/icon_quote.svg') no-repeat 20px 10px, #eee;
      background-size: 36px 36px;
      padding: 50px 20px 20px;
      margin: 20px 0;
      border-radius: 3px;
    }

    & >>> pre {
      border-radius: 3px;
      margin: 20px 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;

      & > code {
        padding: 8px 16px;
        border-radius: 3px;
      }
    }
  }
}
</style>
