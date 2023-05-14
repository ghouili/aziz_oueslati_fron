import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { BsPersonVcard, BsPhone, BsPencilSquare } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { TfiLocationPin } from "react-icons/tfi";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineBadge } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

import { path } from "../../utils/Variables";

const User = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const [openModal, setOpenModal] = useState(false);
  const [picture, setPicture] = useState("");
  const [cin, setCIN] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [adress, setAdress] = useState("");
  const [role, setRole] = useState("responsable");
  const [id, setId] = useState(null);
  const [errors, setErrors] = useState({
    picture: null,
    CIN: null,
    nom: null,
    prenom: null,
    email: null,
    tel: null,
    adress: null,
    role: null,
  });

  const [data, setData] = useState([]);

  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  // handelie uploading image:::
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const fetchdata = async () => {
    const result = await axios.get(`${path}user`);
    setData(result.data.data);
    // console.log(result.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const CloseModal = async () => {
    setPicture("");
    setNom("");
    setPrenom("");
    setCIN("");
    setEmail("");
    setTel("");
    setAdress("");
    setRole("responsable");
    setId(null);
    setPreviewUrl(null);
    setFile(null);

    setOpenModal(false);
  };

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
      if (e.target.value === "") {
        // errors.email = "Please enter a valid email address";
        setErrors((prevState) => ({
          ...prevState,
          nom: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          nom: null,
        }));
      }
    } else if (e.target.name === "prenom") {
      setPrenom(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          prenom: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          prenom: null,
        }));
      }
    } else if (e.target.name === "cin") {
      setCIN(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          cin: "Cin name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          cin: null,
        }));
      }
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          email: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          tel: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          tel: null,
        }));
      }
    } else if (e.target.name === "adress") {
      setAdress(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          adress: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          adress: null,
        }));
      }
    } else if (e.target.name === "role") {
      setRole(e.target.value);
      if (e.target.value === "") {
        // errors.password = "Password must be at least 8 characters long";
        setErrors((prevState) => ({
          ...prevState,
          role: "The name name musnt be empty",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          role: null,
        }));
      }
    }
  };

  const update = (item) => {
    // console.log(item);
    setId(item._id);
    setPicture(item.avatar);
    setNom(item.nom);
    setPrenom(item.prenom);
    setCIN(item.cin);
    setEmail(item.email);
    setTel(item.tel);
    setAdress(item.adress);
    setRole(item.role);

    setOpenModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handelsubmi');
    if (
      errors.email != null ||
      errors.nom != null ||
      errors.prenom != null ||
      errors.cin != null ||
      errors.tel != null ||
      errors.adress != null ||
      errors.qte != null
    ) {
      return swal("Error!", "check your Inputs", "error");
    }

    let url, result;
    const formData = new FormData();
    if (File) {
      // formData.append("image", previewUrl);
      formData.append("avatar", File);
    }
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("cin", cin);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("role", role);
    formData.append("adress", adress);
    formData.append("userid", user._id);

    if (id) {
      url = `${path}user/${id}`;
      result = await axios.put(url, formData);
    } else {
      url = `${path}user/add`;
      result = await axios.post(url, formData);
    }
    console.log(result.data);
    if (result.data.success === true) {
      swal("Success!", result.data.message, "success");
      fetchdata();
      CloseModal();
    } else {
      swal("Error!", result.data.message, "warning");
    }
  };

  const delete_user = async (id) => {
    const result = await axios.delete(`${path}user/${id}`);

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
    <div className="relative flex flex-col gap-4 p-6">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-white rounded-md">
        <div className="flex items-center gap-1 text-sm text-gray-700">
          <Link to="/" className="font-medium hover:text-blue-900">
            Dashboard
          </Link>
          <span className="font-medium">/</span>
          <span className="">Users</span>
        </div>
        <div className="flex gap-4 items-center">
          <button
            className=" relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
            onClick={() => setOpenModal(!openModal)}
          >
            <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Add User
            </span>
          </button>
        </div>
      </div>
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {data
          .slice(0)
          .reverse()
          .map(
            ({ _id, nom, avatar, prenom, tel, cin, email, adress, role }) => {
              return (
                <div
                  key={_id}
                  className="bg-white shadow border rounded-md p-4"
                >
                  <div className="w-full flex justify-center">
                    <img
                      src={`${path}uploads/images/${avatar}`}
                      alt="user Pic"
                      className="w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="w-full flex justify-center gap-4 items-center text-xl font-semibold text-blue-950">
                    <h2>{nom}</h2>
                    <h2>{prenom}</h2>
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 text-sm font-medium text-gray-700">
                    <BsPersonVcard size={20} />
                    <h2>{cin}</h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700">
                    <HiOutlineMail size={20} />
                    <h2>{email}</h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700">
                    <BsPhone size={20} />
                    <h2>{tel}</h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700">
                    <TfiLocationPin size={20} />
                    <h2>{adress} </h2>
                  </div>
                  <div className="w-full flex  items-center  text-gray-700">
                    <MdOutlineBadge size={20} />
                    <h2>{role}</h2>
                  </div>
                  {/* <div className="w-full flex  items-center  text-gray-700">
                    <SlBadge size={20} />
                    <h2>Client</h2>
                  </div> */}

                  <div className="w-full border my-2 "></div>
                  <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg px-5 pt-1">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                      onClick={() =>
                        update({
                          _id,
                          nom,
                          avatar,
                          prenom,
                          tel,
                          cin,
                          email,
                          adress,
                          role,
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
                      onClick={() => delete_user(_id)}
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
            }
          )}
      </div>
      {/* Modal */}
      {!openModal ? null : (
        <div
          className="absolute -top-2 right-1/4 w-fit h-fit bg-white border rounded-md shadow-xl p-6 overflow-y-auto"
          style={{ maxHeight: "88vh" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="">
              {previewUrl ? (
                <div className=" w-40 h-hidden rounded-md shadow-inner mx-auto ">
                  <img
                    src={previewUrl}
                    // src={`https://i.pinimg.com/564x/22/7d/73/227d73d1ca2d45a6b4f196dc916b54a3.jpg`}
                    className="h-full w-full object-cover object-center rounded-md"
                    alt="avatr"
                  />
                </div>
              ) : picture ? (
                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                  <img
                    src={`${path}uploads/images/${picture}`}
                    alt="product_pic"
                    className="h-full w-full object-cover object-center rounded-md"
                  />
                  <label
                    htmlFor="pictureID"
                    className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                  >
                    <BiEdit size={20} />
                    <input
                      type="file"
                      name="picture"
                      id="pictureID"
                      className="hidden"
                      accept=".jpg,.png,.jpeg"
                      ref={filePickerRef}
                      onChange={pickedHandler}
                    />
                  </label>
                </div>
              ) : (
                <div className="w-full flex justify-center items-center pb-6 ">
                  <label
                    htmlFor="pictureID"
                    className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                  >
                    <FiUpload size={30} />
                    <input
                      type="file"
                      name="picture"
                      id="pictureID"
                      className="hidden"
                      accept=".jpg,.png,.jpeg"
                      ref={filePickerRef}
                      onChange={pickedHandler}
                    />
                    <span className="text-gray-700">Select a picture</span>
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {/* company */}
                <div className="w-96">
                  <label
                    htmlFor="nomID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="nom"
                    id="nomID"
                    value={nom}
                    onChange={(e) => onchange(e)}
                    placeholder="Company"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {/* Model */}
                <div className="w-96">
                  <label
                    htmlFor="prenomlID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    fisrt Name:
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenomID"
                    value={prenom}
                    onChange={(e) => onchange(e)}
                    placeholder="Model"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* SOP */}
                <div className="w-96">
                  <label
                    htmlFor="cinID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    cin:
                  </label>
                  <input
                    type="number"
                    name="cin"
                    id="cinID"
                    value={cin}
                    onChange={(e) => onchange(e)}
                    placeholder="CIN"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* EOP */}
                <div className="w-96">
                  <label
                    htmlFor="telID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="number"
                    name="tel"
                    id="telID"
                    value={tel}
                    onChange={(e) => onchange(e)}
                    placeholder="Phone number"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* Capacity */}
                <div className="w-96">
                  <label
                    htmlFor="emailID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    email:
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="emailID"
                    value={email}
                    onChange={(e) => onchange(e)}
                    placeholder="Example@gmail.com"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* Price */}
                <div className="w-96">
                  <label
                    htmlFor="AdressID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adress:
                  </label>
                  <input
                    type="text"
                    name="adress"
                    id="AdressID"
                    value={adress}
                    onChange={(e) => onchange(e)}
                    placeholder="Adress"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                {/* Role */}
                <div className="w-96">
                  <label
                    htmlFor="RoleID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role:
                  </label>
                  <select
                    name="role"
                    id="RoleID"
                    value={role}
                    onChange={(e) => onchange(e)}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="responsable" selected>
                      Responsable
                    </option>
                    <option value="admin">Admin</option>
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
      )}
    </div>
  );
};

export default User;
