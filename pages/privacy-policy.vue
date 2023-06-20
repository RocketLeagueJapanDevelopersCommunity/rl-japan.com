<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="container">
      <h1>プライバシーポリシー</h1>

      <h2>第三者に送信される情報</h2>
      <h3>▼ 広告の配信について</h3>
      <p>
        当サイトはGoogle及びGoogleのパートナー（第三者配信事業者）の提供する広告を設置しております。その広告配信にはCookieを使用し、当サイトやその他のサイトへの過去のアクセス情報に基づいて広告を配信します。
        Google が広告
        Cookieを使用することにより、当サイトや他のサイトにアクセスした際の情報に基づいて、Googleやそのパートナーが適切な広告を表示しています。お客様はGoogleアカウントの
        <a
          href="https://adssettings.google.com/u/0/authenticated"
          target="_blank"
        >
          広告設定ページ
        </a>
        で、パーソナライズ広告を無効にできます。また
        <a href="https://aboutads.info" target="_blank">aboutads.info</a>
        のページにアクセスして頂き、パーソナライズ広告掲載に使用される第三者配信事業者のCookieを無効にできます。
        その他、Googleの広告におけるCookieの取り扱い詳細については、
        <a href="https://policies.google.com/technologies/ads" target="_blank">
          Googleのポリシーと規約ページ
        </a>
        をご覧ください。
      </p>
      <h3>▼ Google Analyticsについて</h3>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Google
        Analytics」を使用しています。このGoogle
        Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
        >
          Google Analyticsサービス利用規約
        </a>
        のページや
        <a href="https://policies.google.com/technologies/ads?hl=ja">
          Googleポリシーと規約ページ
        </a>
        をご覧ください。
      </p>

      <h2>個人情報やその他の表示</h2>

      <h3>▼ 個人情報の収集と利用について</h3>
      <p>
        当ブログでは、コメントの際に登録された名前やメールアドレス、IPアドレスを収集します。これらの情報は、コメントの管理や返信の通知、ブログの運営改善に利用されます。これらの情報は、ユーザーが自発的に提供しない限り収集されません。
      </p>
      <h3>▼ 個人情報の管理について</h3>
      <p>
        当ブログは、ユーザーの個人情報を適切に管理します。個人情報を第三者に開示することはありませんが、法的要求、サイトのポリシー遵守、自身の権利や財産、サイトユーザーの保護を目的とした場合を除きます。
      </p>
      <h3>▼ 収益化について</h3>
      <p>
        当ブログは個人で運営しており、営利目的ではありませんが、Google
        AdSenseを利用することで収益が発生する場合があります。広告収益は、サイトの運営コストの補填や改善のために使用されます。
      </p>
      <h3>▼ プライバシーポリシーの改訂について</h3>
      <p>
        当ブログは、法律やその他の規則の変更、サイトの改善や更新に伴い、プライバシーポリシーを改訂することがあります。改訂があった場合は、このページで通知します。
      </p>
      <br />
      <br />
      <p>令和5年6月16日 策定</p>
    </div>
    <Footer class="pp_footer" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'プライバシーポリシー'
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.container {
  max-width: 800px;
  background: white;
  margin: 40px 0 20px;
  padding: 10px 20px;
  border-radius: 5px;
}
h1 {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 10px;
}
h2 {
  font-size: 24px;
  background-color: #f0f0f0;
  padding: 10px;
  margin: 0 0 10px;
}
h3 {
  font-size: 18px;
  margin: 0 0 10px;
}
p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 10px;
}

ol {
  list-style: decimal inside;
  margin-left: 8px;
}

a {
  color: blue;
  text-decoration: underline;
}

a:hover {
  color: red;
}

.pp_footer {
  width: 100%;
}
</style>
