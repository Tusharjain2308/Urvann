import { useEffect, useState } from "react";
import { getPlants, deletePlant } from "../api/plants.js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import BaseLayout from "../components/layouts/BaseLayout.jsx";

export default function CatalogPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const role = localStorage.getItem("role");

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await getPlants({ name: search, category: filter });

      setPlants(data);
    } catch (err) {
      console.error("Error fetching plants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [search, filter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePlant(id);
        fetchPlants();
      } catch (err) {
        console.error("Error deleting plant:", err);
      }
    }
  };

  const sortedPlants = [...plants].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getCategoryColor = (category) => {
    const colors = {
      flower: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200",
      tree: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      herb: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    );
  };

  return (
    <BaseLayout
      title="🌿 Urvann Plant Collection"
      subtitle="Discover nature's finest selections for your green sanctuary"
      className="bg-gray-50 min-h-screen py-12"
    >
      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto mb-12 bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Find Your Perfect Plant
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 bg-gray-50 text-gray-800 placeholder-gray-400"
              aria-label="Search plants"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-48 p-4 rounded-lg border border-gray-200 
             focus:outline-none focus:ring-2 focus:ring-green-500 
             transition duration-200 bg-gray-50 text-gray-800"
            aria-label="Filter by category"
          >
            <option value="">🌍 All Categories</option>
            <option value="Indoor">🏡 Indoor</option>
            <option value="Succulent">🌵 Succulents</option>
            <option value="Medicinal">💊 Medicinal</option>
            <option value="Decorative">🎍 Decorative</option>
            <option value="Low Maintenance">🪴 Low Maintenance</option>
            <option value="flower">🌸 Flowers</option>
            <option value="tree">🌳 Trees</option>
            <option value="herb">🌿 Herbs</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 bg-gray-50 text-gray-800"
            aria-label="Sort by"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading plants...</p>
        </div>
      ) : sortedPlants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No plants found. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        /* Plant Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sortedPlants.map((plant) => (
            <Card
              key={plant._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                {plant.image ? (
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-56 bg-green-100 flex items-center justify-center text-5xl transition-transform duration-300 hover:scale-105">
                    🌱
                  </div>
                )}
                <div className="flex flex-wrap gap-2 p-3">
                  {(plant.categories && plant.categories.length > 0
                    ? plant.categories
                    : ["Uncategorized"]
                  ).map((cat) => (
                    <Badge
                      key={cat}
                      className={`px-3 py-1 font-medium transition duration-200 ${getCategoryColor(
                        cat
                      )}`}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardHeader className="p-5">
                <CardTitle className="font-serif text-xl font-bold text-gray-900 line-clamp-1">
                  {plant.name}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-2">
                  {plant.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{plant.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
                    aria-label={`Add ${plant.name} to cart`}
                  >
                    Add to Cart
                  </Button>
                </div>
                {role === "admin" && (
                  <div className="flex gap-3 pt-3 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition duration-200"
                      onClick={() => console.log("Edit modal")}
                      aria-label={`Edit ${plant.name}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-lg transition duration-200"
                      onClick={() => handleDelete(plant._id)}
                      aria-label={`Delete ${plant.name}`}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </BaseLayout>
  );
}
