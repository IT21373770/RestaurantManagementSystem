import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import axios from "axios";
import Footer from "../../components/Footer";
import ShoppingCart from "./shoppingcart";
import { FaShoppingCart } from "react-icons/fa";
import "./menu.css";
import MenuItem from "../../components/MenuItem";

function Menu() {
  const [products, setproducts] = useState([]);
  const [menu, setmenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(true);
  const [cartsVisibilty, setCartVisible] = useState(false);

  const [productsInCart, setProducts] = useState(
    JSON.parse(localStorage.getItem("shopping-cart")) || []
  ); /*approach - When the items in the state are updated the local storage is simultaneously updated*/

  useEffect(() => {
    localStorage.setItem(
      "shopping-cart",

      JSON.stringify(productsInCart)
    );
  }, [productsInCart]);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    console.log(newProduct);
    setProducts([...productsInCart, newProduct]);
  };

  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex(
        (item) => item._id === productId
      );
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8090/food/")
      .then((res) => {
        setproducts(res.data);

        // setDishes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8090/menu/")
      .then((res) => {
        setmenu(res.data);

        // setDishes(res.data);
      })
      .catch((err) => console.log(err));
  });

  const onProductRemove = (product) => {
    console.log(product);
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item._id === product);
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };
  const handlePasswordChange = (e) => {
    setSearchTerm(e.target.value);

    if (searchTerm.length >= 0) {
      setSearch(false);
      // alert(searchTerm.length)
      // alert(searchTerm)
    }
    if (searchTerm.length == 0) {
      setSearch(true);
      // alert(searchTerm.length)
      // alert(searchTerm)
    }
  };

  return (
    <>
      <Header />

      <div className="cont">
        <div className="App">
          <ShoppingCart
            visibilty={cartsVisibilty}
            products={productsInCart}
            onClose={() => setCartVisible(false)}
            onQuantityChange={onQuantityChange}
            onProductRemove={onProductRemove}
          />

          <head>
            <title>Food Menu</title>

            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap%22"
              rel="stylesheet"
            />
          </head>

          <body>
            <div className="heading">
              <h1>PALLADIUM RESTAURANT & BAR</h1>
              <h3>&mdash; OUR MENU &mdash;</h3>
            </div>

            <div className="navbar">
              {/* <input
                type="text"
                style={{
                  height: "40px",
                  borderColor: "rgba(53, 39, 68, 1)",
                  marginTop: "20px",
                  marginLeft: "40px",
                  color: "black",
                  borderRadius: "15px",
                }}
                placeholder=" Search..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              /> */}

              <input
                type="text"
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  marginLeft: "20px",
                  border: "none",
                }}
                placeholder=" Search food....."
                // onChange={(event) => {setSearchTerm(event.target.value),{handlePasswordChange}} }
                onChange={handlePasswordChange}
                // setSearchTerm(event.target.value)
              />

              <button
                className="btn-shopping-cart-btn"
                onClick={() => setCartVisible(true)}
              >
                <FaShoppingCart size={50} />

                {productsInCart.length > 0 && (
                  <span className="product-count">{productsInCart.length}</span>
                )}
              </button>
            </div>
            {/* <div className="menu">
              {products
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.Name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((product) => (
                  <MenuItem
                    product={product}
                    addProductToCart={addProductToCart}
                    productsInCart={productsInCart}
                  />
                ))}
            </div> */}

            {menu.map((menu) => (
              <div>
                <div style={{ color: "white", fontSize: "25px", fontFamily: "Courier-Oblique", textAlign: "center", textTransform: "uppercase" }} className="menutitle1">
                  {menu.Name}
                </div>

                <div className="menu">
                  {products
                    .filter((val) => {
                      if (searchTerm === "") {
                        const boxes =
                          document.getElementsByClassName("menutitle1");

                        for (const box of boxes) {
                          box.style.visibility = "visible";
                        }
                        if (val.Category.includes(menu.Name)) {
                          return val;
                        }
                      } else if (
                        val.Name.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        )
                      ) {
                        const boxes =
                          document.getElementsByClassName("menutitle1");

                        for (const box of boxes) {
                          box.style.visibility = "hidden";
                        }
                        // document.getElementsByClassName("menutitle1")[0].style.visibility = 'hidden';
                        if (val.Category.includes(menu.Name)) {
                          return val;
                        }
                      }
                    })

                    .map((product) => (
                      <MenuItem
                        product={product}
                        addProductToCart={addProductToCart}
                        productsInCart={productsInCart}
                      />
                    ))}
                  <br />
                </div>
              </div>
            ))}
          </body>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
