import React from "react";
import "./ItemCard.css";
import { AiFillPlusCircle } from "react-icons/ai";
function CardComponent(props) {
  return (
    <>
      <div className="row">
        <div className="col-md-10">
          <h5 className="card-title">
            {props.item.itemName}{" "}
            <span className="text-muted status">{props.item.itemStatus}</span>
          </h5>
          <p className="text-muted mb-5">{props.item.itemDescription}</p>

          <p className=" mt-5 item-price">
            <AiFillPlusCircle size="22" /> {props.item.itemPrice} EGP
          </p>
        </div>
        <div className="col-md-2">
          <img src={props.item.itemImage} className="card-img-top" alt="..." />
        </div>
      </div>
    </>
  );
}
export default CardComponent;
