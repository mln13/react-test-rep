import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);
    const noFavoritePokemonFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonFound).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const favoritePokemonCheck = screen
      .getByRole('checkbox', { name: /Pokémon favoritado?/i });

    userEvent.click(favoritePokemonCheck);

    const favoritePkmLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoritePkmLink);

    const isDefaultPokemonFavorite = screen.getByText(/Pikachu/i);
    expect(isDefaultPokemonFavorite).toBeInTheDocument();
  });
});
