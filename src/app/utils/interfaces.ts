export interface Place {
  address: string;
  alias: string;
  name: string;
  place_id: string
}

export interface PlaceList {
  id: number,
  name: string,
  city: string,
  country: string,
  lat: number,
  lon: number
}