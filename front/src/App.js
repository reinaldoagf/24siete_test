import './App.css';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import Appointments from './components/Appointments';

function App() {
  return (
    <div className="App">
      <div className="">
        <h1>Medical App</h1>
        <Doctors />
        <Patients />
        <Appointments />
      </div>
    </div>
  );
}

export default App;
