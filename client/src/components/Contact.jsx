import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  console.log(res);
  return (
    <div className="">
      {landlord && (
        <div className="flex flex-col gap-2">
          <p className="">
            Contact <span className="font-semibold">{landlord.username}</span>
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            value={message}
            onChange={onChange}
            name="message"
            id="message"
            rows={"2"}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
          className="bg-gray-600 text-white text-center p-3 uppercase rounded-lg hover:opacity-85"
          >
          Send message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
