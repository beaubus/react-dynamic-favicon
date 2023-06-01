import {useEffect, useState} from 'react';
import {get} from './helpers.js'
import './app.css';
import {Favicon} from './App/Favicon.jsx';

function App()
{
    const [favicons, setFavicons] = useState([]);

    useEffect(() => {
        get('http://127.0.0.1:8000/', {
            action: 'getfavicons',
        }, (data) => {
            if (favicons.length) return // already loaded

            setBrowserFavicon(data.favicons.find(favicon => favicon.name.toLowerCase() === data.selected.name))

            setFavicons(data.favicons.map(favicon => (
                {...favicon, is_selected: favicon.name.toLowerCase() === data.selected.name}
            )));
        })
    }, []);

    const handleFaviconClick = (selected_favicon) => {
        const updatedFavicons = favicons.map((favicon) => {
            if (favicon === selected_favicon) {
                setBrowserFavicon(favicon) // Set browser favicon to the SVG

                persistFavicon(selected_favicon)

                return { ...favicon, is_selected: true };
            } else {
                return { ...favicon, is_selected: false };
            }
        });
        setFavicons(updatedFavicons);
    }

    const setBrowserFavicon = (favicon) => {
        // Set browser favicon to the SVG
        const link = document.querySelector('link[rel="icon"]');
        link.href = `data:image/svg+xml,${encodeURIComponent(favicon.svg)}`;
    }

    const persistFavicon = (favicon) => {
        if (!favicon?.name) return

        let name = favicon.name.toLowerCase()

        fetch('http://127.0.0.1:8000/?action=selectfavicon', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name
            }),
        })
        .then(result => result.json())
        .then(data => console.log(data) )
        .catch(error => console.log(error?.message ?? error))
    }

    return (
        <>
            <div className="card">
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