import { Routes, Route } from "react-router-dom";
import Loadable from 'react-loadable';
import "./scss/app.scss";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/MainLayout";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from "./redux/store";
import { Provider } from "react-redux";

const persistor = persistStore(store);

const CartPage = Loadable({
  loader: () => import("./pages/CartPage"),
  loading: () => { return <div>Идет загрузка...</div>; },
});

const ProductInfo = Loadable({
  loader: () => import("./pages/ProductInfo"),
  loading: () => { return < div > Идет загрузка...</div> },
});

const NotFoundPage = Loadable({
  loader: () => import("./pages/NotFoundPage"),
  loading: () => { return < div > Идет загрузка...</div> },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product/:id" element={<ProductInfo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
