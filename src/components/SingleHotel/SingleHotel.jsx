import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
import { GrLocation } from "react-icons/gr";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomImage">
        <img src={currentHotel.picture_url.url} alt={currentHotel.name} />
      </div>
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div className="roomDetail-location">
          <GrLocation className="locationItemDesc-btn" />&nbsp;&nbsp;
          {currentHotel.smart_location} &bull;&nbsp;{currentHotel.number_of_reviews}{" "}
          reviews
        </div>
        <div className="roomDetail-summary">{currentHotel.description}</div>
      </div>
    </div>
  );
}
export default SingleHotel;
