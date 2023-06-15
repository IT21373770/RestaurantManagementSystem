import React from "react";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import Button from "@mui/material/Button";
import Niv from "../../components/Niv";
import Table from "./Table";
import Kot from "./kot";
import axios from "axios";
import "./Order.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { width } from "@mui/system";
import Notification from "../../components/Notification";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import SmallMap from "../Map/SmallMap.jsx";
// import { color } from "@mui/system";
// import { display } from "@mui/system";

function Order() {
  const d = new Date();
  // function addComponent() {
  // const order_id = '008';
  const [w_id, setW_id] = useState("-");
  const [cus_id, setcus_id] = useState("-");
  const [type, settype] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [table, settable] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBv1H_VqIZse7f0hBdvLJThzpB-SaFfkPg",
    libraries: ["places"],
  });
  const invoiceDate = useState(
    d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " - " +
      d.getHours() +
      ":" +
      d.getMinutes()
  );
  const [isSet, setIsSet] = useState(false);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [print, setPrint] = useState(0);

  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [Iid, setIid] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [staytus, setstaytus] = useState("0");
  const componentRef = useRef();
  const kot = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [istype, setIstype] = useState(true);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bar, setBar] = useState([]);
  const [waiter, setwaiter] = useState([]);
  const [porder, setporder] = useState([]);
  const [pbar, setpbar] = useState([]);
  const [loctype, setLoctype] = useState("default");
  const id1 = [];
  const Quantity1 = [];

  // must be change for food
  useEffect(() => {
    function getorder() {
      axios.get("http://localhost:8070/food/").then((res) => {
        // console.log(res.data);
        setOrders(res.data);
        // console.log(orders[1]);
      });
    }
    getorder();
  }, []);

  useEffect(() => {
    function getbar() {
      axios.get("http://localhost:8070/Bardata").then((res) => {
        console.log(res.data);
        setBar(res.data);
        // console.log(orders[1]);
      });
    }
    getbar();
  }, []);

  function setdata(fprice, fname, fID) {
    // alert(fname + " " + fprice);
    document.getElementById("Iname").style.visibility = "hidden";
    document.getElementById("radio").style.visibility = "visible";
    document.getElementById("Fname").value = fname;
    setDescription(fname);
    setPrice(fprice);
    setIid(fID);
  }

  function handleLocationInput(addtype) {
    //console.log(addtype)
    if (addtype == "default") {
      document.getElementById("locationInputs").hidden = true;
    } else if (addtype == "custom") {
      document.getElementById("locationInputs").hidden = false;
    }
  }

  function setSearch() {
    // // alert('ho')
    if (document.getElementById("Iname").style.visibility === "visible") {
      document.getElementById("Iname").style.visibility = "hidden";
      document.getElementById("radio").style.visibility = "visible";
    } else {
      document.getElementById("Iname").style.visibility = "visible";
      document.getElementById("radio").style.visibility = "hidden";
    }
  }

  const [istakeaway, setTakeaway] = useState(false);
  const [isdelivery, setDelivery] = useState(false);
  const [isdining, setDining] = useState(false);
  const delivery = () => {
    ordertype();
    setDining(false);
    setDelivery(true);
    setTakeaway(false);
    settype("Delivery");
  };
  const Dining = () => {
    ordertype();
    settype("Dining");
    setDining(true);
    setDelivery(false);
    setTakeaway(false);
  };

  const Takeaway = () => {
    ordertype();
    settype("Takeaway");
    setDining(false);
    setDelivery(false);
    setTakeaway(true);
  };
  function ordertype() {
    if (
      document.getElementById("takeaway").checked ||
      (document.getElementById("dining").checked && w_id != "-") ||
      document.getElementById("Delivery").checked
    ) {
      document.getElementById("print1").disabled = false;
      document.getElementById("print").hidden = false;
      document.getElementById("print2").hidden = false;
    }
  }

  function handleChange(value) {
    // alert(value)
    settable(value);
  }

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    //  console.log(Ingridients);

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      setporder((current) => [...current, description]);
      // toast.success("data added");
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount,
        Iid,
      };
      // alert(price);

      const neworder_food = {
        order_id,
        description,
        quantity,
      };
      axios
        .post("http://localhost:8070/orderfood/add", neworder_food)
        .then(() => {
          // alert("food add");
          toast.success("Item added to order ");

          document.getElementById("print1").hidden = false;
        })
        .catch((err) => {
          alert(err);
        });

      setDescription("");
      setQuantity("1");
      setPrice("");
      setAmount("");
      setSearchTerm("");
      setList([...list, newItems]);
      setIsEditing(false);
      // setIsEditing(false);
      document.getElementById("Fname").value = "";
    }
  };

  //  select waiter
  useEffect(() => {
    function getwaiter() {
      axios.get("http://localhost:8070/waiter/").then((res) => {
        // console.log(res.data);
        setwaiter(res.data);
        // console.log(orders[1]);
      });
    }
    getwaiter();
  }, []);

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  // Edit function

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    document.getElementById("Fname").value = editingRow.description;
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);

    const index = porder.indexOf(editingRow.description);
    porder.splice(index, 1);

    const index1 = pbar.indexOf(editingRow.description);
    pbar.splice(index1, 1);

    const deletee =
      "http://localhost:8070/orderfood/delete/" +
      order_id +
      "/" +
      editingRow.description;
    // alert(deletee);

    axios
      .delete(deletee)
      .then(() => {
        // alert("delete");
      })
      .catch((err) => {
        toast.error("cannot edit data");
      });
  };

  // Delete function
  const deleteRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));

    const index = porder.indexOf(editingRow.description);
    porder.splice(index, 1);

    const index1 = pbar.indexOf(editingRow.description);
    pbar.splice(index1, 1);

    const deletee =
      "http://localhost:8070/orderfood/delete/" +
      order_id +
      "/" +
      editingRow.description;

    axios
      .delete(deletee)
      .then(() => {
        toast.success("food delete");
      })
      .catch((err) => {
        // alert(err);
        toast.error("food deleted unsuccessfull");
      });
  };
  // deletedata
  const deletedata = () => {
    const deletee = "http://localhost:8070/orderfood/delete/" + order_id;

    // alert(deletee);

    axios
      .delete(deletee)
      .then(() => {
        // alert("delete");
      })
      .catch((err) => {
        alert(err);
      });
    window.location.reload(false);
  };
  // save database
  async function sendorder(e) {
    // alert(cus_id);
    e.preventDefault();

    // document.getElementById('print').disabled=false

    if (total > 0) {
      if (staytus === "0" && type === "Delivery" && !address) {
        toast.error("Please enter the address");
        return;
      }

      const neworder = {
        order_id,
        w_id,
        cus_id,
        type,
        total,
        address,
        phone,
        email,
      };

      console.log(neworder);

      axios
        .post("http://localhost:8070/order/add", neworder)
        .then(() => {
          // alert("order add");
        })
        .catch((err) => {
          alert(err);
        });

      setName("");
      setAddress("");
      setEmail("");
      setPhone("");

      //console.log(list)
      const qty = {
        list,
      };
      axios
        .post("http://localhost:8070/resInventory/updateqty", qty)
        .then(() => {
          // alert("order add");
        })
        .catch((err) => {
          alert(err);
        });
      axios
        .post("http://localhost:8070/BarInventory/updateqty", qty)
        .then(() => {
          // alert("order add");
        })
        .catch((err) => {
          alert(err);
        });

      if (staytus === "0") {
        const neworder_cus = {
          name,
          email,
          address,
          phone,
        };

        axios
          .post("http://localhost:8070/customer/add", neworder_cus)
          .then(() => {
            // alert("cus add");
            toast.success("New customer added");
          })
          .catch((err) => {
            // alert(err);
            toast.error("Could not add the new customer");
          });
      }
    }
  }

  const [orderid, setorder_id] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8070/order/orderId").then((res) => {
      //console.log(res.data);
      setorder_id(res.data);
    });
  }, []);

  let id = orderid.map((item) => item.order_id);

  //  console.log(id[0]);
  const order_id = Number(id[0]) + 1;
  //const order_id = 1
  if (order_id == null || order_id == "") {
    order_id = 1;
  }
  //get cus details
  const [customer, setcustomer] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8070/customer").then((res) => {
      // console.log(res.data);
      setcustomer(res.data);
    });
  }, []);

  //find data

  function findData(phone) {
    setPhone(phone);

    if (phone.length === 9) {
      // alert("hi");
      setPhone(phone);
      customer.map((customer) => {
        // alert(customer.phone_no)
        if (customer.phone_no.includes(phone) === true) {
          // alert(customer.phone_no)
          setstaytus("1");
          setName(customer.name);
          setAddress(customer.address);
          setEmail(customer.Email);
          setcus_id(customer.name);
        }
      });
    }
  }

  return (
    <div>
      <ToastContainer position="top-right" theme="colored" />
      <Niv name="Order" />
      <Notification />
      <div className="data">
        <div style={{ display: "flex", position: "relative" }}>
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1c003f", marginTop: "10px" }}
              // onClick={() => window.location.reload(false)}
              onClick={() => deletedata()}
            >
              Clear
            </Button>
          </div>
          <div style={{ position: "absolute", right: "0px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#01BC90",
                color: "black",
              }}
              href="/Order/history"
            >
              <b>Order History</b>
            </Button>
          </div>
        </div>
        <div
          style={{ display: "flex", position: "relative", maxHeight: "85%" }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "9px",
              marginTop: "80px",
              flexGrow: "1",
              overflowY: "auto",
              maxWidth: "70%",
              // padding: "30px",
            }}
          >
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ width: "50%" }}>
                <Button
                  variant="text"
                  style={{
                    backgroundColor: "rgba(53, 39, 68, 1)",
                    color: "white",
                    width: "100%",
                    borderRadius: "0px",
                  }}
                  onClick={() => setIstype(true)}
                >
                  <b>Restaurent</b>
                </Button>
              </div>

              <div style={{ position: "absolute", right: "0px", width: "50%" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "rgba(53, 39, 68, 1)",
                    color: "white",
                    width: "100%",
                    borderRadius: "0px",
                  }}
                  onClick={() => setIstype(false)}
                >
                  <b>Bar</b>
                </Button>
              </div>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ display: "flex", position: "relative" }}>
                <div>
                  <label htmlFor="invoiceNumber">
                    Invoice Number : {order_id}
                  </label>
                </div>

                <div style={{ position: "absolute", right: "0px" }}>
                  <label htmlFor="invoiceDate">
                    Invoice Date : {invoiceDate}{" "}
                  </label>
                </div>
              </div>
              <form>
                <div style={{ paddingTop: "10px" }}>
                  <div>
                    <label htmlFor="description">Name</label>
                    <br />

                    <input
                      id="Fname"
                      type="text"
                      placeholder="search food....."
                      style={{ padding: "5px", minWidth: "92%" }}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                      // value={description}

                      onClick={() => {
                        setSearch();
                      }}
                    />
                  </div>
                  <div
                    style={{
                      maxHeight: "100px",
                      background: "#F4F0F0",
                      overflowY: "auto",
                      position: "absolute",
                      // position: "relative",
                      opacity: "0.85",
                      visibility: "hidden",
                      minWidth: "40%",
                    }}
                    id="Iname"
                  >
                    {istype
                      ? orders
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            } else if (
                              val.Name.toLowerCase().includes(
                                searchTerm.toLowerCase()
                              )
                            ) {
                              document.getElementById(
                                "Iname"
                              ).style.visibility = "visible";
                              return val;
                            }
                          })
                          .map((order, index) =>
                            porder.includes(order.Name) ? null : (
                              <p
                                className="fooddata"
                                key={index}
                                onClick={() =>
                                  setdata(order.Price, order.Name, order._id)
                                }
                              >
                                {order.Name}
                              </p>
                            )
                          )
                      : bar
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            } else if (
                              val._id
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              document.getElementById(
                                "Iname"
                              ).style.visibility = "visible";
                              return val;
                            }
                          })
                          .map((bar, index) =>
                            pbar.includes(bar._id) ? null : (
                              <p
                                className="fooddata"
                                key={index}
                                onClick={() => (
                                  setpbar((current) => [...current, bar._id]),
                                  setdata(bar.price, bar._id)
                                )}
                              >
                                {bar._id}
                              </p>
                            )
                          )}
                  </div>
                </div>
                <div style={{ paddingTop: "5%", display: "flex" }}>
                  <div style={{}}>
                    <label htmlFor="quantity">Quantity :</label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      placeholder="Quantity"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      style={{ marginLeft: "25px" }}
                    />
                  </div>
                  <div className="flex flex-col" style={{ marginLeft: "20%" }}>
                    <label htmlFor="price">Price</label>
                    <input
                      disabled
                      type="text"
                      name="price"
                      id="price"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                {/* <hr style={{ borderColor: "black", marginTop: "25px" }}></hr> */}
                <form action="" style={{ paddingTop: "15px" }} id="radio">
                  <input
                    id="takeaway"
                    type="radio"
                    name="language"
                    // checked
                    onClick={Takeaway}
                  />
                  <label htmlFor="javascript">Takeaway</label>
                  <input
                    id="dining"
                    type="radio"
                    name="language"
                    onClick={Dining}
                    style={{ marginLeft: "15%" }}
                  />
                  <label htmlFor="javascript">Dine-In</label>
                  <input
                    id="Delivery"
                    type="radio"
                    name="language"
                    onClick={delivery}
                    style={{ marginLeft: "15%" }}
                  />
                  <label htmlFor="javascript">Delivery</label>
                </form>

                {isdelivery ? (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "20px",
                      // position: "relative",
                      // display:"none"
                    }}
                  >
                    <div id="T_no">
                      <table
                        style={{
                          borderSpacing: "0",
                          margin: "auto auto",
                          border: "none",
                          minWidth: "60rem",
                        }}
                      >
                        <tbody>
                          <tr>
                            <th style={{ textAlign: "center" }} colSpan={5}>
                              Delivery Details
                            </th>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="phone" id="id">
                                Enter phone :{" "}
                              </label>
                            </td>
                            <td>
                              <input
                                // disabled
                                className="Delivery"
                                type="number"
                                name="phone"
                                id="phone"
                                pattern="[0-9]{10}"
                                placeholder="Enter your phone"
                                autoComplete="off"
                                value={phone}
                                onChange={(e) => findData(e.target.value)}
                                style={{ padding: "1rem" }}
                              />
                            </td>

                            <td>
                              <label htmlFor="name" id="name">
                                Enter Name:
                              </label>
                            </td>

                            <td>
                              <input
                                className="Delivery"
                                type="text"
                                name="text"
                                id="name"
                                placeholder="Enter your name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => (
                                  setName(e.target.value),
                                  setcus_id(e.target.value)
                                )}
                                style={{ marginLeft: "5px", padding: "1rem" }}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <label htmlFor="email" id="email">
                                Enter email:{" "}
                              </label>
                            </td>

                            <td>
                              <input
                                // disabled
                                className="Delivery"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ marginLeft: "6px", padding: "1rem" }}
                              />
                            </td>
                            <td>
                              <p
                                style={{ marginTop: "1rem" }}
                                htmlFor="address"
                                id="address"
                              >
                                Customer Address :
                              </p>
                            </td>
                            <td>{address}</td>
                          </tr>
                          <tr>
                            <th style={{ textAlign: "center" }} colSpan={5}>
                              Delivery Location
                            </th>
                          </tr>
                          <tr>
                            <td>
                              <input
                                id="defaultLocation"
                                type="radio"
                                name="defaultLocation"
                                value={"default"}
                                onClick={(e) => handleLocationInput("default")}
                                style={{ marginLeft: "15%" }}
                              />
                              <label style={{ minWidth: "3rem" }}>
                                {" "}
                                Default Address{" "}
                              </label>
                            </td>
                            <td>
                              <input
                                id="defaultLocation"
                                type="radio"
                                name="defaultLocation"
                                value={"custom"}
                                onClick={(e) => handleLocationInput("custom")}
                                style={{ marginLeft: "15%" }}
                              />
                              <label> Use Custom Location</label>
                            </td>
                            <td>
                              <p
                                style={{ marginTop: "1rem" }}
                                htmlFor="address"
                                id="address"
                              >
                                Set Delivery Location:
                              </p>
                            </td>

                            <td>
                              <Autocomplete
                                onChange={(e) => setAddress(e.target.value)}
                              >
                                <input
                                  type="text"
                                  hidden={true}
                                  id="locationInputs"
                                  style={{ padding: "1rem 1rem 1rem 1rem" }}
                                  placeholder="Enter your drop point..."
                                  onChange={(e) => setAddress(e.target.value)}
                                  onClick={(e) => setAddress(e.target.value)}
                                  onMouseMove={(e) =>
                                    setAddress(e.target.value)
                                  }
                                  onMouseUp={(e) => setAddress(e.target.value)}
                                  value={address}
                                />
                              </Autocomplete>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <div
                  style={{
                    position: "absolute",
                    marginLeft: "25%",
                    padding: "10px",
                  }}
                  id="Address"
                  hidden
                > */}

                    {/* <textarea
                      className="Delivery"
                      type="text"
                      rows="4"
                      cols="30"
                      name="address"
                      id="address"
                      placeholder="Enter your address"
                      autoComplete="off"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ paddingTop: "2px" }}
                    >

                    </textarea> */}

                    {/* <SmallMap id={address}>
                    </SmallMap>  */}

                    {/* </div> */}
                  </div>
                ) : null}
                {isdining ? (
                  <div>
                    Select Waiter :
                    <select
                      id="w_name"
                      value={w_id}
                      onChange={(e) => (setW_id(e.target.value), ordertype())}
                      onClick={() => ordertype()}
                    >
                      <option>Chose Waiter</option>
                      {waiter.map((waiter) => (
                        <option>{waiter.name}</option>
                      ))}
                    </select>
                    <br />
                    Set Table number:
                    <br />
                    <RadioGroup row>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="1"
                        onChange={() => handleChange(1)}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="2"
                        onChange={() => handleChange(2)}
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3"
                        onChange={() => handleChange(3)}
                      />
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4"
                        onChange={() => handleChange(4)}
                      />{" "}
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="5"
                        onChange={() => handleChange(5)}
                      />
                      <FormControlLabel
                        value="6"
                        control={<Radio />}
                        label="6"
                        onChange={() => handleChange(6)}
                      />{" "}
                      <FormControlLabel
                        value="7"
                        control={<Radio />}
                        label="7"
                        onChange={() => handleChange(7)}
                      />
                      <FormControlLabel
                        value="8"
                        control={<Radio />}
                        label="8"
                        onChange={() => handleChange(8)}
                      />{" "}
                      <FormControlLabel
                        value="9"
                        control={<Radio />}
                        label="9"
                        onChange={() => handleChange(9)}
                      />
                      <FormControlLabel
                        value="10"
                        control={<Radio />}
                        label="10"
                        onChange={() => handleChange(10)}
                      />
                    </RadioGroup>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    padding: "10px",
                  }}
                >
                  <div>
                    <label htmlFor="amount">
                      <b>Amount : LKR {amount} </b>
                    </label>
                  </div>
                  <div style={{ position: "absolute", right: "0px" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#ff8243", color: "white" }}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <b>{isEditing ? "Edit" : "Add "}</b>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "9px",
              marginTop: "5rem",
              margin: "auto auto",
              padding: "3rem 3rem",
              whiteSpace: "nowrap",
              overflowY:"auto"
            }}
          >
            <div id="print1" style={{ display: "flex" }}>
              <div onClick={sendorder}>
                <ReactToPrint
                  focus={true}
                  trigger={() => (
                    <Button
                      // style={{ backgroundColor: "#01BC90", color: "black" }}
                      type="submit"
                      id="print"
                    >
                      Print Bill
                    </Button>
                  )}
                  onBeforePrint={() => {
                    if (total <= 0) {
                      toast.error("Please add food");
                      throw new Error("Printing is not allowed!");
                    } else if (type == "Dining" && table == "") {
                      toast.error("Please select table ");
                      throw new Error("Printing is not allowed!");
                    } else if (
                      staytus === "0" &&
                      type === "Delivery" &&
                      !address
                    ) {
                      toast.error("Please enter the address");
                      throw new Error("Printing is not allowed!");
                    } else if (type == "") {
                      toast.error("Please set order type");
                      throw new Error("Printing is not allowed!");
                    } else {
                      setPrint(1);
                    }
                  }}
                  content={() => componentRef.current}
                />
              </div>
              <div>
                <ReactToPrint
                  focus={true}
                  trigger={() => <Button id="print2">Print KOT</Button>}
                  onBeforePrint={() => {
                    if (print == 0) {
                      toast.error("Please print the bill first");
                      throw new Error("Printing is not allowed!");
                    }
                  }}
                  content={() => kot.current}
                  onAfterPrint={() => window.location.reload(false)}
                />
              </div>
            </div>

            <div id="printdata" ref={componentRef} className="p-5">
              <Table
                invoiceNumber={order_id}
                invoiceDate={invoiceDate}
                description={description}
                quantity={quantity}
                price={price}
                amount={amount}
                list={list}
                setList={setList}
                total={total}
                setTotal={setTotal}
              />
            </div>
            <div ref={kot}>
              <Kot
                invoiceNumber={order_id}
                invoiceDate={invoiceDate}
                description={description}
                quantity={quantity}
                list={list}
                setList={setList}
                setTotal={setTotal}
                type={type}
                table={table}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            minWidth: 230,
            marginTop: "40px",
            backgroundColor: "white",
            borderRadius: "9px",
            padding: "10px",
          }}
        >
          <table width="100%" className="mb-10" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (LKR)</th>
                <th>Amount</th>
              </tr>
            </thead>
            {list.map(({ id, description, quantity, price, amount }) => (
              <React.Fragment key={id}>
                <tbody>
                  <tr className="h-10">
                    <td>{description}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td className="amount">{amount}</td>
                    <td>
                      <Button onClick={() => editRow(id)}>
                        <AiOutlineEdit
                          style={{ fontSize: "30px", color: "black" }}
                        />
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteRow(id)}>
                        <AiOutlineDelete
                          style={{ fontSize: "30px", color: "black" }}
                        />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            ))}
          </table>

          <div>
            <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
              LKR: {total.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
