import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppContext } from "./context";

import Navbar from "./Navbar/Navbar";
import Footer from "./Navbar/Footer";
import Home from "./Homepage/Home";
import Product from "./Product/Product";
import About from "./About/About";
import Cart from "./Cart/Cart";
import Products from "./Products/Products";
import Redirect from "./Redirect";
function App() {
  return (
    <AppContext>
      <Router>
        <Switch>
          <Route path={["/cart"]}>
            <section
              style={{
                height: "fit-content",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navbar />
              <Cart />
              <Footer />
            </section>
          </Route>
          <Route path={["/", "/home"]} exact>
            <Navbar />
            <Home />
            <Footer />
          </Route>
          <Route path={["/about"]}>
            <section
              style={{
                height: "fit-content",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navbar />
              <About />
              <Footer />
            </section>
          </Route>
          <Route path={["/products/:id"]}>
            <section
              style={{
                height: "fit-content",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navbar />
              <Product />
              <Footer />
            </section>
          </Route>
          <Route path={["/products"]}>
            <section
              style={{
                height: "fit-content",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Navbar />
              <Products />
              <Footer />
            </section>
          </Route>
          <Route path="/*">
            <section
              style={{
                height: "fit-content",
                minHeight: "100vh",
                minWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Redirect />
            </section>
          </Route>
        </Switch>
      </Router>
    </AppContext>
  );
}

export default App;
