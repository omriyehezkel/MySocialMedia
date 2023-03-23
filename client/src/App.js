import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";


function App() {

  const mode = useS
  return (
    <div className="app">
<BrowserRouter>
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/profile/:userId" element={<ProfilePage />} />//parameter for who user login
    
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
