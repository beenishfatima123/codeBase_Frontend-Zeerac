import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routing from "./routing";
import { persistedStore, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
//tostify css
import "react-toastify/dist/ReactToastify.css";

//slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// lightbox css
import "react-image-lightbox/style.css";

//fonts
import "./assets/fonts/HelveticaNeueLTStd-Roman.otf";
import "./assets/fonts/HelveticaLTStd-Light.otf";
import "./assets/fonts/HelveticaLTStd-Bold.otf";
import ScrollToTop from "./utils/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ToastContainer />
        <Routing />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
