import React from 'react';
import { render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

import { Country } from "./Country";
import { act } from 'react-dom/test-utils';

describe('CountryList feature: Country component tests', () => {
  it('should render Country', async () => {
    let onClickRuns = 0;
    const doc = render(
        <Country name="Huvs" capital="Nivs" flag={{svgFile: 'Uepa'}} onClick={() => onClickRuns++}/>
    );

    expect(doc.getByText('Huvs')).toBeInTheDocument();
    expect(doc.getByText('Nivs')).toBeInTheDocument();
    const flag = doc.getByRole('img');
    await UserEvent.click(flag);
    expect(onClickRuns).toBe(1);
  })

})
