import { useParams } from "react-router-dom"
import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  const {id} = useParams();
  return (
    
      <BookingDetail />
    
  )
}

export default Booking
