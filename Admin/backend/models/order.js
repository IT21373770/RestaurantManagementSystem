const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    
    order_id:{
        type: String,
        required: true
    },
    w_id:{
        type: String,
        required: true
    },
   cus_id:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    amout:{
        type: Number,
       
    },
    status:{
        type: String,
       
    },
    location:{
        type: String,
    },
    phnNum:{
        type: String,
    },
    startCode:{
        type: String,
    },
    endCode:{
        type: String,
    },
    deliverPersonEmail:{
        type: String,
    },
    deliverPersonPhn:{
        type: String,
    },
    endTime:{
        type: String,
    }
    ,
    startTime:{
        type: String,
    },
    deliverCenter:{
        type: Object
    },
    driverID:{
        type: String,
    },
    distance:{
        type: String,
    },
    duration:{
        type: String,
    },
    cusEmail:{
        type: String,
    }
   
})
const order = mongoose.model("order",orderSchema);

module.exports=order