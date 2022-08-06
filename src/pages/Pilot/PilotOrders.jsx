import React from "react";
import "./Pilot.css";

export default function PilotOrders(props) {
  console.log(props);
  return (
    <div className="container">
      <h1 className="orders-head">My Orders</h1>
      <div className="table-responsive">

{/* 
        <table className="table  table-hover my-5 ">
          <thead className="table-warning ">
            <tr>
              <td>orders</td>
              <td>kitchen name</td>
              <td>kitchen zone</td>
              <td>client name</td>
              <td>client address</td>
              <td>Item</td>
              <td>pilot Order Status</td>
              <td>total price</td>
            </tr>
          </thead>
          <tbody>
            {props.pilot.orders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.kitchen.kitchenName}</td>
                  <td>
                    {order.kitchen.kitchenAddress.buildingNumber},{" "}
                    {order.kitchen.kitchenAddress.street},{" "}
                    {order.kitchen.kitchenAddress.zone}
                  </td>
                  <td>{order.userid.userFullName}</td>
                  <td>
                    {order.userid.userAddress.building},{" "}
                    {order.userid.userAddress.street},{" "}
                    {order.userid.userAddress.zone}
                  </td>
                  <td>
                    <ul>
                      {order.orderItems.map((item, index) => {
                        return (
                          <li key={index}>
                            {item.itemName} : {item.itemPrice} <span>LE</span>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>{order.pilotOrderStatus}</td>
                  <td>
                    {order.totalPrice} <span>LE</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}


      </div>
    </div>
  );
}
