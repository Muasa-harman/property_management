import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [salesListings, setSalesListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        // console.log(data)
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSalesListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSalesListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSalesListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-19 px-3 max-w6xl">
        <h1 className="text-gray-600 font-bold text-2xl lg:text-4xl animate-scaleLoop">
          Discover your dream home.{" "}
          <span className="text-slate-500"> perfect </span>
          place to live <br />
          Simplify your search
        </h1>
        <div className="text-gray-800">
          Harman Estate is the best place to find yoursel a home to live.
          <br className="px-3" /> We have a wide range of properties for you to
          choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-green-500 hover:underline font-bold"
          to={"/search"}
        >
          Lets get started
        </Link>
      </div>
      {/* swiper */}
      {offerListings.length > 1 && (
        <Swiper
          navigation
          loop={true}
          modules={[Navigation]}
          className="text-black"
        >
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    backgroundImage: `url(${
                      listing.imageUrls && listing.imageUrls[0]
                    })`,
                    backgroundPosition: "center 20%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      {/* listing results for offer, sale and rent  */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-green-500 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offerListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  key={listing._id}
                  className="p-4 border rounded-lg shadow-sm bg-white transform transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Recent Places for Rent
              </h2>
              <Link
                className="text-sm text-green-500 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rentListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  key={listing._id}
                  className="p-4 border rounded-lg shadow-sm bg-white transform transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}

        {salesListings && salesListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                Recent Places for Sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {salesListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  key={listing._id}
                  className="p-4 border rounded-lg shadow-sm bg-white transform transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
