import "../styles/globals.css";
import Navbar from "../components/Navbar";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: process.env.NEXT_PUBLIC_DOMAIN_URL,
          siteName: process.env.NEXT_PUBLIC_NAME,
        }}
      />
      <NextNProgress />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
