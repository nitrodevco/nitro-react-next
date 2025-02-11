import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import { NitroConfig } from './utils';

const root = createRoot(document.getElementById('root'));

root.render(
    <NitroConfig>
        <App />
    </NitroConfig>
);
