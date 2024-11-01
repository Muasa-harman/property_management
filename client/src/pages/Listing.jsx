import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { useParams } from "react-router-dom";
import { FaBed, FaChair, FaParking } from "react-icons/fa";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (res.ok) {
          setListing(data);
        } else if (res.status === 404) {
          setNotFound(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="p-5">
      {loading && <p className="text-center text-2xl">Loading...</p>}
      {error && notFound && (
        <p className="text-center text-2xl text-red-600">Something went wrong</p>
      )}
      <div className="max-w-4xl mx-auto">
        <Swiper navigation className="rounded-lg overflow-hidden mb-4">
          {listing?.imageUrls?.map((imageUrl) => (
            <SwiperSlide key={imageUrl}>
              <div
                className="h-[450px] bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Only show the listing details below the Swiper */}
        <div className="flex gap-4 mb-6">
          <span className="bg-red-600 text-white p-2 rounded-full">
            {listing?.type === "rent" ? "For Rent" : "For Sale"}
          </span>
          {listing?.offer && (
            <span className="bg-green-600 text-white p-2 rounded-full">
              ${listing.regularPrice - listing.discountPrice} Discount
            </span>
          )}
        </div>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold text-black">Description: </span>
          {listing?.description}
        </p>
        <ul className="grid grid-cols-2 gap-4 text-green-600 font-semibold text-sm mb-8">
          <li className="flex items-center gap-2">
            <FaBed className="text-lg" />
            {listing?.bedrooms} Bed(s)
          </li>
          <li className="flex items-center gap-2">
            <FaBed className="text-lg" />
            {listing?.bathrooms} Bath(s)
          </li>
          <li className="flex items-center gap-2">
            <FaParking className="text-lg" />
            {listing?.parking ? "Parking Available" : "No Parking"}
          </li>
          <li className="flex items-center gap-2">
            <FaChair className="text-lg" />
            {listing?.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        <button
          onClick={() => setContact(true)}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition"
        >
          Contact Landlord
        </button>
        {contact && <Contact />}
      </div>
    </main>
  );
}

export default Listing;





// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/bundle";
// import { Navigation } from "swiper/modules";
// import SwiperCore from "swiper";
// import { useParams } from "react-router-dom";
// import { FaBed, FaChair, FaParking } from "react-icons/fa";
// import Contact from "../components/Contact";

// function Listing() {
//   SwiperCore.use([Navigation]);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/listing/get/${params.listingId}`);
//         const data = await res.json();
//         if (res.ok) {
//           setListing(data);
//         } else if (res.status === 404) {
//           setNotFound(true);
//         }
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <main className="p-5">
//       {loading && <p className="text-center text-2xl">Loading...</p>}
//       {error && notFound && (
//         <p className="text-center text-2xl text-red-600">Something went wrong</p>
//       )}
//       <div className="max-w-4xl mx-auto">
//         <Swiper navigation className="rounded-lg overflow-hidden mb-4">
//           {listing?.imageUrls?.map((imageUrl) => (
//             <SwiperSlide key={imageUrl}>
//               <div
//                 className="h-[450px] bg-cover bg-center"
//                 style={{ backgroundImage: `url(${imageUrl})` }}
//               ></div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <div className="flex gap-4 mb-6">
//           <span className="bg-red-600 text-white p-2 rounded-full">
//             {listing?.type === "rent" ? "For Rent" : "For Sale"}
//           </span>
//           {listing?.offer && (
//             <span className="bg-green-600 text-white p-2 rounded-full">
//               ${listing.regularPrice - listing.discountPrice} Discount
//             </span>
//           )}
//         </div>
//         <p className="text-gray-700 mb-6">
//           <span className="font-semibold text-black">Description: </span>
//           {listing?.description}
//         </p>
//         <ul className="grid grid-cols-2 gap-4 text-green-600 font-semibold text-sm mb-8">
//           <li className="flex items-center gap-2">
//             <FaBed className="text-lg" />
//             {listing?.bedrooms} Bed(s)
//           </li>
//           <li className="flex items-center gap-2">
//             <FaBed className="text-lg" />
//             {listing?.bathrooms} Bath(s)
//           </li>
//           <li className="flex items-center gap-2">
//             <FaParking className="text-lg" />
//             {listing?.parking ? "Parking Available" : "No Parking"}
//           </li>
//           <li className="flex items-center gap-2">
//             <FaChair className="text-lg" />
//             {listing?.furnished ? "Furnished" : "Unfurnished"}
//           </li>
//         </ul>
//         <button
//           onClick={() => setContact(true)}
//           className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition"
//         >
//           Contact Landlord
//         </button>
//         {contact && <Contact />}
//       </div>
//     </main>
//   );
// }

// export default Listing;





