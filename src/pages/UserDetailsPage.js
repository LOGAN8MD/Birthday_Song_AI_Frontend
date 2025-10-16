import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from "../components/LoadingComponent";
import { url } from '../components/api';

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    termsAccepted: false,
    promoAccepted: false,
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

    // Phone validation
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

    // Checkbox validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms & Conditions';
    }
    if (!formData.promoAccepted) {
      newErrors.promoAccepted = 'You must agree to receive promotional communications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

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
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          otp: enteredOtp
        })
      });

      const data = await response.json();
      if (data.success) {
        navigate('/person-details', { state: formData });
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setOtpError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']);
    setOtpError('');
    console.log('Resending OTP to:', formData.phone);
  };

  const closePopup = () => {
    setShowOTPPopup(false);
    setOtp(['', '', '', '']);
    setOtpError('');
  };

  return (
    <div className="min-h-screen pt-16">
      {loading && <LoadingComponent text="Please wait while the server wakes up..." image="/assets/Desi_.png" />}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <img src="/assets/progress bar.png" alt="Progress" className="w-48 mx-auto mb-4" />
        </div>

        <div className="mb-4 text-center">
          <img src="/assets/Celebrations(Bg).png" alt="Celebrations" className="w-56 mx-auto mb-4" />
        </div>

        <div className="max-w-md mx-auto bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">Register to create</h2>

          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Phone */}
            <div>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full font-bold text-purple-900 px-4 py-3 border rounded-2xl focus:ring-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none transition-all ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full font-bold text-purple-900 px-4 py-3 border rounded-2xl focus:ring-2 transition-all ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className={`w-full px-4 py-3 border font-bold text-purple-900 rounded-2xl  focus:ring-2 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* ✅ Terms & Promo Checkboxes */}
            <div className="flex flex-col space-y-3 mt-4">
              <label className="flex z-10 items-center space-x-3 text-sm text-white">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className=" w-4 h-4 appearance-none border-2 bg-white border-gray-300 rounded-full checked:bg-yellow-400 checked:border-white focus:ring-2  cursor-pointer transition-all"
                />
                <span className='text-xs '>
                  I accept <b>Terms & Conditions</b> and <b>Privacy Policy</b> of Mondelez (Cadbury)
                </span>
              </label>
              {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}

              <label className="flex z-10 items-center space-x-3 text-sm text-white">
                <input
                  type="checkbox"
                  name="promoAccepted"
                  checked={formData.promoAccepted}
                  onChange={handleChange}
                  className=" w-6 h-4 appearance-none border-2 bg-white border-gray-300 rounded-full checked:bg-yellow-400 checked:border-white focus:ring-2 focus:ring-yellow-400 cursor-pointer transition-all"
                  
                />
                <span className='text-xs '>
                  I would like to receive <b>promotional communication</b> from Mondelez (Cadbury)
                  about its products and offers.
                </span>
              </label>
              {errors.promoAccepted && <p className="text-red-500 text-xs">{errors.promoAccepted}</p>}
              
              <div className="flex justify-end">
                <img src="/assets/Yellow tone.png" alt="Progress" className="w-5 z-20 " />
              </div>
              
            </div>

            {/* Submit */}

                <div className="flex space-x-[76px]">
                   <img src="/assets/Asset 1.png" alt="Progress" className="w-16  " />
                  <button
                    type="submit"
                    className="h-14 bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-xl shadow-md hover:bg-yellow-300 transition block mx-auto"
                  >
                    Submit
                  </button>  
                </div>
                
          </form>

        
            <p className="text-xs text-gray-500 text-center mt-4">* Required fields</p>
              

        </div>
      </div>

               
              
            {/* <img src="/assets/Yellow tone.png" alt="Progress" className="w-5  " /> */}
            
      {/* OTP Popup */}
      {showOTPPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full mx-auto">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              ✕
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Enter OTP</h3>

            <div className="flex justify-center space-x-3 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={otp[i]}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-14 h-14 text-center text-white text-xl font-bold border-2 bg-[#280051] rounded-2xl focus:bg-purple-100 focus:text-[#280051]"
                />
              ))}
            </div>

            {otpError && <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>}

            <div className="text-right mb-6">
              <button onClick={handleResendOTP} className="text-[#280051] hover:text-purple-800 text-sm font-medium">
                Resend OTP
              </button>
            </div>

            <button
              onClick={verifyOTP}
              className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-xl shadow-md hover:bg-yellow-300 block mx-auto"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
