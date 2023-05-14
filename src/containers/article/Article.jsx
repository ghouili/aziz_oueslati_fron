import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";
import { Card, Chip, Typography } from "@material-tailwind/react";

import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useRef } from "react";

const TABLE_HEAD = [
  "Article serial Number",
  "Article Name",
  "Status",
  "Date of creation",
  "Place",
  "Action",
];

const TABLE_ROWS = [
  {
    serial_number: 225482,
    nom: "test",
    etat: "op01",
    date: "May 14th 2023, 5:01 pm",
    place: "tunis",
    userid: "645889166a6a53986529fce4",
    _id: "64610750394a1de19247c55b",
  },
  {
    serial_number: 225482,
    nom: "test",
    etat: "op01",
    date: "May 14th 2023, 5:01 pm",
    place: "tunis",
    userid: "645889166a6a53986529fce4",
    _id: "64610750394a1de19247c55b",
  },
];

const Article = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");

  const [openModal, setOpenModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [serial_number, setSerial_number] = useState(null);
  const [nom, setNom] = useState("");
  const [etat, setEtat] = useState("");
  const [place, setPlace] = useState("");
  const [userid, setUserid] = useState("");
  const [id, setId] = useState(null);

  const [data, setData] = useState([]);

  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState([]);

  /// fitering data using seaarch input ::
  const searchFilter = (text) => {
    if (text) {
      const NewData = masterData.filter((item) => {
        const itemData = item.nom ? item.nom.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(NewData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const fetchdata = async () => {
    const result = await axios.get(`http://localhost:5000/article/`);
    setData(result.data.data);
    setMasterData(result.data.data);
    setfilterData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const CloseModal = async () => {
    setSerial_number(null);
    setNom("");
    setEtat("");
    setPlace("");
    setUserid("");
    setId(null);
    setOpenModal(false);
  };

  const onchange = (e) => {
    if (e.target.name === "serial") {
      setSerial_number(e.target.value);
    } else if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "etat") {
      setEtat(e.target.value);
    } else if (e.target.name === "place") {
      setPlace(e.target.value);
    }
  };

  const update = (item) => {
    setId(item._id);
    setSerial_number(item.serial_number);
    setNom(item.nom);
    setEtat(item.etat);
    setPlace(item.place);
    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (serial_number === "" || nom === "" || etat === "" || place === "") {
      return swal("Error!", "check your Inputs", "error");
    }

    let url, meth;
    if (id) {
      url = `http://localhost:5000/article/${id}`;
      meth = "PUT";
    } else {
      url = `http://localhost:5000/article/add`;
      meth = "POST";
    }
    try {
      // let date = await moment().format('MMMM Do YYYY, h:mm:ss a');
      const response = await fetch(url, {
        method: meth,
        headers: {
        "Content-Type": "application/json",
        // "accept": "*/*"
        },
        body: JSON.stringify({
          serial_number,
          nom,
          etat,
          date: moment().format("MMMM Do YYYY, h:mm a"),
          place,
          userid: user._id,
        }),
      });

      const result = await response.json();

      console.log(result);
      if (result.success === true) {
        swal("Success!", result.message, "success");
        fetchdata();
        CloseModal();
      } else {
        return swal("Error!", result.message, "error");
      }
    } catch (error) {
      console.error(error);
      return swal(
        "Error!",
        "Something went wrong. Please try again later.",
        "error"
      );
    }
  };

  const delete_article = async (id) => {
    const result = await axios.delete(`http://localhost:5000/article/${id}`);

    if (result.data.success === true) {
      swal("Poof! Utilisateur supprimé avec succés!", {
        icon: "success",
      });
      fetchdata();
    } else {
      swal("Error!", result.data.message, "warning");
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4 p-6">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-white rounded-md">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Articles</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(!openModal)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Add Article
            </span>
          </button>
        </div>
      </div>
      {/*
      <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
         {filterData
          .slice(0)
          .reverse()
          .map(({ _id, serial_number, nom, etat, date, place, userid }) => {
            return (
              <div
                key={_id}
                className="relative shadow-md pb-2 bg-white rounded-md "
              >
                <div className=" overflow-hidden rounded-t-md h-52">
                  <img
                    src={`http://localhost:5000/uploads/images/${picture}`}
                    alt="product_pic"
                    className="aspect-h-2 aspect-w-3 h-full w-full object-cover object-center "
                  />
                </div>
                <div className="mt-4 flex justify-between px-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-700">
                      <span className="" />
                      serial_number
                    </h3>
                    <p className="-mt-1 text-sm text-gray-500">etat</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">name</p>
                  <p className="text-sm font-medium text-gray-900">date</p>
                  <p className="text-sm font-medium text-gray-900">place</p>
                </div>
                <div className="w-full border my-2"></div>
                <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 my-1">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                    onClick={() =>
                      update({
                        _id,
                        serial_number,
                        nom,
                        etat,
                        date,
                        place,
                        userid,
                      })
                    }
                  >
                    <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      <BsPencilSquare />
                      Update
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => delete_article(_id)}
                    className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                  >
                    <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      <IoTrashOutline />
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })} */}
      <div className="w-full">
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" text-center font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0).reverse().map(
                ({ _id, serial_number, nom, etat, date, place, userid }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-2"
                    : "p-2 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={`text-center ${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {serial_number}
                        </Typography>
                      </td>
                      <td className={`text-center ${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nom}
                        </Typography>
                      </td>

                      <td className={`flex flex-row justify-center text-center ${classes}`}>
                      <Chip variant="ghost" value={etat} />
                      </td>
                      <td className={`text-center ${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={`text-center ${classes}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {place}
                        </Typography>
                      </td>

                      <td className={`flex flex-row justify-center ${classes}`}>
                        <button
                          type="button"
                          className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 mr-1 "
                          onClick={() =>
                            update({
                              _id,
                              serial_number,
                              nom,
                              etat,
                              date,
                              place,
                              userid,
                            })
                          }
                        >
                          <span className="relative flex items-center gap-1  px-1 py-0.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                            <BsPencilSquare />
                            Update
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => delete_article(_id)}
                          className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                        >
                          <span className="relative flex items-center gap-1 px-1 py-0.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                            <IoTrashOutline />
                            Delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Modal */}
      {!openModal ? null : (
        <>
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-50 transition-opacity md:block " />
          <div
            className="absolute top-10 right-1/4 w-fit h-fit bg-white border rounded-md shadow-xl p-6 overflow-y-auto 
          z-10"
            style={{ maxHeight: "88vh", width: "60vw" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="grid grid-cols-2 gap-4">
                  {/* serial number */}
                  <div className="">
                    <label
                      for="serialID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Serial Number:
                    </label>
                    <input
                      type="number"
                      name="serial"
                      id="serialID"
                      value={serial_number}
                      onChange={(e) => onchange(e)}
                      placeholder="Serial Number"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {/* article name */}
                  <div className="">
                    <label
                      for="nomID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Article Name:
                    </label>
                    <input
                      type="text"
                      name="nom"
                      id="nomID"
                      value={nom}
                      onChange={(e) => onchange(e)}
                      placeholder="Name"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* article place */}
                  <div className="">
                    <label
                      for="placeID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Place:
                    </label>
                    <input
                      type="text"
                      name="place"
                      id="placeID"
                      value={place}
                      onChange={(e) => onchange(e)}
                      placeholder="Place"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {/* status */}
                  <div className="">
                    <label
                      for="etatID"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status:
                    </label>
                    {/* <input
                      type="text"
                      name="etat"
                      id="etatID"
                      value={etat}
                      onChange={(e) => onchange(e)}
                      placeholder="etat"
                      /> */}
                    <select
                      name="etat"
                      id="etatID"
                      value={etat}
                      onChange={(e) => onchange(e)}
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="op1">option 01</option>
                      <option value="op2">option 02</option>
                      <option value="op3">option 03</option>
                    </select>
                  </div>
                </div>
                <div className="w-full flex gap-6 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => CloseModal()}
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
