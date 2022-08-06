import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Network/Config";
import Loader from "../../components/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import "./PilotOnline.css";

function PilotOnlineOrder() {
  let params = useParams();
  let history = useHistory();
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

  //   function addingOrder (id){
  //     console.log(id)
  //     axiosInstance
  //     .post(`/orders/${id}`)
  //     .then((res) => {
  //       setOnlineOrder(res.data);
  //       console.log(res.data)
  //       setIsLoad(false);
  //       //   setItem(res.data.menuId.menuItems);
  //     })
  //     .catch((err) => {
  //       setIsLoad(false);
  //     });

  //   }

  // console.log("nnn", item)
  //delete order row
  const deleteOrder = (index) => {
    const order = [...onlineOrder];
    order.splice(index, 1);
    setOnlineOrder(order);
  };
  function addingOrder(e, index) {
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
          orders: [],
        });
        deleteOrder(index);
        console.log("response", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function refreshPage() {
    console.log("clicked");
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
          <h1 className="orders-head">Online Orders</h1>

          <Link className="btn btn-danger" to={`/pilot/${params.id}`}>
            Get Back To My Orders
          </Link>
          <h1 className="orders-head">Online Orders{"  "} </h1>
          <div className="table-responsive">
            <table className="table  table-hover my-5 ">
              <thead className="table-warning ">
                <tr>
                  <td>orders</td>
                  <td>order ID</td>
                  <td>kitchenName</td>
                  <td>kitchenAddress</td>
                  <td>kitchenPhone</td>
                  <td>kitchenOrderStatus</td>
                  <td>userFullName</td>
                  <td>userAddress</td>
                  <td>userPhone</td>
                  <td></td>
                  <td>
                    <AiOutlineReload
                      size="28"
                      color="orange"
                      className="refresh"
                      onClick={() => refreshPage()}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {onlineOrder.map((order, index) => {
                  return (
                    <>
                      {order.pilotOrderStatus === "waiting" &&
                      order.kitchenOrderStatus === "pending" ? (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{order.kitchen.kitchenName}</td>
                          {/* <td>
                            {order.kitchen.kitchenAddress.buildingNumber},{" "}
                            {order.kitchen.kitchenAddress.street},{" "}
                            {order.kitchen.kitchenAddress.zone}
                          </td> */}
                          <td>{order.kitchen.kitchenPhone}</td>
                          <td>{order.kitchenOrderStatus}</td>
                          <td>{order.userid.userFullName}</td>
                          {/* <td>
                    {order.userid.userAddress.building},{" "}
                    {order.userid.userAddress.street},{" "}
                    {order.userid.userAddress.zone}
                  </td> */}
                          <td>{order.userid.userPhone}</td>
                          {/* <td><button onClick={(index)=>addingOrder(index)} className=' btn btn-success'>Add</button></td> */}
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
