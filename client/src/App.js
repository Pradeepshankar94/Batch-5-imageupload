import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Signup } from './components/signup';
import { Signin } from './components/signin';
import { Dashboard } from './components/dashboard';
import { Image } from './components/image';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/image" element={<Image />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
