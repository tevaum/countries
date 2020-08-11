import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Country } from './Country';

import './style.css';
import { useHistory } from 'react-router-dom';

// export const COUNTRY_LIST = gql`
//   query CoutryList {
//     Country(first: 50, orderBy: name_asc) {
//         _id
//         name
//         capital
//         flag {
//             svgFile
//         }
//     }
//   }
// `;

export const COUNTRY_LIST = gql`
  query CoutryList {
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
        distanceToOtherCountries(first:5, orderBy:distanceInKm_desc) {
            distanceInKm
            countryName
        }
    }
  }
`;


export const CountryList = props => {
    const { loading, error, data } = useQuery(COUNTRY_LIST);
    const history = useHistory();

    if (loading)
        return <p>Loading...</p>;
    if (error)
        return <p>Error!</p>;

    const countries = data.Country.map(({ _id, ...props }) => (
        <Country key={_id} {...props} onClick={() => history.push(`/country/${_id}`)}/>
    ));

    return (
        <div className="country-list">
            {countries}
        </div>
    );
};
