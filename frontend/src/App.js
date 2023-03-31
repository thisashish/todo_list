import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Adminpanel } from './Pages/Adminpanel';
import { Userpanel } from './Pages/Userpanel';
import {Profile} from './Pages/Profile';
import {Page404} from './Pages/Page404';
function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Userpanel />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminpanel" element={<Adminpanel />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
