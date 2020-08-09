import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { CountryList, COUNTRY_LIST } from "./CountryList";
import { act } from 'react-dom/test-utils';

describe('CountryList feature tests', () => {
  const countryListErrorMock = {
    request: {
      query: COUNTRY_LIST
    },
    error: new Error('Oops!')
  };

  const countryListDataMock = {
    request: {
      query: COUNTRY_LIST
    },
    result: {
      data: {
        Country: [
          {
            _id: 1,
            name: 'Brasil',
            capital: 'Brasília',
            flag: {
              svgFile: 'https://example.com/bra.png'
            }
          }
        ]
      }
    }
  };

  it('should render CountryList and display an error', async () => {
    const doc = render(
      <MockedProvider mocks={[countryListErrorMock]} addTypename={false}>
        <CountryList />
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Error!'));

    expect(doc.queryByText('Error!')).toBeInTheDocument();
    expect(doc.queryByText('Loading...')).toBeNull();
  })

  it('should render CountryList, display a loading indicator and then the data', async () => {
    const doc = render(
      <MockedProvider mocks={[countryListDataMock]}>
        <CountryList />
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Brasil'));

    expect(doc.queryByText('Brasil')).toBeInTheDocument();
    expect(doc.getByText('Brasília')).toBeInTheDocument();
    expect(doc.queryByText('Loading...')).toBeNull();
  })
})
