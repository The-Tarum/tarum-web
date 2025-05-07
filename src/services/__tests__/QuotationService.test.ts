
import { QuotationService } from '../QuotationService';
import { QuotationDTO, QuotationStatus } from '../../dtos/quotation.dto';
import ApiService from '../ApiService';

jest.mock('../ApiService');

describe('QuotationService', () => {
  let service: QuotationService;
  
  beforeEach(() => {
    service = new QuotationService();
    jest.clearAllMocks();
  });

  it('should create quotation', async () => {
    const mockData = {
      productId: '123',
      quantity: 100,
      price: 50
    };

    const mockResponse = new QuotationDTO({
      ...mockData,
      id: '1',
      status: QuotationStatus.PENDING,
      supplierId: 'sup1',
      buyerId: 'buy1',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    (ApiService.api.post as jest.Mock).mockResolvedValue({ data: mockResponse });

    const result = await service.createQuotation(mockData);
    expect(result).toBeInstanceOf(QuotationDTO);
    expect(result.status).toBe(QuotationStatus.PENDING);
  });
});
