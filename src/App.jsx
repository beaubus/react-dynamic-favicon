import {useEffect, useState} from 'react';
import {get} from './helpers.js'
import './app.css';
import {Favicon} from './App/Favicon.jsx';

function App()
{
    const [favicons, setFavicons] = useState([]);

    let selected_favicon = favicons.find(favicon => favicon.is_selected);

    useEffect(() => {
        get('http://127.0.0.1:8000/', {
            action: 'getfavicons',
        }, (data) => {
            if (favicons.length) return // already loaded
            let selected_name = data.selected?.name ?? ''

            if (selected_name) setBrowserFavicon(data.favicons.find(favicon => favicon.name.toLowerCase() === data.selected.name))

            setFavicons(data.favicons.map(favicon => (
                {...favicon, is_selected: favicon.name.toLowerCase() === selected_name}
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


    const unsetFavicon = (favicon) => {
        // Set browser favicon to the SVG
        const link = document.querySelector('link[rel="icon"]');
        link.href = `data:image/svg+xml`;

        // map over your favicons array
        const updatedFavicons = favicons.map(favicon => {
            // if is_selected is true, return a new object where is_selected is false
            if (favicon.is_selected) {
                return { ...favicon, is_selected: false };
            }
            // if is_selected is not true, return the favicon unchanged
            return favicon;
        })

        setFavicons(updatedFavicons);

        fetch('http://127.0.0.1:8000/?action=deletefavicon', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name
            }),
        })
        .then(result => result.json())
        .then(data => console.log(data) )
        .catch(error => console.log(error?.message ?? error))
    }

    const persistFavicon = (favicon) => {
        if (!favicon?.name) return

        console.log({favicon});

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
                <p className="mb-4">
                    Selected: {selected_favicon?.name || 'None'}
                    {selected_favicon && <span className="remove-btn" onClick={unsetFavicon}>❌</span>}
                </p>

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