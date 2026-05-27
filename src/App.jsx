import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import moonIcon from "./assets/moon.svg";
import sunIcon from "./assets/sun.svg";
import searchIcon from "./assets/search-icon.svg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div
      className={`min-h-screen font-nunito dark:bg-gray-900 ${darkMode ? "dark" : ""}`}
    >
      <nav className="bg-white shadow-md py-6 px-8 flex justify-between items-center sticky top-0 z-10 dark:bg-gray-800 lg:w-4/5 lg:mx-auto lg:rounded-b-md">
        <h1 className="text-lg font-bold dark:text-white">
          Where in the world?
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="font-semibold dark:text-white"
        >
          <img
            src={darkMode ? sunIcon : moonIcon}
            alt="Toggle dark mode"
            className="w-5 h-5 dark:invert cursor-pointer hover:opacity-80 dark:hover:opacity-80"
          />
        </button>
      </nav>
      <main className="px-4 py-8 lg:w-4/5 lg:mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="flex justify-between items-center mb-8">
                  <div className="relative w-72">
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search for a country..."
                      className="pl-10 placeholder-gray-300 dark:placeholder-gray-500 w-full border border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-md shadow-sm"
                    />
                    <img
                      src={searchIcon}
                      alt="Search icon"
                      className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none dark:invert"
                    />
                  </div>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="cursor-pointer bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-md shadow-sm"
                  >
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
                <CountryList search={search} region={region} />
              </>
            }
          />
          <Route path="/country/:cca3" element={<CountryDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
