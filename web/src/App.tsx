import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import NavBar from "./components/NavBar";
import PersonalFeeds from "./pages/PersonalFeeds";
import Headlines from "./pages/Headlines";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/headlines" element={<Headlines />} />
          <Route path="/personal-feeds" element={<PersonalFeeds />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
