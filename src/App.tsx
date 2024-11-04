import React from 'react';
import {AppRoutes} from "./routes";
import {AppProvider} from "./providers/AppProvider.tsx";
import './styles/App.css';


const App: React.FC = () => {
    return (
        <AppProvider>
            <AppRoutes/>
        </AppProvider>
    );
};

export default App;