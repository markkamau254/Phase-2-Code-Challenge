import { useState, useEffect } from "react";
import usersData from "./db.json"; 
import "./App.css";
import Table from "./Table"; 
import Form from "./Form";
import BankLogo from './Bank Building.png'; 

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(usersData.users || []);  
  const keys = ["date", "description", "category", "amount"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) =>
        item[key] && item[key].toString().toLowerCase().includes(query)
      )
    );
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    fetch("https://battlr-backend.vercel.app/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleAddUser = (newUser) => {
    fetch("https://battlr-backend.vercel.app/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser),
    })
    .then((response) => response.json())
    .then((data) => {
      setUsers((prevUsers) => [...prevUsers, data]);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="app">
      <div className="title">THE IRON BANK OF FLATIRON</div>

      <div className="grid"></div>
      <div id="poda">
        <div className="glow"></div>
        <div className="darkBorderBg"></div>
        <div className="white"></div>
        <div className="border"></div>
        <div id="main">
          <input
            placeholder="Search..."
            type="text"
            name="text"
            className="input"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <div id="input-mask"></div>
          <div id="pink-mask"></div>
          <div className="filterBorder"></div>
          <div id="filter-icon">
            <svg
              preserveAspectRatio="none"
              height="27"
              width="27"
              viewBox="4.8 4.56 14.832 15.408"
              fill="none"
            >
              <path
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke="#d6d6e6"
                strokeWidth="1"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <div id="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              height="24"
              fill="none"
              className="feather feather-search"
            >
              <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
              <line
                stroke="url(#searchl)"
                y2="16.65"
                y1="22"
                x2="16.65"
                x1="22"
              ></line>
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#f8e7f8" offset="0%"></stop>
                  <stop stopColor="#b6a9b7" offset="50%"></stop>
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#b6a9b7" offset="0%"></stop>
                  <stop stopColor="#837484" offset="50%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <Form onAddUser={handleAddUser} /> {/* Pass the callback to the Form */}

      <Table data={search(users)} onDelete={handleDelete} /> 

      <div className="footer">
        THE IRON BANK OF FLATIRON 
        <img src={BankLogo} alt="Iron Bank Logo" width="50" height="50" />
      </div>
    </div>
  );
}

export default App;
