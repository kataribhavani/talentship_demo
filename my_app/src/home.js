import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [existingReminders, setExistingReminders] = useState([]);
  const [onDelete, setOnDelete] = useState(false);
  const [reFetchGetReminder, setRefetchGetReminder] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get_reminders`)
      .then((response) => setExistingReminders(response.data));
  }, [reFetchGetReminder]);
  const history = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div>
        {location?.state?.message && (
          <span className="flex justify-center bg-green-600 items-center rounded m-4 border-2 space-x-2 border-green-600 text-white p-1">
            <span>
              <FontAwesomeIcon icon={faCheckCircle} size={"lg"} />
            </span>
            <span>{location?.state?.message}</span>
          </span>
        )}
      </div>
      <div>
        <span className="grid grid-cols-4 gap-x-4 m-4">
          {existingReminders?.map((reminder, idx) => {
            return (
              <span
                key={idx}
                className="flex justify-between my-4 border-2 border-sky-500 rounded p-1 w-full h-32"
              >
                <span>{reminder.title}</span>
                <span className="flex flex-row space-x-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={`${
                        !onDelete
                          ? "text-blue-500 hover:cursor-pointer"
                          : "text-gray-400"
                      }`}
                      size={"lg"}
                      onClick={(e) => {
                        if (!onDelete) {
                          history(`/update/${reminder?.id}`, {
                            state: reminder,
                          });
                        }
                      }}
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={`${
                        !onDelete
                          ? "text-blue-500 hover:cursor-pointer"
                          : "text-gray-400"
                      }`}
                      size={"lg"}
                      onClick={async (e) => {
                        if (!onDelete) {
                          try {
                            setOnDelete(true);
                            await axios?.delete(
                              `${process.env.REACT_APP_BACKEND_BASE_URL}/delete_reminder/${reminder?.id}`
                            );
                            setOnDelete(false);
                            setRefetchGetReminder(!reFetchGetReminder);
                          } catch (error) {
                            setOnDelete(false);
                          }
                        }
                      }}
                    />
                  </span>
                </span>
              </span>
            );
          })}
        </span>
        <span className="flex justify-center items-center">
          <Link to="/create">
            <span className="bg-blue-500 text-white p-1 rounded-sm">
              Set Reminder
            </span>
          </Link>
        </span>
      </div>
    </div>
  );
}
