import './App.css';
import LoginButton from 'components/LoginButton';
import LogoutButton from 'components/LogoutButton';
import Profile from 'components/Profile';
import Form from 'components/Form';

function App() {
  return (
    <div className="App">

    <LoginButton/>
    <LogoutButton/>
    <Profile/>
    <Form/>
    </div>

  );
}

export default App;
