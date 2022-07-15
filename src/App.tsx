import MusicMakerView from "./views/MusicMakerView/view/MusicMakerView"
import ProfileView from "./views/ProfileView/view/ProfileView"
import LoginView from "./views/LoginRegisterView/view/LoginView"
import RegisterView from "./views/LoginRegisterView/view/RegisterView"
import HomePageView from "./views/HomePageView/view/HomePageView"
import {Provider} from 'react-redux'
import store from "./redux/store"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { APP_COLOR } from "./utils/constants"
import NavBar from "./components/NavBar/NavBar"
import AppTheme from "./AppStyles"



function App() {
  document.body.style.backgroundColor = APP_COLOR;

  return (
     <Provider store={store}>
        <ThemeProvider theme={AppTheme}>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<MusicMakerView />} />
                    <Route path="/profile" element={<ProfileView />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                    <Route path="home" element={<HomePageView />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
  );
}

export default App;


