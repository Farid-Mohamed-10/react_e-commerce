import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import './Navbar.css';
import { Link, NavLink } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, LOGOUT } from "../../../Api/Api";
import StringSlice from "../../../Helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../Skeleton/SkeletonShow";
import { Cart } from "../../../Context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtns from "../Btns/PlusMinusBtns";
import Cookie from 'cookie-universal';

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(5);
  const { isChange } = useContext(Cart);  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  
  useEffect(() => {
    Axios.get(`${CATEGORIES}`).then(res => setCategories(res.data.slice(-8))).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);


  const categoriesShow = categories.map((category, index) => (
    <Link
      key={index}
      to={`/category/${category.id}`}
      className="m-0 category-title text-black">
      {StringSlice(category.title, 15)}
    </Link>
  ));

  const handleDelete = (id) => {
    const filterProducts = products.filter((product) => product.id !== id);
    setProducts(filterProducts);
    localStorage.setItem("product", JSON.stringify(filterProducts));
  } 

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  }

  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      alert("You're Successfully Loged out");
      window.location.pathname = "/login";
    }
    catch (error) {
      console.log(error)
    }
  }

  const productsShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle 
        d-flex align-items-center justify-content-center bg-danger text-white"
        style={{width: '20px', height: '20px', cursor: 'pointer'}}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height={"80px"}
          style={{ objectFit: 'cover' }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">${product.discount}</h5>
            <h6 className="m-0" style={{ color: 'gray', textDecoration: 'line-through' }}>${product.price}</h6>
          </div>
        </div>

        <PlusMinusBtns
          count={product.count || 1}
          id={product.id}
          setCount={setCount}
          changeCount={changeCount} 
        />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsShow}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../Assets/Images/E-commerce.png")}
                alt="Logo"
              />
            </Link>
            <div className="col-12 col-md-5 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search Product"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center
              justify-content center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-center flex-column-reverse gap-3 order-md-3 order-1">
              <div className="d-flex gap-5 ">
                <div onClick={handleShow} to="/cart" >
                  <img
                    width="30px"
                    src={require("../../../Assets/Images/Icons/Cart.png")}
                    alt="Cart"
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <Link to="/profile">
                  <img
                    width="35px"
                    src={require("../../../Assets/Images/Icons/User-Profile.png")}
                    alt="Profile"
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-end gap-2">
                {!token ? (
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <NavLink to="/login" className="btn btn-outline-primary">Login</NavLink>
                    <NavLink to="/register" className="btn btn-outline-primary">Register</NavLink>
                  </div>
                ) : (
                  <div>
                    <Button onClick={handleLogout} variant="outline-primary">Logout</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="d-flex align-items-center justify-content-start gap-4 flex-wrap">
              {loading ? (
                <>
                  <SkeletonShow length="8" height="40px" width="80px" classes="" />
                </>
              ) : (
                categoriesShow
              )}
              {loading ? (
                <div>
                  <div className="mx-2">
                    <Skeleton width="80px" height="40px" />
                  </div>
                </div>
              ) : (<Link className="text-black category-title" to="/categories">
                Show All
              </Link>)}
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}