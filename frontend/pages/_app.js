import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/map.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
