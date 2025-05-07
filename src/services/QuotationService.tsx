
import { ApiService } from './ApiService';
import { QuotationRequest, QuotationResponse } from '../dtos/quotation.dto';

export class QuotationService {
  private static instance: QuotationService;
  private api: ApiService;

  private constructor() {
    this.api = new ApiService();
  }

  static getInstance(): QuotationService {
    if (!QuotationService.instance) {
      QuotationService.instance = new QuotationService();
    }
    return QuotationService.instance;
  }

  async createQuotation(request: QuotationRequest): Promise<QuotationResponse> {
    try {
      const response = await this.api.post('/quotations', request);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create quotation');
    }
  }

  async getQuotations(filters?: Record<string, any>): Promise<QuotationResponse[]> {
    try {
      const response = await this.api.get('/quotations', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch quotations');
    }
  }
}

export default QuotationService.getInstance();
