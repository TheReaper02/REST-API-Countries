import { useState, useEffect, useMemo } from "react";
import CountryCard from "./CountryCard";

function CountryList({ search = "", region = "" }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
    )
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = useMemo(
    () =>
      countries.filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesRegion = region === "" || country.region === region;
        return matchesSearch && matchesRegion;
      }),
    [countries, search, region],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 py-12">
      {filteredCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
