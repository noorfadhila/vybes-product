import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./containers/footer";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import ProductList from "./pages/protected/products/list";
import ProductEdit from "./pages/protected/products/edit";

function App() {
  const logOut = () => {
    dispatch(logout());
  };
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <>
      <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-between">
          
          <div className="navbar-nav mr-auto">
            <Link to={"/"} className="navbar-brand">
              <img src="https://getvybes.co/wp-content/uploads/2021/11/vybes_white_text_center-1200x364.png" alt="logo" width="80" />
            </Link>
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/product/list"} className="nav-link">
                Product
              </Link>
            </li>
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.userName}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
      <div className="d-flex" id="wrapper">
        <div className="container-fluid container-content px-5">
          <Routes>
            <Route exact path="/register" element={ <Register /> } />

            <Route exact path="/login" element={ <Login /> } />
            <Route exact path="/product/edit" element={  <ProductEdit /> } />
            <Route exact path="/product/list" element={  <ProductList /> } />
            <Route exact path="/" element={ <Home /> } />
          </Routes>
        </div>
      </div>

      </Router>
      <Footer />
    </>
  );
}

export default App;
