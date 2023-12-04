import logo from './logo.svg';
import './App.css';
import './login';
import './SignInDoc';
import './SignInPat';
import { Login } from './login';
import { SignInDoc } from './SignInDoc';
import { SignInPat } from './SignInPat';

function App() {
  return (
    <div className="App">
     <SignInPat/>
    </div>
  );
}

export default App;
