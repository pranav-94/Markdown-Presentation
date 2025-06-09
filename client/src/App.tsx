import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import EditSlide from "./routes/EditSlide";
import PresentSlide from "./routes/PresentSlide";
import SlideList from "./routes/SlideList";
import EditSlide from "./routes/EditSlide";
import AddSlide from "./routes/AddSlide";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlideList />} />
        <Route path="/edit/:id" element={<EditSlide />} />
        <Route path="/present/:id" element={<PresentSlide />} />
        <Route path="/create" element={<AddSlide />} />
      </Routes>
    </Router>
  );
}

export default App;
