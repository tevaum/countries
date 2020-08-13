import React from 'react';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { COUNTRY_LIST} from "./countrylist/CountryList";
import App from './App';

test('nothing', async () => {
  const mocks = [{
    request: {
      query: COUNTRY_LIST
    },
    error: new Error('Oops!')
  }];

  const doc = render(
    <MockedProvider mocks={mocks} addTypename={false} >
      <App />
    </MockedProvider>
  );

  expect(doc.getByText('Countries')).toBeInTheDocument();
  expect(doc.getByText('Loading...')).toBeInTheDocument();

  await act(() => doc.findByText('Error!'));
})

