import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './pages/homepage/homepage.jsx';
import Courses from './pages/courses/courses.jsx';
import Footer from './components/footer/footer.jsx';

function App() {
  return (
    <>
      <Header />
      
      {/* Phần nội dung thay đổi dựa theo URL */}
      <div className="content" style={{ padding: '20px' }}>
        <Routes>
          {/* path="/" là trang mặc định */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          
          {/* Route bắt lỗi 404 nếu nhập link linh tinh */}
          <Route path="*" element={<h2>404 - Không tìm thấy trang!</h2>} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
