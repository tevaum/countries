import React from 'react';

export const Country = ({ name, capital, flag, onClick }) => (
    <figure className="country" onClick={onClick}>
        <img src={flag.svgFile} alt={`${name}'s flag`} />
        <figcaption>
            <h3 className="name">{name}</h3>
            <p> Capital: <span className="capital">{capital}</span></p>
        </figcaption>
        <button>More Info</button>
    </figure>
);
