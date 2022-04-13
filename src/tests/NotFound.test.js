import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('Teste do componente NotFound', () => {
  test('Teste heading h2 com o texto Page requested not found', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    const findHeading2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(findHeading2).toBeInTheDocument();
  });
  test('Teste se a imagem com alt específico existe', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    const pageNotFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pageNotFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
