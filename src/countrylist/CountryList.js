import React from 'react';
import { useQuery } from '@apollo/client';
import { Country } from './Country';

import { gql } from '@apollo/client';

export const COUNTRY_LIST = gql`
  query CoutryList {
    Country(first: 50) {
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
