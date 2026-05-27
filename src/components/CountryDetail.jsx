import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CountryDetail() {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(
      `https://restcountries.com/v3.1/alpha/${cca3}?fields=name,flags,population,region,subregion,capital,currencies,languages,borders`,
    )
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, [cca3]);

  if (!country) return <p className="dark:text-white p-8">Loading...</p>;

  const currencies = Object.values(country.currencies || {}).map((c) => c.name).join(", ");
  const languages = Object.values(country.languages || {}).join(", ");

  return (
    <div className="p-8 dark:text-white">
        <button 
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-2 bg-white shadow-md shadow-gray-700 rounded-md hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:cursor-pointer dark:rounded-md">Back</button>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
            <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-full sm:w-1/2 lg:max-w-lg object-cover shadow-md" />

            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
                
                <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Native Name:</span> {Object.values(country.name.nativeName || {})[0]?.common}</p>
                        <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                        <p><span className="font-semibold">Region:</span> {country.region}</p>
                        <p><span className="font-semibold">Sub Region:</span> {country.subregion}</p>
                        <p><span className="font-semibold">Capital:</span> {country.capital?.[0]}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p><span className="font-semibold">Currencies:</span> {currencies}</p>
                        <p><span className="font-semibold">Languages:</span> {languages}</p>
                    </div>
                </div>

                {country.borders && (
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="font-semibold">Border Countries:</span>
                        {country.borders.map((border) => (
                            <button key={border} 
                            className="bg-white shadow-sm shadow-gray-700 cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:cursor-pointer dark:rounded-md px-4 py-2"
                            onClick={() => navigate(`/country/${border}`)}>
                                {border}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default CountryDetail;
