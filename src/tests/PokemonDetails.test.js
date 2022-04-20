import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 7', () => {
  const moreDetails = 'More details';
  it('Teste se há um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(pokemonDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    const detailsPokemon = screen.getByText(`${pokemonName.innerHTML} Details`);
    expect(detailsPokemon).toBeInTheDocument();

    const nullDetailLink = screen.queryByRole('link', {
      name: moreDetails,
    });
    expect(nullDetailLink).toBeNull();
  });
  it(' Teste se há um heading h2 com o texto Summary.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(pokemonDetails);

    const headerDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(headerDetails).toBeInTheDocument();
  });
  it('Teste se há um parágrafo com o resumo do Pokémon específico ', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(pokemonDetails);
    const pokemonSummary = screen
      .getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pokemonSummary).toBeInTheDocument();
  });
  it('Testa se há seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(pokemonDetails);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonHabitat = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemonName.innerHTML}`,
    });
    expect(pokemonHabitat).toBeInTheDocument();

    const pokemonMap = screen.getAllByAltText(`${pokemonName.innerHTML} location`);
    expect(pokemonMap).toHaveLength(2);
    expect(pokemonMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(pokemonDetails);

    const favoriteCheckBox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).toBeInTheDocument();
  });
});
