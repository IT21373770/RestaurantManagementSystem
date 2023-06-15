import React from "react";
import Niv from "../../components/Niv";
import "./BarAdd.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
// import 'react-select-search/style.css'

import Notification from "../../components/Notification";
window.Buffer = window.Buffer || require("buffer").Buffer;

function BarAdd() {
  const d = new Date();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [catogary, setcatogary] = useState("");
  const [quantity, setquantity] = useState("");
  const [Expiredate, setExpiredate] = useState("");
  const [Totalcost, setTotalcost] = useState(0);
  const [Unitcost, setUnitcost] = useState("");
  const [Reorderlevel, setReorderlevel] = useState("");
  const [Sellprice, setSellprice] = useState("");
  const [ImageURL, setImageURL] = useState("");

  const s3 = new AWS.S3();
  const [file, setFile] = useState(null);
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];
  AWS.config.update({
    accessKeyId: "AKIAV3TWWOPNV5Z3UJ6X",
    secretAccessKey: "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",
    dirName: "images",
    region: "ap-south-1",
    signatureVersion: "v4",
  });

  const handleFileSelect = (e) => {
    const file_ = e.target.files[0];

    if (!validFileTypes.find((type) => type === file_.type)) {
      toast.error(
        "Enter the dish Name first. Then select an JPG/PNG file type."
      );
      return;
    } else {
      setFile(e.target.files[0]);
    }
  };

  const [Buydate, setBuydate] = useState(
    d.getUTCDate() +
      "/" +
      d.getUTCMonth() +
      1 +
      "/" +
      d.getFullYear() +
      " - " +
      d.getHours() +
      ":" +
      d.getMinutes()
  );
  const [Product_Code1, setproduct_code1] = useState("");
  const [Product_Name1, setproduct_Name1] = useState("");
  const [Product_Type1, setproduct_Type1] = useState("");
  const [Stock, setstock] = useState();
  const [Total, setTotal] = useState("");
  const [Expire_Date1, setExpire_Date1] = useState("");
  const [Quantity1, setQuantity1] = useState("");
  const [Re_Order_Level1, setRe_Order_Level1] = useState("");
  // const[Stock,setstock]=useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [Btlcode, setBtlCode_id] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8070/barInventory/barId").then((res) => {
      console.log(res.data);
      setBtlCode_id(res.data);
    });
  }, []);
  const id = Btlcode.map((item) => item.Product_Code);
  const Bid = Number(id) + 1;

  //start coding
  const show = async (e) => {
    const newTotCost = quantity * Unitcost;

     //validations for input fields
    if(!name){
      toast.error("Enter Product Name");
      return;
    }
    if(!type){
      toast.error("Enter Product Type");
      return;
    }
    if(!catogary){
      toast.error("Enter Product Catgary");
      return;
    }
    if(!Unitcost){
      toast.error("Enter Product Unitcost");
      return;
    }
    if(!quantity){
      toast.error("Enter Product quantity");
      return;
    }
    if(!Reorderlevel){
      toast.error("Enter Product Reorderlevel");
      return;
    }
    if(!Sellprice){
      toast.error("Enter Product sellprice");
      return;
    }
    if(!file){
      toast.error("please selct an image of JPG or PNG file type..");
      return;
    }

   // addng items if iseditiong false
    if (isEditing === false) {
      setCode(Bid);

      let code = Bid;
      alert(code);
      const Bardata = { code, quantity, Expiredate, Unitcost, Sellprice, name };
      //console.log(Bardata);
      // console.log(isEditing);

      axios
        .post("http://localhost:8070/Bardata/add", Bardata)
        .then(() => {
          toast.success("Bar Item added succesfully");
        })
        .catch((err) => {
          alert(err);
        });

      const params = {
        Bucket: "paladiumdishes",
        Key: `${Date.now()}.${name}`,
        Body: file,
      };
      const { Location } = await s3.upload(params).promise();
      setImageURL(Location);

      const BarInventory = {
        code,
        name,
        type,
        catogary,
        quantity,
        newTotCost,
        Reorderlevel,
        Location,
      };
      axios
        .post("http://localhost:8070/BarInventory/add", BarInventory)
        .then(() => {
          toast.success("Item added succesfully");
        })
        .catch((err) => {
          toast.error("Item add operation failed");
        });
    } else {
      const Bardata = { code, quantity, Expiredate, Unitcost, Sellprice, name };
      //console.log(Bardata);
      // console.log(isEditing);
      axios
        .post("http://localhost:8070/Bardata/add", Bardata)
        .then(() => {
          toast.success("Bar Item added succesfully");
        })
        .catch((err) => {
          alert(err);
        });

        // update the values 
      const quantity2 = Number(quantity) + Number(Quantity1);
      const Totalcost2 = Number(Total + newTotCost);
      //alert(Totalcost2)
      const url = "http://localhost:8070/BarInventory/update/" + Product_Code1;
      const BarInventory = {
        code,
        name,
        type,
        catogary,
        quantity2,
        Totalcost2,
        Reorderlevel,
      };
      axios
        .put(url, BarInventory)
        .then(() => {
          toast.success("Item updated succesfully");
        })
        .catch((err) => {
          toast.error("Item update operation failed");
        });
    }
  };

  const [items, setbar] = useState([]);

  useEffect(() => {
    const getbarval = () => {
      axios
        .get("http://localhost:8070/barInventory/")
        .then((barinventories) => {
          setbar(barinventories.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    getbarval();
  }, []);

  const [code1, setCode1] = useState();
  //auto increment

  const [searchTerm, setSearchTerm] = useState("");
  // setCode(Bid)
  // if (Bid == null || Bid == ""){
  //   Bid = 1
  // }
  //alert(Bid)

  // find by name to upadte data
  function findcode(name, id) {
    console.log(id);
    setName(name);

    document.getElementById("Iname").style.visibility = "hidden";
    // document.getElementById("radio").style.visibility = "visible";
    document.getElementById("Bname").value = name;

    items.map((items) => {
      if (items.Product_Code.includes(id) === true) {
        // alert("gg")
        setType(items.Product_Type);
        setcatogary(items.Catogary);
        setReorderlevel(Number(items.Re_Order_Level));
        setCode(items.Product_Code);
        setproduct_code1(items.Product_Code);
        setproduct_Name1(items.Product_Name);
        setproduct_Type1(items.Product_Type);
        setQuantity1(items.Quantity);
        setTotal(items.Total_Cost);
        setExpire_Date1(items.Expire_Date);
        setRe_Order_Level1(items.Re_Order_Level);
        setIsEditing(true);
      } else {
        // setIsEditing(false);
      }
    });
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

  return (
    <div>
      <Niv name="Bar Inventory" />
      <Notification />
      <ToastContainer position="top-right" theme="colored" />
      <div className="data">
        <div className="cardadd">
          <header className="baraddheader">Add Details</header>

          {/*<form onSubmit={show} className="BaraddForm">*/}
          <div className="BaraddForm">
            <div className="form first">
              <div class="add detail">
                <div class="fields">
                  <div class="input-field">
                    <label className="BaraddProductCode">Product Name : </label>
                    {/* <input
                      type="text" 
                      disabled
                      placeholder="Product code"
                      value={code}
                      // onChange={(e) => findcode(e.target.value)}
                      // onChange={(e) => }
                      pattern="[0-9]{4}" 
                      title="prodduct code should be 4 digit no"/> */}
                    <input
                      id="Bname"
                      type="text"
                      placeholder="search bottles....."
                      style={{ padding: "5px", minWidth: "92%" }}
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                        setName(event.target.value);
                      }}
                      pattern="[a-zA-Z]{1,30}"
                      title="Name can only contain A-Z characters and should be less than or equal to 30 characters"
                      // value={description}

                      onClick={() => {
                        setSearch();
                      }}
                    />

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
                        marginTop: "5%",
                      }}
                      id="Iname"
                    >
                      {items
                        .filter((val) => {
                          if (searchTerm === "") {
                            // setIsEditing(false);
                            return val;
                          } else if (
                            val.Product_Name.toLowerCase().includes(
                              searchTerm.toLowerCase()
                            )
                          ) {
                            document.getElementById("Iname").style.visibility =
                              "visible";
                            return val;
                          }
                          // else{
                          //   setIsEditing(false);
                          //   return val;
                          // }
                        })
                        .map((bar, index) => (
                          <p
                            className="fooddata"
                            key={index}
                            onClick={(e) =>
                              findcode(bar.Product_Name, bar.Product_Code)
                            }

                            // onClick={() => (

                            //   setdata(bar.price, bar._id)
                            // )}
                          >
                            {bar.Product_Name}
                          </p>
                        ))}
                    </div>
                  </div>

                  {/* <div class="input-field">
                    <label className="BaraddProductName">Product Name</label>
                    <input
                      type="text"
                      placeholder="Product name"
                      value={name}
                      onChange={(e) => findcode(e.target.value)}
                      pattern="[a-zA-Z]{1,30}"
                      title="Name can only contain A-Z characters and should be less than or equal to 30 characters"
                      required
                    />
                  </div> */}

                  <div class="input-field">
                    <label className="BaraddProductType">Product Type</label>
                    <input
                      type="text"
                      placeholder="Product Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      pattern="[a-zA-Z]{1,30}"
                      title="Name can only contain A-Z characters and should be less than or equal to 30 characters"
                      required
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddCatogary">Catogary</label>
                    <input
                      type="text"
                      placeholder="Catogary"
                      value={catogary}
                      onChange={(e) => setcatogary(e.target.value)}
                      pattern="[a-zA-Z]{1,30}"
                      title="Name can only contain A-Z characters and should be less than or equal to 30 characters"
                      required
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddBuyCost">Unit cost</label>
                    <input
                      type="text"
                      placeholder="unit cost"
                      value={Unitcost}
                      onChange={(e) => setUnitcost(e.target.value)}
                      pattern="[0-9]"
                      required
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddQuantity">Quantity</label>
                    <input
                      type="Number"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setquantity(e.target.value)}
                      min={1}
                      required
                    />
                  </div>

                  {/*<div class="input-field">
                    <label className="BaraddBuyDate">Buy date</label>
                    <input type="date" 
                      required
                      title="must add the date"
                    />
                  </div>*/}

                  <div class="input-field">
                    <label className="BaraddBuyCost">Total cost</label>
                    <input
                      type="number"
                      placeholder="ttotal cost"
                      value={quantity * Unitcost || 0}
                      onChange={(e) => setTotalcost(e.target.value)}
                      readOnly
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddPReOrderLevel">
                      Re order level
                    </label>
                    <input
                      type="number"
                      placeholder="Re order level"
                      value={Reorderlevel}
                      onChange={(e) => setReorderlevel(e.target.value)}
                      required
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddSellPrice">sell price</label>
                    <input
                      type="text"
                      placeholder="sell price"
                      value={Sellprice}
                      onChange={(e) => setSellprice(e.target.value)}
                      required
                    />
                  </div>

                  <div class="input-field">
                    <label className="BaraddExpireDate">Expire date</label>
                    <input
                      type="date"
                      value={Expiredate}
                      onChange={(e) => setExpiredate(e.target.value)}
                      required
                    />
                  </div>

                  {/*photo addonChange={handleFileSelect}*/}
                  <div class="input-field">
                    <label className="BaraddPhoto">photo</label>
                    <input type="file" onChange={handleFileSelect} />
                  </div>
                </div>

                <button
                  class="BarAdd"
                  type="submit"
                  onClick={(e) => {
                    setTotalcost(quantity * Unitcost);
                    show(e);
                  }}
                >
                  <span class="addbtn">{isEditing ? "Edit" : "Add"}</span>
                </button>
              </div>
            </div>
          </div>
          <a href="/Bar">
            <button class="Barcancel">
              <span class="addbtn">Cancel</span>
            </button>
          </a>
        </div>

        {/*this part is in update */}
        <div className="cardinv">
          <table className="barAddstatus">
            <tr className="Add-tbl-head">
              <td className="Add-tbl-head">Product Code</td>
              <td className="Add-tbl-head">Product Name</td>
              <td className="Add-tbl-head">Product Type</td>
              <td className="Add-tbl-head">Expire Date</td>
              <td className="Add-tbl-head">Stock</td>
              <td className="Add-tbl-head">Re_Order_Level</td>
            </tr>
            <tr>
              <td className="add-bar-inv-view">{Product_Code1}</td>
              <td className="add-bar-inv-view">{Product_Name1}</td>
              <td className="add-bar-inv-view">{Product_Type1}</td>
              <td className="add-bar-inv-view">{Expire_Date1}</td>
              <td className="add-bar-inv-view">{Quantity1}</td>
              <td className="add-bar-inv-view">{Re_Order_Level1}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BarAdd;
