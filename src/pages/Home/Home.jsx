import React from "react";
// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../../components/Card/Card";

import { Link } from "react-router-dom";
// import Loading from "./../component/Loading";

import axiosInstance from "../../Network/Config";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  let stateuserid = useSelector((state) => state.login.userId);

  const [kitchens, setKitchens] = useState([]);
  const userId = useParams();
  // console.log(userId.userid);

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

  const param = useParams();
  return (
    <>
      <SearchBar />
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="http://localhost:8080/avatars/images/slider1.jpg"
              className="d-block w-100 sliderImg"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="http://localhost:8080/avatars/images/slider3.jpg"
              className="d-block w-100 sliderImg"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="http://localhost:8080/avatars/images/slider2.jpg"
              className="d-block w-100 sliderImg"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="contain-menu">
        <h6 className="my-3"> Kitchens Menu</h6>
        <div className="row row-cols-1 row-cols-md-4 g-0 ">
          {kitchens.map((kitchen) => {
            return (
              <div
                className={kitchen.menuId === 0 ? "col hide" : "col"}
                key={kitchen._id}
              >
                <div className="m-3">
                  <CardComponent kitchen={kitchen} param={param} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
