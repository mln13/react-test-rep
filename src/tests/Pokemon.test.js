import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste Pokemon.test.js', () => {
  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonInfo = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
    };
    const { averageWeight, type } = pokemonInfo;
    const { value, measurementUnit } = averageWeight;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      alt: `${pokemonName.innerHTML} sprite`,
    });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(type);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', `${pokemonName.innerHTML} sprite`);
  });
  it('Testa o click no link More details', () => {
    renderWithRouter(<App />);
    const pokemonInfo = {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
    };
    const pokemonDetailLink = screen.getByRole('link', {
      name: 'More details',
    });
    expect(pokemonDetailLink).toHaveAttribute('href', `/pokemons/${pokemonInfo.id}`);
    userEvent.click(pokemonDetailLink);
    const detailsPage = screen.getByText('Summary');
    expect(detailsPage).toBeInTheDocument();
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetailLink = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(pokemonDetailLink);
    const favoriteCheckBox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckBox);

    const chosenPokemon = screen.getByTestId('pokemon-name');
    // const starFavoriteIcon = screen.getByAltText('img', {
    //   src: '/star-icon.svg',
    //   alt: `${chosenPokemon.innerHTML} is marked as favorite`,
    // });
    const starFavoriteIcon = screen
      .getByAltText(`${chosenPokemon.innerHTML} is marked as favorite`);
    expect(starFavoriteIcon).toBeInTheDocument();
    expect(starFavoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavoriteIcon)
      .toHaveAttribute('alt', `${chosenPokemon.innerHTML} is marked as favorite`);
  });
});
