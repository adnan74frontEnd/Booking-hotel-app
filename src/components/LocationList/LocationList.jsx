import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { GrLocation } from "react-icons/gr";
import { TbFileDescription } from "react-icons/tb";
import { AiOutlineEuro } from "react-icons/ai";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    if (newScrollPosition >= 0 && newScrollPosition <= 2400)
      setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  const [selectedId, setSelectedId] = useState(null);
  const onSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) return <Loader />;

  return (
    <div className="nearbyLocation">
      <div className="nearby-btns">
        <button
          className="leftBtn btn btn--primary"
          onClick={() => handleScroll(200)}
        >
          <HiChevronDoubleLeft />
        </button>
        <h2>Find your favorite hotel</h2>
        <button
          className="rightBtn btn btn--primary"
          onClick={() => handleScroll(-200)}
        >
          <HiChevronDoubleRight />
        </button>
      </div>
      <div className="locationList" ref={containerRef}>
        {data.map((item) => {
          return (
            <div className="locationItem" key={item.id}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="locaiton">
                  <GrLocation className="locationItemDesc-btn" />
                  &nbsp;&nbsp;{item.smart_location}
                </p>
                <p className="name">
                  <TbFileDescription className="locationItemDesc-btn" />
                  &nbsp;&nbsp;{item.name}
                </p>
                <p className="price">
                  <AiOutlineEuro className="locationItemDesc-btn" />
                  &nbsp;&nbsp;{item.price}&nbsp;
                  <span>per night</span>
                </p>
              </div>
              <Link
                key={item.id}
                to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              >
                <button
                  className="btn btn--secondary locationItem-button"
                  onClick={() => onSelectCharacter(item.id)}
                >
                  {selectedId === item.id ? "Shown" : "View details "}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default LocationList;
