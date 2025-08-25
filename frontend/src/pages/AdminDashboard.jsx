import { useEffect, useState } from "react"
import { getPlants, deletePlant, addPlant, updatePlant } from "../api/plants"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.jsx"
import BaseLayout from "../components/layouts/BaseLayout.jsx"

export default function AdminDashboard() {
  const [plants, setPlants] = useState([])
  const [newPlant, setNewPlant] = useState({ name: "", categories: "", price: "", description: "", image: "" })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: "", categories: "", price: "", description: "", image: "" })

  const fetchPlants = async () => {
    const data = await getPlants()
    setPlants(data)
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const handleAdd = async () => {
    const payload = {
      ...newPlant,
      categories: newPlant.categories
        ? newPlant.categories.split(",").map((c) => c.trim())
        : [],
    }
    await addPlant(payload)
    setNewPlant({ name: "", categories: "", price: "", description: "", image: "" })
    fetchPlants()
  }

  const handleEditClick = (plant) => {
    setEditingId(plant._id)
    setEditData({
      name: plant.name,
      categories: plant.categories ? plant.categories.join(", ") : "",
      price: plant.price,
      description: plant.description || "",
      image: plant.image || "",
    })
  }

  const handleUpdate = async (id) => {
    const payload = {
      ...editData,
      categories: editData.categories
        ? editData.categories.split(",").map((c) => c.trim())
        : [],
    }
    await updatePlant(id, payload)
    setEditingId(null)
    fetchPlants()
  }

  const handleDelete = async (id) => {
    await deletePlant(id)
    fetchPlants()
  }

  return (
    <BaseLayout
      title="🌿 Admin Dashboard"
      subtitle="Manage your plant collection with ease"
      className="bg-gray-50 min-h-screen py-12"
    >
      {/* Add Plant Form */}
      <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Add New Plant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Plant Name"
            value={newPlant.name}
            onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Categories (comma-separated)"
            value={newPlant.categories}
            onChange={(e) => setNewPlant({ ...newPlant, categories: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newPlant.price}
            onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newPlant.description}
            onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPlant.image}
            onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
            className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-8 w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
        >
          Add Plant
        </button>
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plants.map((plant) => (
          <Card key={plant._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all">
            <CardHeader className="border-b border-gray-100 p-6">
              <CardTitle className="text-xl font-bold text-gray-900">{plant.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {editingId === plant._id ? (
                <div className="flex flex-col gap-4">
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Plant Name"
                    className="p-3 border rounded-lg"
                  />
                  <input
                    value={editData.categories}
                    onChange={(e) => setEditData({ ...editData, categories: e.target.value })}
                    placeholder="Categories (comma-separated)"
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    placeholder="Price (₹)"
                    className="p-3 border rounded-lg"
                  />
                  <input
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    placeholder="Description"
                    className="p-3 border rounded-lg"
                  />
                  <input
                    value={editData.image}
                    onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    placeholder="Image URL"
                    className="p-3 border rounded-lg"
                  />
                  <div className="flex gap-4">
                    <button
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleUpdate(plant._id)}
                    >
                      Save
                    </button>
                    <button
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {plant.image && (
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-gray-600 mb-3">{plant.description || "No description available"}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Categories: {plant.categories?.length ? plant.categories.join(", ") : "—"}
                  </p>
                  <p className="font-semibold text-green-600 text-lg">₹{plant.price}</p>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleEditClick(plant)}
                    >
                      Update
                    </button>
                    <button
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleDelete(plant._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </BaseLayout>
  )
}
