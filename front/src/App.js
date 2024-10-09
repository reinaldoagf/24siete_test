import './App.css';
/* import Doctors from './components/Doctors';
import Patients from './components/Patients';
import Appointments from './components/Appointments'; */
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Header from './components/Header';
import Content from './components/Content';
/* import Items from './components/Items'; */


const App = () => {
  return(
   <>
      <SidebarLeft />
      <Header />
      <div className="flex flex-col md:flex-row">
        <div className="w-48 hidden lg:block shrink-0" />
        <div className="grow">
          <Content />
          {/* <Items /> */}
        </div>
        <SidebarRight />
      </div>
    </>
  );
}

export default App;