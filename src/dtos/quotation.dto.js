
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
  