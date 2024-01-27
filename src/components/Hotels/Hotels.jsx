import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { GrLocation } from "react-icons/gr";
import { TbFileDescription } from "react-icons/tb";
import { AiOutlineEuro } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      <div className="searchItems">
        {hotels.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`searchItem ${
                  item.id === currentHotel?.id ? "current-hotel" : ""
                }`}
              >
                <img src={item.picture_url.url} alt={item.name} />
                <div className="searchItemInfo">
                  <p className="searchItemInfo-item">
                    <TbFileDescription className="locationItemDesc-btn" />
                    {item.name}
                  </p>
                  <p className="searchItemInfo-item">
                    <GrLocation className="locationItemDesc-btn" />
                    {item.smart_location}
                  </p>
                  <p className="searchItemInfo-item">
                    <IoPersonOutline className="locationItemDesc-btn" />
                    host name: {item.host_name}
                  </p>
                  <p className="searchItemInfo-item">
                    <AiOutlineEuro className="locationItemDesc-btn" />
                    {item.price}&nbsp;<span>per night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Hotels;
