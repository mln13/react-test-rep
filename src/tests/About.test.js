import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Teste About', () => {
  it('Testa se há heading 2 com texto About Pokédex', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const aboutHeading2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading2).toBeInTheDocument();
  });
  it('Testa a página contém as informações sobre a Pokédex', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    const text = screen.getAllByText(/Pokémons/i);
    text.forEach((param) => expect(param).toBeInTheDocument());
  });
  it('Testa se a página contém dois parágrafos', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    const pa = screen.getAllByText(/pokémons/i);
    expect(pa).toHaveLength(2);
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const imagem = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
