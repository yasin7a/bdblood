import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/map.css";
import { Toaster } from "react-hot-toast";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import NextNProgress from "nextjs-progressbar";
function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="red" height={2} options={{ showSpinner: false }} />
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  let isAuthorized = ctx.pathname === "/login" || ctx.pathname === "/register";
  const { authToken } = parseCookies(ctx);
  if (authToken) {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      isAuthorized && redirectUser(ctx, "/");
    } catch (error) {
      console.log(error);
      destroyCookie(ctx, "authToken");
      redirectUser(ctx, "/login");
    }
  }
  return { pageProps };
};
export default MyApp;
