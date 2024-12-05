import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import UserDetails from './pages/details';
import Recommend from './pages/Recommend';
import AbhiyanChatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/Services.js" element={<Services />} />
        <Route path="/pages/About.js" element={<About />} />
        <Route path="/pages/Home.js" element={<Home />} />
        <Route path="/pages/Contact.js" element={<Contact />} />
        <Route path="/pages/Registration.js" element={<Registration />} />
        <Route path="/pages/details.js" element={<UserDetails />} />
        <Route path="/pages/Recommend.js" element={<Recommend />} />
        <Route path="/pages/Chatbot.js" element={<AbhiyanChatbot />} />
      </Routes>
    </Router>
  );
}
export default App;
