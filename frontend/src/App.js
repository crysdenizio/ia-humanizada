import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import AIDemo from "./components/sections/AIDemo";
import Benefits from "./components/sections/Benefits";
import Clinics from "./components/sections/Clinics";
import Testimonials from "./components/sections/Testimonials";
import Plans from "./components/sections/Plans";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";
import FloatingWhatsApp from "./components/sections/FloatingWhatsApp";
import FloatingAIChat from "./components/sections/FloatingAIChat";

const Home = () => {
  return (
    <main className="bg-black min-h-screen text-white" data-testid="home-page">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <AIDemo />
      <Benefits />
      <Clinics />
      <Testimonials />
      <Plans />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
      <FloatingAIChat />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
