import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faBell } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './app.css';

export default function New() {
  const [data, setData] = useState({
    title: "",
    hours: "",
    minutes: "",
    timeFormat: "AM",
    message: "",
    userId: "",
  });

  const history = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const hours = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  return (
    <div className="outside">
      <div className="flex flex-col justify-center items-center font-semibold text-2xl p-4">
        Remind me, please!!!
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setButtonLoading(true);
            const response=await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/create_reminder`, data);
            // console.log(response?.data?.id)
            // const response_id = response?.data?.id
            // console.log(response_id)
            setButtonLoading(false);
            history("/",{state: {
              message: ` Successfully ${response?.data?.status
                ?.toString()
                ?.toLowerCase()} reminder created on ${
                  response?.data?.createdOn} and id is ${response?.data?.id}`
            }});
          } catch (error) {
            setButtonLoading(false);
          }
        }}
      >
        <div className="flex flex-col justify-center items-center space-y-4 max-w-full">
          <span className="flex flex-row justify-center items-center space-x-2">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Add title"
              className="bg-yellow-200 text-black p-1 rounded-sm"
              value={data?.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
          </span>
          <span className="flex flex-col space-y-2">
            <label>Set the time when the message has to be reminded:</label>
            <span className="flex flex-row justify-between">
              <span>
                <FontAwesomeIcon
                  icon={faBell}
                  size={"lg"}
                  className="text-blue-300"
                />
              </span>
              <select
                value={data?.hours}
                onChange={(e) => {
                  setData({ ...data, hours: e.target.value });
                }}
              >
                <option value={"select"}>-select-</option>
                {hours.map((hour, idx) => {
                  return (
                    <option key={idx} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
              <select
                value={data?.minutes}
                onChange={(e) => {
                  setData({ ...data, minutes: e.target.value });
                }}
              >
                <option value={"select"}>-select-</option>
                {minutes.map((minute, idx) => {
                  return (
                    <option key={idx} value={minute}>
                      {minute}
                    </option>
                  );
                })}
              </select>
              <select
                value={data?.timeFormat}
                onChange={(e) => {
                  setData({ ...data, timeFormat: e.target.value });
                }}
              >
                <option value={"AM"}>AM</option>
                <option value={"PM"}>PM</option>
              </select>
            </span>
          </span>
          <span className="flex flex-row justify-center items-start space-x-2">
            <span>
              <FontAwesomeIcon
                icon={faFileLines}
                size={"lg"}
                className="text-blue-300"
              />
            </span>
            <textarea
              placeholder="Write the message..."
              value={data?.message}
              onChange={(e) => {
                setData({ ...data, message: e.target.value });
              }}
            />
          </span>
          <span>
            <input
              type="text"
              placeholder="User Id"
              value={data?.userId}
              onChange={(e) => {
                setData({ ...data, userId: e.target.value });
              }}
            />
          </span>
          {/* <span>
            <input type="text" placeholder="Created on" value={data?.createdOn} onChange={(e)=>{
                setData({...data, createdOn:e.target.value})
              }}/>
          </span>
          <span>
            <input type="text" placeholder="Modified on" value={data?.modifiedOn} onChange={(e)=>{
                setData({...data, modifiedOn:e.target.value})
              }}/>
          </span>
          <span>
            <input type="text" placeholder="Status" />
          </span> */}
          <span>
            <button
              className={`${
                buttonLoading ? "bg-gray-300" : "bg-blue-500"
              } text-white p-1 rounded-sm w-36`}
              type={"submit"}
              disabled={buttonLoading}
              //   onClick={async (e) => {
              //     try{
              //       setButtonLoading(true);
              //       await axios.post('http://localhost:8081/create_reminder', data)
              //       setButtonLoading(false);
              //       history('/');
              //     }
              //     catch (error){
              //       setButtonLoading(false);
              //     }
              //   }}
            >
              {buttonLoading ? "Sending" : "Send Reminder"}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
