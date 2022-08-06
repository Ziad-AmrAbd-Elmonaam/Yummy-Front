import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import "./PilotOnline.css"
function PilotOnlineOrder() {
  let params = useParams();
  let history=useHistory();
  const [onlineOrder, setOnlineOrder] = useState([]);
  // console.log("state",onlineOrder)
  const [orderUpdate, setOrderUpdate] = useState({
    pilotOrderStatus: "on the way",
    deliverypilot: Number(params.id),
  });
  const [pilotOrderUpdate, setPilotOrderUpdate] = useState({
    orders: [],
  });
  let [isload, setIsLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/onlineOrders`)
      .then((res) => {
        setOnlineOrder(res.data);
        console.log(res.data);
        setIsLoad(false);
      })
      .catch((err) => {
        setIsLoad(false);
      });
  }, []);
  //delete order row
  const deleteOrder = (index)=>{
    const order = [...onlineOrder];
    order.splice(index, 1);
    setOnlineOrder(order);
}
  function addingOrder(e,index) {
    let orderId = Number(
      e.target.parentElement.parentElement.firstElementChild.innerText
    );
    setPilotOrderUpdate({
      orders: pilotOrderUpdate.orders.push(orderId),
      // ...pilotOrderUpdate,
    });

    console.log("order id", pilotOrderUpdate.orders);
    axiosInstance
      .put(`/order/${orderId}`, orderUpdate)
      .then((res) => {
        // setOnlineOrder(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .put(`/pilot/${params.id}`, pilotOrderUpdate)
      .then((res) => {
        setPilotOrderUpdate({
          ...pilotOrderUpdate,
          orders:[],
        })
        deleteOrder(index)
        console.log("response", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
    }
    function refreshPage(){
      console.log("clicked")
      axiosInstance
      .get(`/onlineOrders`)
      .then((res) => {
        setOnlineOrder(res.data);
        console.log(res.data);
        setIsLoad(false);
      })
      .catch((err) => {
        setIsLoad(false);
      });
      
    }
  return (
    <>
      {isload ? (
        <Loader />
      ) : (
        <div className="container">
           
           <Link className="btn btn-danger" to={`/pilot/${params.id}`} >Get Back To My Orders</Link>
          <h1 className="orders-head">Online Orders{"  "} </h1>
          <div className="table-responsive">
            <table className="table  table-hover my-5 ">
              <thead className="table-warning ">
                <tr>
                  <td>order ID</td>
                  <td>kitchenName</td>
                  <td>kitchenAddress</td>
                  <td>kitchenPhone</td>
                  <td>kitchenOrderStatus</td>
                  <td>userFullName</td>
                  <td>userAddress</td>
                  <td>userPhone</td>
                  <td><AiOutlineReload size="28" color="orange" className="refresh" onClick={()=>refreshPage()}/></td>
                </tr>
              </thead>
              <tbody>
                {onlineOrder.map((order, index) => {
                  return (
                    // order.length >=0?
                    <>
                      {order.pilotOrderStatus === "waiting" &&
                      order.kitchenOrderStatus === "pending" ? (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.kitchen.kitchenName}</td>
                          <td>
                            {order.kitchen.kitchenAddress.buildingNumber},{" "}
                            {order.kitchen.kitchenAddress.street},{" "}
                            {order.kitchen.kitchenAddress.zone}
                          </td>
                          <td>{order.kitchen.kitchenPhone}</td>
                          <td>{order.kitchenOrderStatus}</td>
                          <td>{order.userid.userFullName}</td>
                          <td>
                            {order.userid.userAddress.building},{" "}
                            {order.userid.userAddress.street},{" "}
                            {order.userid.userAddress.zone}
                          </td>
                          <td>{order.userid.userPhone}</td>
                          <td>
                            <button
                              onClick={(e,index) => addingOrder(e,index)}
                              className=" btn btn-success"
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
    // :"NO ORDERS AVAILABLE";
  );
}

export default PilotOnlineOrder;
