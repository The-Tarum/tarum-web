
export interface IQuotation {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  status: QuotationStatus;
  supplierId: string;
  buyerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum QuotationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED'
}

export class QuotationDTO implements IQuotation {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  status: QuotationStatus;
  supplierId: string;
  buyerId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IQuotation>) {
    this.id = data.id;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.price = data.price;
    this.status = data.status || QuotationStatus.PENDING;
    this.supplierId = data.supplierId;
    this.buyerId = data.buyerId;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }

  toJSON() {
    return {
      id: this.id,
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
      status: this.status,
      supplierId: this.supplierId,
      buyerId: this.buyerId
    };
  }
}
