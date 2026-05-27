import { Link } from "react-router-dom";
import { useState, useRef } from "react";

function CountryCard({ country }) {
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.1)");
  const [hovered, setHovered] = useState(false);
  const imgRef = useRef(null);

  const extractColor = (img) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pixel = ctx.getImageData(10, 10, 1, 1).data;
    setShadowColor(`rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.6)`);
  };
  return (
    <Link
      to={`/country/${country.cca3}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 8px 30px ${shadowColor}` : "",
        transition: "box-shadow 0.3s ease",
      }}
      className="rounded-lg shadow-md overflow-hidden font-nunito flex flex-col bg-white gap-2 xs:w-full sm:w-80 dark:bg-gray-800 xs:mx-0 sm:mx-auto"
    >
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-full h-48 object-cover"
        ref={imgRef}
        crossOrigin="anonymous"
        onLoad={() => extractColor(imgRef.current)}
      />
      <div className="p-6 dark:text-white">
        <h2 className="text-xl font-bold mb-4">{country.name.common}</h2>
        <p>
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p>
          <span className="font-semibold">Capital:</span> {country.capital?.[0]}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;
