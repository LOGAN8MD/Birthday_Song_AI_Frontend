import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonDetails = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.gender.trim()) {
      newErrors.gender = 'Please select gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // You can navigate or save form data here
      navigate('/song-vibe', { state: { person: formData } });
    }
  };

  return (
    <div className="min-h-screen  pt-16">
      <div className="container mx-auto px-4 py-8 " >
        {/* Progress Bar */}
            <div className="mb-4">
            <img
                src="/assets/progress bar1.png"
                alt="Progress"
                className="w-48  mx-auto mb-4"
            />
            </div>

            <div className="mb-4">
                <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
                    Tell us about your loved one...
                </h2>
            </div>

        {/* Image */}
            <div className="mb-4 text-center">
            <img
                src="/assets/Cap&Gift.png"
                alt="Celebrations"
                className="w-56  mx-auto mb-4"
            />
            </div>

        {/* Form */}
        <div className="max-w-md mx-auto bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
            Their Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-white font-medium mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Submit */}
            
              <button
                type="submit"
                className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-full shadow-md hover:bg-yellow-300 transition block mx-auto"
              >
                Proceed
              </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
