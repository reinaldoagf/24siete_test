import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import SidebarLeft from './components/SidebarLeft';
import Header from './components/Header';
import Content from './components/Content';
/* import Items from './components/Items'; */


const App = () => {
  return(
   <>
   <Router>
      <SidebarLeft />
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="w-48 hidden lg:block shrink-0" />
        <div className="grow">
          {/* <Content />
           <Items /> 

 */}
         <Routes>
           <Route path="/" element={<Content />} />
           <Route path="/doctores" element={<Doctors />} />
           <Route path="/dashboard" element={<Content />} />
           <Route path="/citas" element={<Appointments />} />
           <Route path="/pacientes" element={<Patients />} />
         </Routes>
        </div>
      </div>
      </Router>
    </>
  );
}

export default App;