import HotelDetailsClient from "./HotelDetailsClient";
import { HOTELS } from "../data";

export function generateStaticParams() {
  return HOTELS.map((hotel) => ({ id: hotel.id }));
}

export default function HotelDetailsPage() {
  const hotel = HOTELS[0];

  return <HotelDetailsClient hotel={hotel} />;
}
