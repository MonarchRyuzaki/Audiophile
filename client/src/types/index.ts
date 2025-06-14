export interface Image {
    mobile: string;
    tablet: string;
    desktop: string;
  }
  
export interface Product {
    category: string;
    categoryImage: Image;
    description: string;
    features: string;
    gallery: {
      first: Image,
      second: Image,
      third: Image
    }
    id: number;
    image: Image;
    includes: {item: string; quantity: number; _id: string}[]
    name: string;
    new: boolean;
    others: {name: string; image: Image; slug: string; _id: string}[]
    slug: string;
    price: string;
    _id: string;
  }
  
  
export interface FetchError {
    message: string;
    status: number;
    text: string;
  }

export interface CartItem {
    slug: string;
    name: string;
    count: number;
    image: string;
    category: string;
    price: number;
  }

export interface LoaderData {
    productsPromise?: Promise<Product[]>
    productPromise?: Promise<Product>
  }

export interface CheckoutFormCartData {
  slug: string; 
  name: string; 
  price: number; 
  quantity: number
}  

export interface CheckoutFormData {
  name: string;
  phoneNumber: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentMethod: string;
  totalAmount: number;
  cartData: CheckoutFormCartData[];
}

export interface ActionData {
  success: boolean;
  messages?: string[];
  message?: string;
  order?: any;
  status?: string;
}