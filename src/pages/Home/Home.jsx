import React from "react";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CardComponent from "../../components/Card/Card";
import { useParams } from "react-router-dom";



import axiosInstance from "../../Network/Config";
import NavBar from "../../components/NavBar/NavBar";
export default function Home() {
  const [kitchens, setKitchens] = useState([]);

  let [load, setLoad] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/kitchen")
      .then((res) => {
        setKitchens(res.data);
       
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
const param = useParams()
  return (
    <>
      <h1>Hello from home page </h1>
      <h6>Menu</h6>

      <div className="row row-cols-1 row-cols-md-4 g-0 ">
        {kitchens.map((kitchen) => {
          return (
            <div className="col" key={kitchen._id}>
              <div className="m-3">
                <CardComponent kitchen={kitchen} param={param} />
                
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
