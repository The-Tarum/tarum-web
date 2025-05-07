
export interface QuotationRequest {
  productId: string;
  quantity: number;
  deliveryLocation: string;
  deliveryDate: string;
  notes?: string;
}

export interface QuotationResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  supplier: {
    id: string;
    name: string;
    logo: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  terms: {
    delivery: string;
    payment: string;
  };
  createdAt: string;
  updatedAt: string;
}
