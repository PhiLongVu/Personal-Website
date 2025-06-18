import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Home, About, Projects, Contact } from "./pages";

const App = () => {
  return (
    <main className="h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
