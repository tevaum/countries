import React, { useState } from 'react';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';

import './style.css';

export const COUNTRY_DETAILS = gql`
  query CountryList ($id: String!) {
    Country(_id: $id) {
        _id
        name
        capital
        area
        population
        flag {
            svgFile
        }
        topLevelDomains {
            _id
            name
        }
    }
  }
`;

export const CountryDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(COUNTRY_DETAILS, { variables: { id }});
    const client = useApolloClient();
    const history = useHistory();
    const [ fields, setFields ] = useState({});

    if (loading)
        return <p>Loading...</p>;
    if (error)
        return <p>Error!</p>;

    const country = data.Country[0];
    if (!country)
        return  (
            <React.Fragment>
                <p>Country not found!</p>
                <button onClick={() => history.push('/')}>Back to Listing</button>
            </React.Fragment>
        );

    const handleFieldChange = event => {
        setFields({
            ...fields,
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formFields = event.currentTarget.elements;
        const data = Object.assign({}, country, {
            name: fields.name ? fields.name : formFields.name.value,
            capital: fields.capital ? fields.capital : formFields.capital.value,
            area: fields.area ? fields.area : formFields.area.value,
            population: fields.population ? fields.population : formFields.population.value
        });

        client.writeQuery({
            query: COUNTRY_DETAILS,
            variables: { id },
            data: {Country: [data]}
        })

        history.push('/');
    }

    return (
        <div className="country-details">
            <img src={country.flag.svgFile} alt={`${country.name}'s flag`} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={fields.name ? fields.name : country.name} onChange={handleFieldChange} placeholder="Name" />
                </div>

                <div>
                    <label htmlFor="name">Capital: </label>
                    <input type="text" id="capital" value={fields.capital ? fields.capital : country.capital} onChange={handleFieldChange} placeholder="Capital" />
                </div>

                <div>
                    <label htmlFor="name">Area: </label>
                    <input type="text" id="area" value={fields.area ? fields.area : country.area} onChange={handleFieldChange} placeholder="Area" />
                </div>

                <div>
                    <label htmlFor="name">Populaton: </label>
                    <input type="text" id="population" value={fields.population ? fields.population : country.population} onChange={handleFieldChange} placeholder="Population" />
                </div>

                <div>
                    <label htmlFor="name">TLD: </label>
                    <input type="text" id="tld" value={country.topLevelDomains.map(tld => tld.name).join(', ')} readOnly placeholder="TLD" />
                </div>

                <button type="submit">Update Country Info</button>
                <button onClick={() => history.push('/')}>Back to Listing</button>
            </form>
        </div>
    );
};
