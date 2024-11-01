import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "create_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) setShowMore(true);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (["all", "rent", "sale"].includes(e.target.id)) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebardata).toString();
    navigate(`/search?${urlParams}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    setListings([...listings, ...data]);
    setShowMore(data.length > 8);
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="p-6 border-b md:border-r md:min-h-screen md:w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <label className="font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-2 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="font-semibold">Type:</label>
            {["all", "rent", "sale"].map((type) => (
              <label key={type} className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  id={type}
                  checked={sidebardata.type === type}
                  onChange={handleChange}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                id="offer"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              Offer
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="font-semibold">Amenities:</label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                id="parking"
                checked={sidebardata.parking}
                onChange={handleChange}
              />
              Parking
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebardata.furnished}
                onChange={handleChange}
              />
              Furnished
            </label>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              defaultValue="created_at_desc"
              onChange={handleChange}
              className="border rounded-lg p-2"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-gray-600 text-white p-2 rounded-lg uppercase hover:opacity-80">
            Search
          </button>
        </form>
      </div>

      {/* Listing Results */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold border-b mb-5 text-gray-600">
          Listing results:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {loading && <p className="text-xl text-gray-600 text-center w-full">Loading...</p>}
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-600">No listing found!</p>
          )}
          {!loading &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="text-green-600 hover:underline w-full text-center py-5 mt-3"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;

