import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md';
function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      {/* shadow-md hover:shadow-lg sm:h-[220px] */}
      <Link to={`/listing/${listing._id}`}>
        {listing?.imageUrls && listing.imageUrls[0] && (
          <img
            src={listing.imageUrls[0]}
            alt=""
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
        )}
        <div className="p-3 flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold  text-gray-600">{listing.name}</p>
          <div className="flex items-center gap-1">
            { <MdLocationOn className="h-4 w-4 text-green-700"/> }
          <p className="text-sm text-gray-600 truncate">{listing.address}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="text-gray-500 mt-2 font-semibold">
              $
              {listing.offer ? listing.discountPrice.toLocaleString('en-us') : listing.regularPrice.toLocaleString('en-us')}
              {listing.type === 'rent' && '/ month'}
            </p>
            <div className="text-gray-600 flex gap-4">
              <div className="font-bold text-xs">
                {listing.bebrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed `}
              </div>
              <div className="font-bold text-xs">
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath `}
              </div>
            </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
