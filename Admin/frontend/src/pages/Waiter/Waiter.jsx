import React , {useEffect , useState} from 'react';
import axios from 'axios'
import Niv from '../../components/Niv';
import "./waiter.css"
import { useNavigate ,  Link} from 'react-router-dom';
import Notification from "../../components/Notification";
import { v4 as uuidv4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";



const Waiter = () => {

    const [waiter , setWaiter] = useState([]) ;
    const [searchTerm, setSearchTerm] = useState("");
    const history = useNavigate();
   

    useEffect(() => {
        function getWaiter() {

            axios.get("http://localhost:8070/waiter/").then((res) =>{
                setWaiter(res.data)
            });

        }
        getWaiter() ;
    },[]);

    function Finddata(index){
        // document.getElementsByClassName("data")[index].hidden=false
        document.getElementById(index).hidden=false
      }
     
    function DeleteRow(id) {
       
        

        const dlt = "http://localhost:8070/waiter/delete/" + id ;

        axios.delete(dlt).then(()=>{
          
          
           
        })
        .catch(err => {
            alert(err)
        });
        toast.success("Deleted successfully!");
            //history('/Waiter/addwaiter')
    };

    return (
        <div>
        <ToastContainer position="top-right" theme="colored" />
        <Niv name='Waiter'/>
        <Notification/>
        <div className='data'>
        <h1 className='title'>Waiters</h1>

        <input type="text" style={{ height: "40px"  , marginLeft:"30px" , background:"#edeef1 " , border:"white" , paddingLeft:"10px" }} placeholder=" Search Waiter..." onChange={(event) => {
            setSearchTerm(event.target.value);
          }} />
       
        <div class="tbl-header">
          <a href="Waiter/AddWaiter">
          <button class="add_waiter">+ New Waiter</button>
          </a>

          <table className="waiter-tbl" cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                <th className='waiter-th'>Waiter ID </th>
                <th className='waiter-th'>Name</th>
                <th className='waiter-th'>Email</th>
                <th className='waiter-th'>Address</th>
                <th className='waiter-th'>Phone Number</th>
               
                
                <th className='waiter-th'>Action</th>
                </tr>
            </thead>

            <tbody>
                
            {waiter.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((waiter,index) =>(
              <>
              <tr  onClick={()=>Finddata(index)}>
              <td>{waiter.W_Id}</td>
              <td>{waiter.name}</td>
              <td>{waiter.Email}</td>
              <td>{waiter.address}</td>
              <td>{waiter.phone_no}</td>
              
              
              <td>
                <Link to={`/Waiter/UpdateWaiter/${waiter._id} `}>
                <button className='edit'>Edit</button>
                </Link>
                <a href = "/waiter" >
                <button className='del' onClick={(e)=> DeleteRow(waiter._id)}>Delete</button>
                </a>
              </td>
              </tr>
              
              </>
            ))}
            </tbody>
          </table>
        </div>
        </div> 
    </div>
    );
};

export default Waiter;