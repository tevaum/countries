import React from 'react';
import { render, act } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

import { CountryList, COUNTRY_LIST, COUNTRY_SEARCH } from "./CountryList";

describe('CountryList feature tests', () => {
  const countryListErrorMock = {
    request: {
      query: COUNTRY_LIST
    },
    error: new Error('Oops!')
  };

  const Countries = [
    {
      _id: '1',
      name: 'Brasil',
      capital: 'Brasília',
      area: 321,
      population: 123,
      flag: {
        svgFile: 'https://example.com/bra.png'
      },
      topLevelDomains: {
        _id: '1',
        name: '.br'
      }
    },
    {
      _id: '2',
      name: 'Belgica',
      capital: 'Bruchelas',
      area: 321,
      population: 123,
      flag: {
        svgFile: 'https://example.com/bel.png'
      },
      topLevelDomains: {
        _id: '2',
        name: '.be'
      }
    },
    {
      _id: '3',
      name: 'USA',
      capital: 'Washington',
      area: 321,
      population: 123,
      flag: {
        svgFile: 'https://example.com/usa.png'
      },
      topLevelDomains: {
        _id: '3',
        name: '.us'
      }
    }
  ];

  const countryListDataMock = {
    request: {
      query: COUNTRY_LIST,
      variables: {}
    },
    result: {
      data: {
        Country: Countries
      }
    }
  };

  const countrySearchEmptyDataMock = {
    request: {
      query: COUNTRY_SEARCH,
      variables: {
        terms: 'Huvs'
      }
    },
    result: {
      data: {
        Country: Countries.filter(c => c.name.indexOf('Huvs') > -1 || c.capital.indexOf('Huvs') > -1)
      }
    }
  };

  const countrySearchDataUSAMock = {
    request: {
      query: COUNTRY_SEARCH,
      variables: {
        terms: 'USA'
      }
    },
    result: {
      data: {
        Country: Countries.filter(c => c.name.indexOf('USA') > -1 || c.capital.indexOf('USA') > -1)
      }
    }
  };

  const countrySearchDataMock = {
    request: {
      query: COUNTRY_SEARCH,
      variables: {
        terms: 'Br'
      }
    },
    result: {
      data: {
        Country: Countries.filter(c => c.name.indexOf('Br') > -1 || c.capital.indexOf('Br') > -1)
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
      <MockedProvider mocks={[countryListDataMock]} addTypename={false} >
        <CountryList />
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Brasil'));

    expect(doc.queryByText('USA')).toBeInTheDocument();
    expect(doc.getByText('Washington')).toBeInTheDocument();
    expect(doc.queryByText('Loading...')).toBeNull();
  })

  it('should filter the results based on the search terms', async () => {
    const doc = render(
      <MockedProvider mocks={[countryListDataMock, countrySearchDataMock]} addTypename={false}>
        <CountryList />
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('USA'));

    expect(doc.queryByText('Loading...')).toBeNull();    
    const searchInput = doc.getByPlaceholderText('Country name or Capital');
    const searchButton = doc.getByText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    await act(() => UserEvent.type(searchInput, 'Br'));
    act(() => UserEvent.click(searchButton));

    expect(doc.queryByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Brasil'));
    expect(doc.queryByText('USA')).toBeNull();

  })

  it('should filter the results based on the search terms and display country not found', async () => {
    const doc = render(
      <MockedProvider mocks={[countryListDataMock, countrySearchEmptyDataMock]} addTypename={false}>
        <CountryList />
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('USA'));

    expect(doc.queryByText('Loading...')).toBeNull();    
    const searchInput = doc.getByPlaceholderText('Country name or Capital');
    const searchButton = doc.getByText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    await act(() => UserEvent.type(searchInput, 'Huvs'));
    act(() => UserEvent.click(searchButton));

    expect(doc.queryByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('No countries found with this search terms.'));
    expect(doc.queryByText('USA')).toBeNull();
    expect(doc.queryByText('Brasil')).toBeNull();

  })

  it('should filter the results based on the search terms and display USA card', async () => {
    const doc = render(
      <MockedProvider mocks={[countryListDataMock, countrySearchDataUSAMock]} addTypename={false}>
        <MemoryRouter>
          <CountryList />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Brasil'));

    expect(doc.queryByText('Loading...')).toBeNull();    
    const searchInput = doc.getByPlaceholderText('Country name or Capital');
    const searchButton = doc.getByText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    await act(() => UserEvent.type(searchInput, 'USA'));
    act(() => UserEvent.click(searchButton));

    expect(doc.queryByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('USA'));

    expect(doc.queryByText('USA')).toBeInTheDocument();
    expect(doc.queryByText('Brasil')).toBeNull();
    const moreInfoButton = doc.getByText('More Info');
    act(() => UserEvent.click(moreInfoButton));
  })
})
