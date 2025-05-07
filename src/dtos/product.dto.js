
export class ProductDTO {
  static toResponse(data) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      supplier: data.supplier,
      location: data.location,
      terms: data.terms,
      isNew: data.isNew,
      delivery: data.delivery
    };
  }

  static toRequest(data) {
    return {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      categoryId: data.categoryId,
      supplierId: data.supplierId
    };
  }
}
