import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type"  content='text/html ; charset=utf-8' />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#222831" />
        <meta name="msapplication-TileColor" content="#222831" />
        <meta name="theme-color" content="#222831"></meta>
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Nas" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nas.codes" />
        <meta property="og:image" content="https://nas.codes/logo-og.png" />
        <meta name="twitter:image" content="https://nas.codes/logo-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nas_codes" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
