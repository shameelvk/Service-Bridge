import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ProviderManagement({ providers, subcategories, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subcategoryIds: [],
    locations: [],
    isActive: true
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      subcategoryIds: [],
      locations: ['Malappuram'],
      isActive: true
    });
    setEditingProvider(null);
    setShowForm(false);
  };

  const handleEdit = (provider) => {
    setFormData({
      name: provider.name,
      phone: provider.phone,
      subcategoryIds: provider.subcategoryIds.map(sub => sub._id),
      locations: provider.locations || [],
      isActive: provider.isActive
    });
    setEditingProvider(provider);
    setShowForm(true);
  };

  const handleSubcategoryChange = (subcategoryId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        subcategoryIds: [...formData.subcategoryIds, subcategoryId]
      });
    } else {
      setFormData({
        ...formData,
        subcategoryIds: formData.subcategoryIds.filter(id => id !== subcategoryId)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/providers';
      const method = editingProvider ? 'PUT' : 'POST';
      const body = editingProvider 
        ? { id: editingProvider._id, ...formData }
        : formData;

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

  const handleDelete = async (providerId) => {
    if (!confirm('Are you sure you want to delete this provider?')) return;

    try {
      const response = await fetch('/api/providers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: providerId }),
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
          Providers Management
        </h3>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Provider
        </button>
      </div>

      {/* Provider Form */}
      {showForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingProvider ? 'Edit Provider' : 'Add New Provider'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provider Name *
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Locations (comma-separated)
              </label>
              <textarea
                value={formData.locations.join(', ')}
                onChange={(e) => setFormData({ ...formData, locations: e.target.value.split(',').map(loc => loc.trim()).filter(loc => loc) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="e.g., Malappuram, Calicut, Thrissur"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Services Provided
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-gray-800">
                {subcategories.map((subcategory) => (
                  <label key={subcategory._id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.subcategoryIds.includes(subcategory._id)}
                      onChange={(e) => handleSubcategoryChange(subcategory._id, e.target.checked)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {subcategory.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active Provider
              </label>
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
                {loading ? 'Saving...' : (editingProvider ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Providers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div key={provider._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {provider.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {provider.phone}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(provider)}
                  className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(provider._id)}
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mb-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                provider.isActive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {provider.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                • {provider.locations?.join(', ') || 'No locations assigned'}
              </span>
            </div>
            {provider.subcategoryIds.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {provider.subcategoryIds.slice(0, 3).map((subcategory) => (
                    <span key={subcategory._id} className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                      {subcategory.name}
                    </span>
                  ))}
                  {provider.subcategoryIds.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{provider.subcategoryIds.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
