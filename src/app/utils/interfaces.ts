export interface Place {
  address: string;
  alias: string;
  name: string;
  place_id: string
}

export interface PlaceList {
  id: number,
  name: string,
  country: string,
  city: string
}