
import QuotationService from '../QuotationService';
import { ApiService } from '../ApiService';

jest.mock('../ApiService');

describe('QuotationService', () => {
  let mockApiService: jest.Mocked<ApiService>;

  beforeEach(() => {
    mockApiService = new ApiService() as jest.Mocked<ApiService>;
  });

  it('should create quotation successfully', async () => {
    const mockQuotation = {
      productId: '123',
      quantity: 100,
      deliveryLocation: 'NY'
    };

    const mockResponse = {
      data: { id: '1', status: 'pending' }
    };

    mockApiService.post.mockResolvedValueOnce(mockResponse);
    
    const result = await QuotationService.createQuotation(mockQuotation);
    expect(result).toEqual(mockResponse.data);
  });
});
