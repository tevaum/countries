import React from 'react';

export const Country = ({ name, capital, flag }) => (
    <figure className="country">
        <img src={flag.svgFile} alt="sample108" />
        <figcaption>
            <h3 className="name">{name}</h3>
            <p className="capital">{capital}</p>
        </figcaption>
    </figure>
);
