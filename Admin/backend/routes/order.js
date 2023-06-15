const router = require("express").Router();
const order = require("../models/order");
// const Coustomer = require("../models/coustomer");
let Coustomer =require("../models/order");
const d=new Date();

function codeGenarator() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) ;
   
  }
// ADD coustomer
router.route("/add").post((req,res)=>{
    const d=new Date();
   // console.log("hi");

    const order_id =req.body.order_id;
    const  w_id    =req.body.w_id;
    const  cus_id  =req.body.cus_id;
    const  type     = req.body.type;
    const  date     =d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    const  time     =d.getHours()+":"+d.getMinutes()
    const  amout    = Number( req.body.total);
    const  status= "pending"
    const location = req.body.address;
    const phnNum = req.body.phone;
    const startCode = codeGenarator()
    const endCode = codeGenarator()
    const deliverCenter = req.body.deliverCenter
    const cusEmail = req.body.email

    // const order_id ="0"
    // const  w_id    ="req.body.w_id;"
    // const  cus_id  ="req.body.cus_id;"
    // const  type     = "req.body.type;"
    // const  date     ="d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();"
    // const  time     ="d.getHours()++d.getMinutes()"
    // const  amout    = 230
    // const  status= "pending"
    // const location = "req.body.address;"
    // const phnNum = "req.body.phone;"
    // const startCode = "codeGenarator()"
    // const endCode = "codeGenarator()"
    // const deliverCenter =" req.body.deliverCenter"
    // const cusEmail = "req.body.email"
  
    
    const neworder =new  order({

        order_id,
        w_id,   
        cus_id,
        type,
        date,
        time,
        amout,
        status,    
        location,
        phnNum,
        startCode,
        endCode,
        cusEmail
   
 
    })
    console.log(neworder)
   
    neworder.save().then(()=>{
        res.json("save details")
        console.log("Order Saved")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    order.find().sort({date:-1}).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

//count
const  date1 =d.getMonth()+1+"-"+d.getFullYear();
router.route("/count").get((req,res)=>{
order.find({date:{$regex :date1 }}).count().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/sum/:id").get((req,res)=>{
let id=req.params.id
    order.aggregate([{$match:{date:{$regex :id}}},{$group:{_id:null ,price:{$sum:"$amout"}}}]).then((orders)=>{
            res.json(orders)
        }).catch((err)=>{
            console.log(err)
        })
    })

router.route("/orderId").get((req,res)=>{
    order.find({},{order_id:1}).sort({_id:-1}).limit(1).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    
    let Id = req.params.id;

    await order.deleteOne({category_Id:req.params.id})
    .then(()=>{
        res.status(200).send({status:"order details deleted", user : Id})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"order details delete failed", error:err});
    })
})


router.route("/FindOrder/:id").get(async(req,res)=>{
    const ids =  req.params.id.toString()
    await order.findById({_id:ids})
    .then(response => { 
        //console.log(response)
        res.send(response)
    })
    .catch((err) => console.log(err));

})



router.route("/deleteOrderRecord/:id").delete(async(req,res)=>{

    order.findByIdAndDelete({_id:req.params.id})
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});
    
router.route("/updateOrderRecord/:id").put(async(req,res)=>{

    await order.findByIdAndUpdate(
        {_id: req.params.id} ,{
            status : req.body.status,
            deliverPersonEmail : req.body.deliverPersonEmail,
            deliverPersonPhn : req.body.deliverPersonPhn ,
            endTime : req.body.endTime ,
            distance : req.body.distance,
            duration: req.body.duration,
            driverID : req.body.driverID,
            startTime : req.body.startTime,
            endTime:req.body.endTime
    }
    ).then(response => {
        res.type('text/plain');
       // console.log(response)
        res.send(response)
    });

});


/* update */
router.route("/update/:id").put(async(req,res)=>{

    let Id = req.params.id;

    const Name  = req.body.name;

    const updatemenu = {Name};  

    await order.updateOne({_Id:Id},{$set:updatemenu})
    .then(()=>{
        res.status(200).send({status:"order updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"order update failed", error:err});
    })
})

router.route("/type").get((req,res)=>{
    order.find({},{type:1,date:1}).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

const  date2 =d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
router.route("/top").get((req,res)=>{
    order.find({date:date2 }).sort({amout:-1}).limit(10).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports=router;