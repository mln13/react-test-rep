import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexHeading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const arrayPokemon = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
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
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
    },
    {
      id: 10,
      name: 'Caterpie',
      type: 'Bug',
      averageWeight: {
        value: '2.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 30',
          map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
        },
        {
          location: 'Johto Route 31',
          map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
        },
        {
          location: 'Ilex Forest',
          map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
        },
        {
          location: 'Johto National Park',
          map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
        },
      ],
    }];
    const proximoButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    arrayPokemon.forEach((pokemon) => {
      const nomeScreenPokemon = screen.getByText(pokemon.name);
      expect(nomeScreenPokemon).toBeInTheDocument();
      userEvent.click(proximoButton);
    });
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonIdOnScreen = screen.getAllByTestId('pokemon-name');
    expect(pokemonIdOnScreen).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(buttonType).toHaveLength(seven);
  });

  it('Teste se botões de filtro funcionam', () => {
    renderWithRouter(<App />);
    const arrayButton = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    arrayButton.forEach((type) => {
      const buttonType = screen.getByRole('button', {
        name: type,
      });
      const pokemonTypeDisplayed = screen.getByTestId('pokemon-type');

      expect(buttonType).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();

      userEvent.click(buttonType);

      expect(pokemonTypeDisplayed).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
    });
  });
  it('Teste se a Pokédex contém um botão All que reseta o filtro', () => {
    renderWithRouter(<App />);
    const filterResetButton = screen.getByRole('button', {
      name: /All/i,
    });
    const testDragonButton = screen.getByRole('button', {
      name: /Dragon/i,
    });
    const pokemonOnScreen = screen.getByTestId('pokemon-type');
    expect(pokemonOnScreen).toBeInTheDocument();
    expect(pokemonOnScreen.innerHTML).toBe('Electric');

    userEvent.click(testDragonButton);
    expect(pokemonOnScreen.innerHTML).toBe('Dragon');

    userEvent.click(filterResetButton);
    expect(pokemonOnScreen.innerHTML).toBe('Electric');
  });
});
