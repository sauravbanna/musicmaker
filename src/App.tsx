import MusicMakerView from "./views/MusicMakerView/view/MusicMakerView"
import ProfileView from "./views/ProfileView/view/ProfileView"
import LoginView from "./views/LoginRegisterView/view/LoginView"
import RegisterView from "./views/LoginRegisterView/view/RegisterView"
import HomePageView from "./views/HomePageView/view/HomePageView"
import LogOutDialog from "./views/LogOutDialog/view/LogOutDialog"
import UploadDialog from "./views/UploadDialog/view/UploadDialog"
import {Routes, Route, useLocation} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { APP_COLOR } from "./utils/constants"
import NavBar from "./components/NavBar/NavBar"
import AppTheme from "./AppStyles"
import {useEffect} from 'react'



function App() {
  document.body.style.backgroundColor = APP_COLOR;

  let url : any = useLocation();

  let backgroundPage = url.state && url.state.background;

  return (
    <ThemeProvider theme={AppTheme}>
        <NavBar />
        <Routes location={backgroundPage || url}>
            <Route path="/" element={<HomePageView />} />
            <Route path="/user/:username" element={<ProfileView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/create" element={<MusicMakerView />} />

        </Routes>

        <Routes>
            <Route path="/logout" element={<LogOutDialog prevLink={backgroundPage}/>} />
            <Route path="/upload" element={<UploadDialog prevLink={backgroundPage} />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;


