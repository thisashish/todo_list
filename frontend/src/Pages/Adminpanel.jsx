import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Adminpanel = () => {
  const [usersdata, setusersdata] = useState([]);
  const [admin, setadmin] = useState([]);
  useEffect(() => {
    const userauth = async () => {
      const res = await axios.get('/authenticate', {
        withCredentials: true,
        headers: {
          Accept: 'application.json',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      if (res.data === 'error') {
        window.location.href = '/login';
      } else {
        if (res.data.isAdmin === true) {
          setadmin(res.data);
        } else {
          window.location.href = '/login';
        }
      }
    };
    userauth();
    const findusersdata = async () => {
      const res = await axios.get('/find/usersdata');
      setusersdata(res.data);
    };
    findusersdata();
  }, []);
  const handleremoveuser = async (e) => {
    const res = await axios.post('/remove/user/byid', {
      id: e.target.value,
    });
    if (res.data === 'Deleted') {
      window.location.reload();
    }
  };

  return (
    <div>
      {admin.length !== 0 && (
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phoneno</th>
            <th>role</th>
          </tr>
          {usersdata.map((u) => (
            <tr>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>
                <button value={u._id} onClick={handleremoveuser}>
                  Remove user
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};
