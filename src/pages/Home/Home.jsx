import React from "react";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../../components/Card/Card";
import { Link } from "react-router-dom";
// import Loading from "./../component/Loading";

import axiosInstance from "../../Network/Config";
export default function Home() {
  const [kitchens, setKitchens] = useState([]);
  const userId = useParams();
  // console.log(userId.userid);
  let [load, setLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/kitchen")
      .then((res) => {
        setKitchens(res.data);
        // console.log(res.data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Hello from home page </h1>
      <Link to={`/user/${userId.userid}`}>My Profile</Link>
      <h6>Menu</h6>

      <div className="row row-cols-1 row-cols-md-4 g-0 ">
        {kitchens.map((kitchen) => {
          return (
            <div className="col" key={kitchen._id}>
              <div className="m-3">
                <CardComponent kitchen={kitchen} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
