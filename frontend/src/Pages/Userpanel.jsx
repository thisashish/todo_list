//imports
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { FaPen, FaTrashAlt, FaCheckSquare } from "react-icons/fa";

export const Userpanel = () => {
  const [user, setuser] = useState([]);
  const [todo, settodo] = useState();
  const [todoarray, settodoarray] = useState([]);
  const [uniquedate, setuniquedate] = useState([]);
  useEffect(() => {
    const userauth = async () => {
      const res = await axios.get("/authenticate", {
        withCredentials: true,
        headers: {
          Accept: "application.json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      if (res.data === "error") {
        window.location.href = "/login";
      } else {
        if (res.data.isAdmin === true) {
          window.location.href = "/adminpanel";
        } else {
          setuser(res.data);
        }
        settodoarray(res.data.todo);
        let result = res.data.todo.map((a) => new Date(a.date).getDate());
        // console.log(result)
        var outputArray = [];

        function removeusingSet(arr) {
          let outputArray = Array.from(new Set(arr));
          return outputArray;
        }

        setuniquedate(removeusingSet(result));
      }
    };
    userauth();
  }, []);
  const handleaddtodo = async () => {
    const res = await axios.post("/add/todo", { todo: todo, id: user._id });
    if (res.data === "submitted") {
      window.location.reload();
    }
  };
  const handletododelete = async (e) => {
    const res = await axios.post("/delete/todo", {
      todo: e.target.value,
      id: user._id,
    });
    if (res.data === "deleted") {
      window.location.reload();
    }
  };
  const handletodoupdate = async (e) => {
    const res = await axios.post("/update/todo", {
      todo: e.target.value,
      id: user._id,
    });
    if (res.data === "updated") {
      window.location.reload();
    }
  };
  const handlecheck = async (e) => {
    e.preventDefault();

    const res = await axios.post("/update/todo/completed", {
      id: user._id,
      todo: e.target.value,
    });
    if (res.data === "updated") {
      window.location.reload();
    }
  };
  const handlelogout = async () => {
    await axios.get("/logout", {
      withCredentials: true,
      headers: {
        Accept: "application.json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  };
  return (
    <>
      {user.length !== 0 && (
        <div className="userpanel">
          <div className="header">
            <div className="header_leftbar">
              <img className="header_leftbar_logo" src="/images/logo.png" />
            </div>
            <div className="header_rightbar">
              <a className="header_rightbar_link">Hi {user.name}</a>
              <div className="header_rightbar_hover">
                <a className="header_rightbar_profile" href="/profile">
                  Profile
                </a>
                <button
                  className="header_rightbar_logout"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="userpanel_content">
            <form className="userpanel_form">
              <label className="userpanel_form_label">Let's Start</label>

              <div className="userpanel_input_div">
                <input
                  className="userpanel_form_input"
                  type="text"
                  placeholder="enter your task"
                  onChange={(e) => {
                    settodo(e.target.value);
                  }}
                  required
                />
                <button
                  className="userpanel_form_button"
                  onClick={handleaddtodo}
                  type="submit"
                >
                  +
                </button>
              </div>
            </form>

            <div>
              {uniquedate.map((u) => (
                <>
                  <h3>{u}</h3>
                  {todoarray.map((t) => (
                    <>
                      {u === new Date(t.date).getDate() && (
                        <div className="userpanel_todoarray">
                          <button
                            value={t.todo}
                            className={
                              t.completed === "false"
                                ? "button_chekbox"
                                : "button_chekbox_checked"
                            }
                            onClick={handlecheck}
                          >
                            <FaCheckSquare className="userpanel_todoarray_button_check_icon" />
                          </button>

                          <div className="userpanel_todo_edit">
                            <p> {new Date(t.date).getDate()}</p>
                            <input
                              className="userpanel_todo_edit_input"
                              defaultValue={t.todo}
                            />

                            <button
                              className="userpanel_todo_edit_delete"
                              value={t.todo}
                              onClick={handletododelete}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
