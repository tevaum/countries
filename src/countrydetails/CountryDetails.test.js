import React from 'react';
import { render, act } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route } from 'react-router-dom';

import { CountryDetails, COUNTRY_DETAILS } from './CountryDetails.js';

describe('CountryDetail frature tests', () => {
  const mocks = [
    {
      request: {
        query: COUNTRY_DETAILS,
        variables: { id: '6' }
      },
      error: new Error('Network Error')
    },
    {
      request: {
        query: COUNTRY_DETAILS,
        variables: { id: '7' }
      },
    	result: {
	      data: {
		      Country: [
		        {
              _id: '7',
              name: 'Israrl',
              capital: 'Jerusalém',
              area: 22072,
              population: 9069960,
              flag: { svgFile: 'huvs' },
              topLevelDomains: [{
                  _id: '7',
                  name: '.il'
              }]
            }
          ]
	      }
	    }
    },
    {
      request: {
        query: COUNTRY_DETAILS,
        variables: { id: '8' }
      },
    	result: {
	      data: {
		      Country: []
	      }
	    }
    }
  ];
  
  it('should render CountryDetails and display an error', async () => {
    const doc = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/country/6']}>
          <Route path="/country/:id" children={<CountryDetails />} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Error!'));

    expect(doc.queryByText('Error!')).toBeInTheDocument();
    expect(doc.queryByText('Loading...')).toBeNull();
  })

  it('should render CountryDetails', async () => {
    const doc = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/country/7']}>
          <Route path="/country/:id" children={<CountryDetails />} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByPlaceholderText('Name'));

    const name = doc.getByPlaceholderText('Name');
    expect(name).toBeInTheDocument();
    expect(name.value).toBe('Israrl');

    await UserEvent.type(name, 'Israel');
    expect(name.value).toBe('Israel');

    const capital = doc.getByPlaceholderText('Capital')
    expect(capital).toBeInTheDocument();
    expect(capital.value).toBe('Jerusalém');
    await UserEvent.type(capital, 'Jesusalém');

    const area = doc.getByPlaceholderText('Area');
    expect(area).toBeInTheDocument();
    expect(area.value).toBe('22072');
    await UserEvent.type(area, '22072');

    const population = doc.getByPlaceholderText('Population');
    expect(population).toBeInTheDocument();
    expect(population.value).toBe('9069960');
    await UserEvent.type(population, '9069960');

    expect(doc.queryByText('Error!')).toBeNull();
    expect(doc.queryByText('Loading...')).toBeNull();

    const updateButton = doc.getByText('Update Country Info');
    act(() => UserEvent.click(updateButton));
  });

  it('should render CountryDetails and display country not found', async () => {
    const doc = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/country/8']}>
          <Route path="/country/:id" children={<CountryDetails />} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Country not found!'));

    expect(doc.getByText('Country not found!')).toBeInTheDocument();
    expect(doc.queryByText('Loading...')).toBeNull();
    expect(doc.queryByText('Error!')).toBeNull();
  })

  it('should render CountryDetails and navigate back to CountryList', async () => {
    const doc = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/country/7']}>
          <Route path="/country/:id" children={<CountryDetails />} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Back to Listing'));

    const backButton = doc.getByText('Back to Listing');
    act(() => UserEvent.click(backButton));

    await act(() => new Promise(resolve => setTimeout(resolve, 0)));
  })

  it('should render country not found and navigate back to CountryList', async () => {
    const doc = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/country/8']}>
          <Route path="/country/:id" children={<CountryDetails />} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(doc.getByText('Loading...')).toBeInTheDocument();

    await act(() => doc.findByText('Back to Listing'));

    const backButton = doc.getByText('Back to Listing');
    act(() => UserEvent.click(backButton));

    await act(() => new Promise(resolve => setTimeout(resolve, 0)));
  })
});
