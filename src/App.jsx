import {useEffect, useState} from 'react';
import {get} from './helpers.js'
import './app.css';

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

    return (
        <>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <div className="favicons">
                    {favicons.map((favicon, index) => (
                        <div key={index} className="favicon">
                            <div dangerouslySetInnerHTML={{ __html: favicon.svg }} />
                            <p>{favicon.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;