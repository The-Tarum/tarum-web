
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetailPage from '../../pages/ProductDetailPage';

describe('ProductDetailPage', () => {
  test('renders product details', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    expect(getByText('Sample Product')).toBeInTheDocument();
    expect(getByText('Specifications')).toBeInTheDocument();
  });
});
