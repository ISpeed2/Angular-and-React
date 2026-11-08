export const studioTypes = ["Репетиция", "Запись", "Акустика"] as const;
export type StudioType = (typeof studioTypes)[number];
export interface Studio {
  id: string;
  name: string;
  type: StudioType;
  district: string;
  address: string;
  price: number;
  capacity: number;
  area: number;
  description: string;
  equipment: string[];
  color: string;
  managerId: number;
}
export interface Booking {
  id: string;
  studioId: string;
  studioName: string;
  date: string;
  startHour: number;
  duration: number;
  people: number;
  guestName: string;
  phone: string;
  total: number;
  status: "active" | "cancelled";
  createdAt: string;
}
export interface AppState {
  favorites: string[];
  bookings: Booking[];
}
