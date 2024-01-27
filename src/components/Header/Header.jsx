import { CiHome } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { HiMinus, HiPlus } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    //note : =>  setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <h1 className="header-title">Time to travel</h1>
      <h3 className="header-description">
        Search the whole world of travel – all in one place
      </h3>
      <div className="header-buttons">
        <NavLink to="/bookmark">
          <button className="btn btn--primary bookmark-btn">Bookmarks</button>
        </NavLink>
        <User />
      </div>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <CiLocationOn className="headerIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
        </div>
        <div className="headerSearchItem">
          <CiHome className="headerIcon" />
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &nbsp;&bull;&nbsp; {options.children} children
            &nbsp;&bull;&nbsp;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <CiCalendar className="headerIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              rangeColors={["#95bed0"]}
            />
          )}
          <button className="headerSearchBtn" onClick={handleSearch}>
            <CiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="logout-container">
          <strong className="logout-username">{user.name}</strong>
          <button onClick={handleLogout} className="btn btn--primary">
            Log Out
          </button>
        </div>
      ) : (
        <NavLink to="/login">
          <button className="btn btn--primary login-button">Log In</button>
        </NavLink>
      )}
    </div>
  );
}
