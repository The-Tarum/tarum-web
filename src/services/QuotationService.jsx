

const BASE_URL = import.meta.env.VITE_QUOTATION_SERVICE;

// Mock data
const mockQuotations = [
  {
    id: 1,
    productName: "Titanium Dioxide",
    quotesReceived: 6,
    image: "https://example.com/titanium.jpg",
    status: "OPEN"
  },
  {
    id: 2,
    productName: "Citric Acid",
    quotesReceived: 13,
    image: "https://example.com/citric.jpg",
    status: "OPEN"
  }
];

const mockResponses = [
  {
    id: 1,
    supplier: "Atlantik Freemex",
    tdiPrice: 2.5,
    tdiCost: 25000,
    mdiPrice: 1.8,
    mdiCost: 27000,
    deliveryTerms: "Exw",
    payment: "30 days",
    totalCost: 50000
  }
];

export const QuotationService = {
  getQuotations: async () => {
    // Simulating API call
    return { data: mockQuotations };
  },

  submitQuotation: async (quotationDto) => {
    // Simulating API call
    return { success: true, quotationId: Math.random().toString(36).substring(7) };
  },

  getQuotationResponses: async (quotationId) => {
    // Simulating API call
    return { data: mockResponses };
  }
};
