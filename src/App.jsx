import {useEffect, useState} from 'react';
import {get} from './helpers.js'
import './app.css';
import {Favicon} from './App/Favicon.jsx';

function App()
{
    const [count, setCount] = useState(0);
    const [favicons, setFavicons] = useState([]);

    useEffect(() => {
        get('http://localhost:8000/', {
            action: 'getfavicons',
        }, (data) => {
            if (favicons.length) return // already loaded
            setFavicons(data.map(favicon => ({...favicon, is_selected: false})));
        })
    }, []);

    const handleFaviconClick = (selected_favicon) => {
        const updatedFavicons = favicons.map((favicon) => {
            if (favicon === selected_favicon) {
                // Set browser favicon to the SVG
                const link = document.querySelector('link[rel="icon"]');
                link.href = `data:image/svg+xml,${encodeURIComponent(favicon.svg)}`;

                return { ...favicon, is_selected: true };
            } else {
                return { ...favicon, is_selected: false };
            }
        });
        setFavicons(updatedFavicons);
    }

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <div className="favicons">
                    {favicons.map((favicon, index) => (
                        <Favicon key={index}
                                 favicon={favicon}
                                 onClick={handleFaviconClick}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;