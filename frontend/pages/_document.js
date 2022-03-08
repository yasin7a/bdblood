import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="manifest" href="/manifest.json" />

          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta name="theme-color" content="#070724" />
          <meta name="author" content="noteact" />
          <meta name="title" content="Noteact | Note App" />
          <meta
            name="description"
            content="100% free PWA note App website to store your plan. easy to use and also can be install in your phone"
          />
          <meta
            name="keywords"
            content="notes, notes, app, notebook, note app, book, business, startup, write, keep, store, 100% free, no pricing, noteact"
          />
          <link rel="canonical" href="https://noteact.lebriact.com/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Noteact | Note App" />
          <meta
            property="og:description"
            content="100% free PWA note App website to store your plan. easy to use and also can be install in your phone"
          />
          <meta property="og:image" content="/img/og.png" />
          <meta property="og:url" content="https://noteact.lebriact.com/" />
          <meta property="og:site_name" content="noteact" />

          <meta name="twitter:domain" content="https://noteact.lebriact.com/" />
          <meta name="twitter:title" content="Noteact | Note App" />
          <meta
            name="twitter:description"
            content="100% free PWA note App website to store your plan. easy to use and also can be install in your phone"
          />
          <meta name="twitter:image" content="/img/og.png" />
          <meta name="twitter:site" content="@noteact" />
          <meta name="twitter:creator" content="@noteact" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="application-name" content="noteact" />
          <meta name="apple-mobile-web-app-title" content="noteact" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" /> */}

          <link rel="icon" href="/img/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-200 font-Roboto">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
