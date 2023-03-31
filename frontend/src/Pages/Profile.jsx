import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Profile = () => {
  const [user, setuser] = useState([]);
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [mobile, setmobile] = useState();
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
        setuser(res.data);
        setname(res.data.name);
        setmobile(res.data.mobile);
      }
    };
    userauth();
  }, []);
  const handleupdate = async () => {
    const res = await axios.post('/update/userdata', {
      id: user._id,
      name: name,
      mobile: mobile,
      password: password,
    });
    if (res.data === 'updated') {
      window.location.reload();
    }
  };
  return (
    <div>
      <form>
        <label>Name</label>
        <input
          onChange={(e) => {
            setname(e.target.value);
          }}
          defaultValue={user.name}
        />
        <label>Mobile</label>
        <input
          onChange={(e) => {
            setmobile(e.target.value);
          }}
          defaultValue={user.mobile}
        />
        <label>New Password</label>
        <input
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button onClick={handleupdate}>Update</button>
      </form>
    </div>
  );
};
