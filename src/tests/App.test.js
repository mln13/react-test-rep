import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste links fixos', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const four = 4;
    const links = screen.getAllByRole('link');
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(links).toHaveLength(four);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Testa se o link Home leva ao /', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);
    const redirectHome = screen.getByRole('heading', { level: 1, name: 'Pokédex' });
    expect(redirectHome).toBeInTheDocument();
  });
  it('Testa se o link About leva ao /about', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const redirectAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(redirectAbout).toBeInTheDocument();
  });
  it('Testa se o link FavoritePokemons leva ao /favorite', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);
    const redirectFavorite = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(redirectFavorite).toBeInTheDocument();
  });
  it('Testa se URL desconhecida leva ao NotFound', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/pagenotfound');
    const notFoundLink = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i });
    expect(notFoundLink).toBeInTheDocument();
  });
});
