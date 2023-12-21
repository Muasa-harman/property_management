import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { useParams } from "react-router-dom";
import { FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";


function Listing() {
  SwiperCore.use([Navigation]);
  const [contact,setContact] = useState(false)
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const {currentUser} = useSelector((state)=> state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        // console.log('this is res url', res)
        const data = await res.json();
        // if(data.success === false){
        //     setError(true);
        //     setLoading(false);
        //     return;
        // }
        // setListing(data)
        // setLoading(false)
        // setError(false)
        if (res.ok) {
          setListing(data);
          setLoading(false);
          setError(false);
          setNotFound(false);
        } else if (res.status === 404) {
          setNotFound(true);
          setError(false);
          console.error(`Listing not found: ${params.listingId}`);
        }
      } catch (error) {
        setError(true);
        setNotFound(false);
        console.error("Error fetching listing:", error);
        // setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
  useEffect(() => {
    
  }, [loading, listing]);

  
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && notFound && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      <div>
        <Swiper navigation>
          {listing &&
            listing.imageUrls &&
            listing.imageUrls.map((imageUrl) => (
              <SwiperSlide key={imageUrl}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${imageUrl}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>

                {/* </div> */}
        <div className="flex gap-4">
                 <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded">
                 {listing.type === 'rent' ? 'For Rent' : 'For Sale' }</p>
                 {listing.offer && (<p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded">${+listing.regularPrice - + listing.discountPrice}</p>)}
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold text-black">
                    Description-{" "}
                  </span>
                  {listing.description}
                </p>
                <ul className="flex flex-wrap justify-around text-green-600 font-semibold text-sm">
                  <li className="flex items-center gap-1 whitespace-nowrap font-semibold ">
                    <FaBed className="text-lg" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds`
                      : `${listing.bedrooms} bed`}
                  </li>
                  <li className="items-center flex gap-1 whitespace-nowrap font-semibold">
                    <FaBed className="text-lg" />
                    {listing.bathrooms > 1
                      ? `${listing.bedrooms} beds`
                      : `${listing.bathrooms} bed`}
                  </li>
                  <li className="items-center flex gap-1 whitespace-nowrap font-semibold">
                    <FaParking className="text-lg" />
                    {listing.parking  ? 'Parking spot ' : 'No Parking'}
                  </li>
                  <li className="items-center flex gap-1 whitespace-nowrap font-semibold">
                    <FaChair className="text-lg" />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>
                </ul>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* <p className="flex items-center mt-6 gap-2 text-gray-500 my-2 text-sm">
                <FaMapMarkerAlt className="text-green-700"/>
                {listing.address}
                </p> */}
        {/* <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-gray-100 cursor-pointer">
        <FaShare className="text-gray-500" onClick={() =>{navigator.clipboard.writeText(window.location.href);
        // setCopied(true);
        setTimeout(()=>{
          // setCopied(false);
        },2000);
        }}/>
       </div> */}

        {/* {copied && (<p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-gray-100 p-2">
        Link copied!
       </p>)}
       <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
        <p className="text-2xl font-semibold">
          {listing.name} - ${''}
          {listing.offer ? listing.discountPrice.toLocaleString('en-us')
          : listing.regularPrice.toLocaleString('en-us')  
        }
        </p>
       </div> */}
      </div>
      {/* currentUser && listing.userRef !== currentUser._id && !contact &&  */}
        <button onClick={()=>setContact(true)} className="bg-gray-600 text-white m-20 rounded-lg
         uppercase hover:opacity-70 p-3">
          Contact landlord</button>
      
      {/* //  )}   */}
      {/* {contact && <Contact/>} */}
      {/* <Contact /> */}
    </main>
  );
}

export default Listing;
