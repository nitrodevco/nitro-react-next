import { createRoot } from 'react-dom/client';
import { App } from './App';
import { NitroConfigProvider } from './context';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
    <NitroConfigProvider>
        <App />
    </NitroConfigProvider>
);
