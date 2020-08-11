import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Country } from './Country';

import './style.css';

export const COUNTRY_LIST = gql`
  query CoutryList {
    Country(first: 50, orderBy: name_asc) {
        _id
        name
        capital
        flag {
            svgFile
        }
    }
  }
`;

export const CountryList = props => {
    const { loading, error, data } = useQuery(COUNTRY_LIST);

    if (loading)
        return <p>Loading...</p>;
    if (error)
        return <p>Error!</p>;

    const countries = data.Country.map(({ _id, ...props }) => (
        <Country key={_id} {...props} />
    ));

    return (
        <div className="country-list">
            {countries}
        </div>
    );
};
