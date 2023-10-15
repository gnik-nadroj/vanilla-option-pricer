import { useState } from 'react';
import {Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { history } from './helpers/history';
import { AuthState } from './state/GlobalState';
import ComfirmEmail from './views/ConfirmEmail';
import Home from './views/Home';
import Login from './views/Login'
import MyTrades from './views/MyTrades';
import Pricer from './views/Pricer';
import Register from './views/Register';

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    history.navigate = useNavigate();
    history.location = useLocation();
    
    return (
        <div className="App">
            <AuthState.Provider value={[isAuthenticated, setIsAuthenticated]}>
                <Routes>
                    <Route  path="/" element={<Home />} />
                    <Route path="/signIn" element={<Login />} />
                <Route path="/signUp" element={<Register />} />
                <Route path="/confirm" element={<ComfirmEmail />} />
                    <Route
                        path="/pricer"
                        element={
                                <PrivateRoute>
                                    <Pricer />
                                </PrivateRoute>     
                            }
                    />
                    <Route path="/myTrades" element={
                        <PrivateRoute>
                            <MyTrades />
                        </PrivateRoute>} 
                    />
                </Routes>
            </AuthState.Provider>
        </div>
    );
}

