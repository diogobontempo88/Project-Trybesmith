import connection from '../models/connection';
import ProductModel from '../models/productModel';
import Product from '../interfaces/product';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const product = await this.model.getAll();
    return product;
  }

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }
}

export default ProductService;