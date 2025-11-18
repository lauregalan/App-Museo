export interface FossilImage {
  url: string;
  isFront: boolean;
  _id: string;
}

export interface Fossil {
  _id: string;
  name: string;
  description: string;
  photographers: string[];
  images: FossilImage[];
  __v?: number;
}
