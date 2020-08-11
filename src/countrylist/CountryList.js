import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Country } from './Country';
import { useHistory } from 'react-router-dom';

import './style.css';

export const COUNTRY_SEARCH = gql`
  query CountrySearch ($terms: String!) {
    Country(filter: {
        name_contains: $terms OR: {
          capital_contains: $terms
        }
      }, orderBy:name_asc) {
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

export const COUNTRY_LIST = gql`
  query CountryList {
    Country(first: 50, orderBy: name_asc) {
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


export const CountryList = props => {
    const [ terms, setTerms ] = useState('');
    const { loading, error, data } = useQuery(terms.length === 0 ? COUNTRY_LIST : COUNTRY_SEARCH, terms.length === 0 ? { variables: {} } : { variables: { terms }});
    const history = useHistory();

    if (loading)
        return <p>Loading...</p>;
    if (error)
        return <p>Error!</p>;

    const countries = data.Country.map(({ _id, ...props }) => (
        <Country key={_id} {...props} onClick={() => history.push(`/country/${_id}`)}/>
    ));

    const handleSearchClick = event => {
        setTerms(event.currentTarget.parentElement.children[0].value);
    }

    return (
        <React.Fragment>
            <div>
                <input type="text" defaultValue={terms} placeholder="Country name or Capital" />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <div className="country-list">
                {countries.length ? countries : <p>No countries found with this search terms.</p>}
            </div>
        </React.Fragment>
    );
};
