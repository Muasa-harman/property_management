import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden w-full sm:w-[280px]">
      <Link to={`/listing/${listing._id}`}>
        {listing?.imageUrls && listing.imageUrls[0] && (
          <img
            src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
            alt="listing cover"
            className="h-[180px] w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="p-3 flex flex-col gap-2">
          {/* Title */}
          <p className="text-md font-semibold text-gray-800 truncate">
            {listing.name}
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-xs">
            <MdLocationOn className="text-green-700 mr-1" />
            <p className="truncate">{listing.address}</p>
          </div>

          {/* Price */}
          <p className="text-sm text-gray-900 font-semibold">
            ${listing.offer ? listing.discountPrice.toLocaleString('en-us') : listing.regularPrice.toLocaleString('en-us')}
            {listing.type === 'rent' && <span className="text-xs font-normal text-gray-600"> / month</span>}
          </p>

          {/* Beds & Baths */}
          <div className="flex justify-between text-gray-600 text-xs mt-2">
            <span>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}</span>
            <span>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;








// import { Link } from "react-router-dom";
// import {MdLocationOn} from 'react-icons/md';



// function ListingItem({ listing }) {
  
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
//       {/* shadow-md hover:shadow-lg sm:h-[220px] */}
//       <Link to={`/listing/${listing._id}`}>
//         {listing?.imageUrls && listing.imageUrls[0] && (
//           <img
//             src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
//             alt="listing cover"
//             className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
//           />
//           )} 
//         <div className="p-3 flex flex-col gap-2 w-full">
//           <p className="truncate text-lg font-semibold  text-gray-600">{listing.name}</p>
//           <div className="flex items-center gap-1">
//             { <MdLocationOn className="h-4 w-4 text-green-700"/> }
//           <p className="text-sm text-gray-600 truncate">{listing.address}</p>
//             </div>
//             <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
//             <p className="text-gray-500 mt-2 font-semibold">
//               $
//               {listing.offer ? listing.discountPrice.toLocaleString('en-us') : listing.regularPrice.toLocaleString('en-us')}
//               {listing.type === 'rent' && '/ month'}
//             </p>
//             <div className="text-gray-600 flex gap-4">
//               <div className="font-bold text-xs">
//                 {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed `}
//               </div>
//               <div className="font-bold text-xs">
//                 {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath `}
//               </div>
//             </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default ListingItem;
