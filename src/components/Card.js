import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Card.modules.css";
import "./Form.modules.css";
import "./Profile.modules.css";

const Card = () => {
  const url = "https://api.github.com/users";
  const [data, setData] = useState({});
  const [width, setWidth] = useState(174);
  const inputRef = useRef();
  const [username, setUsername] = useState("");

  const getWidth = () => {
    const { offsetWidth } = document.getElementById("name");
    setWidth(offsetWidth);
  };

  const fetchURL = async (username) => {
    const { data } = await axios.get(`${url}/${username}`);
    setData(data);

    getWidth();
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchURL(username);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const fetchURL = async () => {
      const { data } = await axios.get(`${url}/uvacoder`);
      setData(data);
    };

    fetchURL();
  }, []);

  return (
    <div className="card">
      {/* FORM STARTS HERE */}
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Type a username then press 'Enter'"
          ref={inputRef}
          onKeyPress={handleEnter}
        />
      </form>

      {/* PROFILE STARTS HERE */}
      {data.name ? (
        <>
          <div className="profile">
            <img src={data.avatar_url} />
            <br />
            <h1>{data.name}</h1>
            <p>@{data.login}</p>
            <span id="name" style={{ visibility: "hidden" }}>
              {data.name}
            </span>

            <div style={{ width: width }}>
              {data.company ? (
                <div>
                  <i className="far fa-building" style={{ fontSize: 14 }} />
                  <p>{data.company}</p>
                </div>
              ) : null}

              <div>
                <i className="fas fa-map-marker-alt" />
                <p>{data.location ? data.location : "Somewhere out there"}</p>
              </div>

              <div>
                <i className="fas fa-link" style={{ fontSize: 12 }} />
                <p>
                  <a href={data.blog} target="__blank">
                    Website
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="stats">
            <div>
              <h2>{data.followers}</h2>
              <p>Followers</p>
            </div>
            <div>
              <h2>{data.following}</h2>
              <p>Following</p>
            </div>
            <div>
              <h2>{data.public_repos}</h2>
              <p>Repository</p>
            </div>
          </div>
        </>
      ) : (
        <div className="profile">
          <img src={data.avatar_url} />
          <br />
          <span id="name">User not found</span>
          <p>Enter another username</p>
        </div>
      )}
    </div>
  );
};

export default Card;
