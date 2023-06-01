export const Favicon = ({ favicon, onClick }) => {
    const handleClick = () => {
        onClick(favicon);
    }

    return (
        <div className={`favicon ${favicon.is_selected ? 'is-selected' : ''}`}
             onClick={handleClick}
        >
            <div dangerouslySetInnerHTML={{ __html: favicon.svg }} />
            <p>{favicon.name}</p>
        </div>
    );
}