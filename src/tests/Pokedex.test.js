import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });
  it('', () => {

  });
});
