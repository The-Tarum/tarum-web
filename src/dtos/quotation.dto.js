
export class QuotationProductDto {
    productName;
    quantity;
    unit;
    manufacturer;
    requirements;
  }
  
  export class QuotationRequestDto {
    products = [];
    deliveryLocation;
    deliverySource;
    payment;
    status = 'OPEN';
    createdAt = new Date();
  }
  
  export class QuotationResponseDto {
    id;
    supplier;
    tdiPrice;
    tdiCost;
    mdiPrice;
    mdiCost;
    deliveryTerms;
    payment;
    totalCost;
    status;
  }
  
export class QuotationItemDto {
  constructor(productId, quantity, unit) {
    this.productId = productId;
    this.quantity = quantity;
    this.unit = unit;
  }

  validate() {
    if (!this.productId) throw new Error('Product ID is required');
    if (!this.quantity || this.quantity <= 0) throw new Error('Valid quantity is required');
    if (!this.unit) throw new Error('Unit is required');
  }
}

export class QuotationRequestDto {
  constructor(items, deliveryLocation, deliveryDate, additionalNotes = '') {
    this.items = items.map(item => new QuotationItemDto(item.productId, item.quantity, item.unit));
    this.deliveryLocation = deliveryLocation;
    this.deliveryDate = deliveryDate;
    this.additionalNotes = additionalNotes;
    this.timestamp = new Date().toISOString();
  }

  validate() {
    if (!this.items.length) throw new Error('At least one item is required');
    this.items.forEach(item => item.validate());
    if (!this.deliveryLocation) throw new Error('Delivery location is required');
    if (!this.deliveryDate) throw new Error('Delivery date is required');
  }
}
