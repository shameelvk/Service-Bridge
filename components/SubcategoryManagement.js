import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function SubcategoryManagement({ subcategories, categories, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
    description: '',
    rates: [''],
    minCharge: '',
    locations: []
  });
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        setLocations(data.locations || []);
        if ((!formData.locations || formData.locations.length === 0) && data.locations && data.locations.length > 0) {
          // Default to Malappuram if present
          const defaultLoc = data.locations.find(l => l.name === 'Malappuram') || data.locations[0];
          setFormData(f => ({ ...f, locations: [defaultLoc.slug] }));
        }
      });
    // eslint-disable-next-line
  }, [showForm]);

  const resetForm = () => {
    setFormData({
      categoryId: '',
      name: '',
      description: '',
      rates: [''],
      minCharge: '',
      locations: locations.length > 0 ? [
        (locations.find(l => l.name === 'Malappuram') || locations[0]).slug
      ] : []
    });
    setEditingSubcategory(null);
    setShowForm(false);
  };

  const handleEdit = (subcategory) => {
    setFormData({
      categoryId: subcategory.categoryId._id,
      name: subcategory.name,
      description: subcategory.description || '',
      rates: subcategory.rates.length > 0 ? subcategory.rates : [''],
      minCharge: subcategory.minCharge.toString(),
      locations: subcategory.locations || []
    });
    setEditingSubcategory(subcategory);
    setShowForm(true);
  };

  const handleRateChange = (index, value) => {
    const newRates = [...formData.rates];
    newRates[index] = value;
    setFormData({ ...formData, rates: newRates });
  };

  const addRate = () => {
    setFormData({ ...formData, rates: [...formData.rates, ''] });
  };

  const removeRate = (index) => {
    const newRates = formData.rates.filter((_, i) => i !== index);
    setFormData({ ...formData, rates: newRates.length > 0 ? newRates : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/subcategories';
      const method = editingSubcategory ? 'PUT' : 'POST';
      const body = editingSubcategory 
        ? { id: editingSubcategory._id, ...formData, rates: formData.rates.filter(r => r.trim()) }
        : { ...formData, rates: formData.rates.filter(r => r.trim()) };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        resetForm();
        onRefresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (subcategoryId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch('/api/subcategories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: subcategoryId }),
      });

      if (response.ok) {
        onRefresh();
      } else {
        const data = await response.json();
        alert(data.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Services Management
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      {/* Subcategory Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingSubcategory ? 'Edit Service' : 'Add New Service'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Locations *
              </label>
              <select
                multiple
                required
                value={formData.locations}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                  setFormData(f => ({ ...f, locations: selected }));
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white min-h-[60px]"
              >
                {locations.map(loc => (
                  <option key={loc._id} value={loc.slug}>{loc.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple locations.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Charge (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.minCharge}
                onChange={(e) => setFormData({ ...formData, minCharge: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Service Rates
              </label>
              {formData.rates.map((rate, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={rate}
                    onChange={(e) => handleRateChange(index, e.target.value)}
                    placeholder="e.g., Basic service: ₹500-800"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                  {formData.rates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRate(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRate}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm"
              >
                + Add Rate
              </button>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editingSubcategory ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {subcategory.name}
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {subcategory.categoryId?.name}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(subcategory)}
                  className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(subcategory._id)}
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {subcategory.description}
            </p>
            <div className="text-sm">
              <span className="font-medium text-green-600 dark:text-green-400">
                Min: ₹{subcategory.minCharge}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                • {subcategory.locations?.join(', ') || 'No locations assigned'}
              </span>
            </div>
            {subcategory.rates.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rates:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  {subcategory.rates.slice(0, 2).map((rate, index) => (
                    <li key={index}>• {rate}</li>
                  ))}
                  {subcategory.rates.length > 2 && (
                    <li className="text-gray-500">... and {subcategory.rates.length - 2} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
