import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from "../components/LoadingComponent";


const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowOTPPopup(true);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      
      setOtpError('');
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join('');
    
    // Hardcoded OTP validation (1234)
    // if (enteredOtp === '1234') {
    //   // Success - navigate to preferences page
    //   console.log("Auth submitted: ",formData)
    //   navigate('/person-details', { state: formData });
    // } else {
    //   setOtpError('Invalid OTP. Please try again.');
    // }

    // For real API integration, you would use:
    setLoading(true);
    try {
      const response = await fetch('https://birthday-song-ai-server.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:formData.name,
          email: formData.email,
          phone: formData.phone,
          otp: enteredOtp
        })
      });
      
      const data = await response.json();
      console.log(data)
      if (data.success) {
         navigate('/person-details', { state: formData });
      } else {
         setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
       setOtpError('Something went wrong. Please try again.');
    }finally {
      setLoading(false);
    }
    


  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']);
    setOtpError('');
    // In real implementation, you would call API to resend OTP
    console.log('Resending OTP to:', formData.phone);
  };

  const closePopup = () => {
    setShowOTPPopup(false);
    setOtp(['', '', '', '']);
    setOtpError('');
  };

  return (
    <div className="min-h-screen pt-16">

      {/* ✅ Show Loading Overlay */}
      {loading && <LoadingComponent text="I am using Render for server deployment so my free instance will spin down with inactivity, which can delay requests by 50 seconds or more. So Please wait until Server got Active." image="/assets/Desi_.png" />}

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-4">
          <img
            src="/assets/progress bar.png"
            alt="Progress"
            className="w-48  mx-auto mb-4"
          />
        </div>

        {/* Celebrations Logo - Made bigger */}
        <div className="mb-4 text-center ">
          <img
            src="/assets/Celebrations(Bg).png"
            alt="Celebrations"
            className="w-56  mx-auto mb-4"
            // className="w-48 sm:w-72 md:w-96 lg:w-[400px] mb-6 drop-shadow-2xl"
          />
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto  bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8 ">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
            Register to create
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Phone Field */}
            <div>
              
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-2xl focus:ring-2  focus:border-transparent transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Phone Number"
                  maxLength="10"
                />
              
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2  focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2  focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Email ID"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
           
              <button
              type="submit"
              className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-full shadow-md hover:bg-yellow-300 transition block mx-auto"
            >
              Submit
            </button>
           
            
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Required fields
          </p>
        </div>
      </div>

      {/* OTP Popup */}
      {showOTPPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full mx-auto transform transition-all">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Enter OTP Text */}
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Enter OTP
            </h3>

            {/* OTP Input Boxes */}
            <div className="flex justify-center space-x-3 mb-6">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-14 h-14 text-center text-white text-xl font-bold border-2  bg-[#280051] rounded-2xl focus:border-[#280051] focus:bg-purple-100 focus:text-[#280051] focus:outline-none transition-all"
                />
              ))}
            </div>

            {/* OTP Error Message */}
            {otpError && (
              <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>
            )}

            {/* Resend OTP */}
            <div className="text-right mb-6">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-[#280051] hover:text-purple-800 text-sm font-medium transition-colors"
              >
                Resend OTP
              </button>
            </div>

            {/* Submit Button */}
            
              <button
              onClick={verifyOTP}
              className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-full shadow-md hover:bg-yellow-300 transition block mx-auto"
            >
              Submit OTP
            </button>
            
            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;