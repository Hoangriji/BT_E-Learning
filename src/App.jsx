import './App.css'
import Register from './pages/contact/register.jsx';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './pages/homepage/homepage.jsx';
import Courses from './pages/courses/courses.jsx';
import Login from './pages/login/login.jsx';
import Footer from './components/footer/footer.jsx';
import Signup from './pages/signup/signup.jsx';
function App() {
  return (
    <>
      <Header />

      {/* Phần nội dung thay đổi dựa theo URL */}

      <Routes>
        {/* path="/" là trang mặc định */}
        <Route path="/" element={
          <div className="content" style={{ padding: '20px' }}>
            <Home />
          </div>
        } />
        <Route path="/courses" element={
          <div className="content" style={{ padding: '20px' }}>
            <Courses />
          </div>
        } />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Route bắt lỗi 404 nếu nhập link linh tinh */}
        <Route path="*" element={<h2>404 - Không tìm thấy trang!</h2>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App;
