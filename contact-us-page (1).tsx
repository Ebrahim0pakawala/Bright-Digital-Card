import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send,
  Building2,
  CheckCircle,
  User,
  AtSign,
  MessageSquare,
  FileText,
  Sparkles,
  Heart,
  Zap
} from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  type Errors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  type CardAnimations = {
    contact?: string;
    form?: string;
    map?: string;
  };
  const [cardAnimations, setCardAnimations] = useState<CardAnimations>({});
  const [charCount, setCharCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated card entrance effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardAnimations({
        contact: 'animate-slide-in-left',
        form: 'animate-slide-in-right',
        map: 'animate-fade-in-up'
      });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update character count for message field
    if (name === 'message') {
      setCharCount(value.length);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validateForm()) {
      setIsLoading(true);
      setShowConfetti(true);
      
      // Simulate API call with loading animation
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Reset form after showing success
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitted(false);
          setShowConfetti(false);
          setCharCount(0);
        }, 3000);
      }, 2000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/yourcompany', label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://twitter.com/yourcompany', label: 'Twitter', color: 'hover:text-blue-300' },
    { icon: Instagram, href: 'https://instagram.com/yourcompany', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn', color: 'hover:text-blue-500' }
  ];

  // Confetti particles for success animation
  const ConfettiParticle = ({ delay }) => (
    <div 
      className={`absolute w-2 h-2 bg-green-400 rounded-full animate-confetti`}
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}ms`,
        animationDuration: '3s'
      }}
    />
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <ConfettiParticle key={i} delay={i * 100} />
        ))}
          </div>
        )}
        
        <div className="bg-gray-800 border border-green-400 rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-bounce-gentle relative">
          <div className="absolute -top-4 -right-4">
        <Sparkles className="w-8 h-8 text-green-400 animate-spin-slow" />
          </div>
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse-gentle" />
          <h2 className="text-3xl font-bold text-white mb-3">Thank You!</h2>
          <p className="text-gray-300 mb-4">Your message has been sent successfully. We'll get back to you soon!</p>
          <div className="flex items-center justify-center space-x-2 text-green-400">
        <Heart className="w-4 h-4 animate-pulse" />
        <span className="text-sm">We appreciate your interest</span>
        <Heart className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-lg transform hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group">
            <Building2 className="w-12 h-12 text-white group-hover:animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 hover:text-green-400 transition-colors duration-300 cursor-default">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
            We'd love to hear from you! Get in touch with us today.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">Ready to connect</span>
            <Zap className="w-5 h-5 text-green-400 animate-pulse" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Column - Contact Info & Actions */}
          <div className={`space-y-6 ${cardAnimations.contact}`}>
            
            {/* Quick Contact Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-green-400 hover:shadow-green-400/20 group">
              <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-green-400 transition-colors duration-300">Get In Touch</h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:+1234567890"
                  className="flex items-center p-4 rounded-2xl border-2 border-gray-600 hover:border-green-400 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-900/50 hover:to-green-800/50 transition-all duration-300 group transform hover:scale-102"
                  onMouseEnter={() => setFocusedField('phone')}
                  onMouseLeave={() => setFocusedField('')}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300 shadow-lg group-hover:shadow-green-400/50 group-hover:animate-pulse">
                    <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300 text-lg">Call Us</p>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">+1 (234) 567-8900</p>
                    {focusedField === 'phone' && <p className="text-green-400 text-sm animate-fade-in">Click to call now!</p>}
                  </div>
                </a>

                <a 
                  href="mailto:contact@yourcompany.com"
                  className="flex items-center p-4 rounded-2xl border-2 border-gray-600 hover:border-green-400 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-900/50 hover:to-green-800/50 transition-all duration-300 group transform hover:scale-102"
                  onMouseEnter={() => setFocusedField('email')}
                  onMouseLeave={() => setFocusedField('')}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300 shadow-lg group-hover:shadow-green-400/50 group-hover:animate-pulse">
                    <Mail className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300 text-lg">Email Us</p>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300">contact@yourcompany.com</p>
                    {focusedField === 'email' && <p className="text-green-400 text-sm animate-fade-in">Send us an email!</p>}
                  </div>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="mt-8 pt-6 border-t border-gray-600">
                <p className="text-center text-gray-300 mb-4 font-medium">Follow Us</p>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 border border-gray-500 rounded-xl flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-125 hover:shadow-lg hover:border-green-400 hover:from-green-500 hover:to-green-600 hover:text-white transform hover:rotate-12`}
                      title={label}
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <Icon className="w-7 h-7" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-green-400 hover:shadow-green-400/20 group">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-green-400/50 group-hover:animate-pulse">
                  <MapPin className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">Visit Our Office</h3>
              </div>
              <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                123 Business Avenue<br />
                Suite 456<br />
                New York, NY 10001<br />
                United States
              </p>
              <div className="mt-4 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>📍 We're open Monday-Friday, 9AM-6PM</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`bg-gray-800 border border-gray-700 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-green-400 hover:shadow-green-400/20 ${cardAnimations.form}`}>
            <h3 className="text-2xl font-bold text-white mb-6 text-center hover:text-green-400 transition-colors duration-300">Send us a Message</h3>
            
            <div className="space-y-6">
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-green-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Your Name *"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transform focus:scale-105 ${
                    errors.name ? 'border-red-400 shake' : focusedField === 'name' ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-gray-600 hover:border-green-400'
                  }`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.name}</p>}
              </div>

              <div className="relative">
                <AtSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-green-400' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Your Email *"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transform focus:scale-105 ${
                    errors.email ? 'border-red-400 shake' : focusedField === 'email' ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-gray-600 hover:border-green-400'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.email}</p>}
              </div>

              <div className="relative">
                <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'subject' ? 'text-green-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Subject *"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transform focus:scale-105 ${
                    errors.subject ? 'border-red-400 shake' : focusedField === 'subject' ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-gray-600 hover:border-green-400'
                  }`}
                />
                {errors.subject && <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.subject}</p>}
              </div>

              <div className="relative">
                <MessageSquare className={`absolute left-3 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-green-400' : 'text-gray-400'}`} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Your Message *"
                  rows={5}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-gray-700 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none transform focus:scale-105 ${
                    errors.message ? 'border-red-400 shake' : focusedField === 'message' ? 'border-green-400 shadow-lg shadow-green-400/20' : 'border-gray-600 hover:border-green-400'
                  }`}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {charCount}/500
                </div>
                {errors.message && <p className="text-red-400 text-sm mt-1 animate-fade-in">{errors.message}</p>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group shadow-lg hover:shadow-green-400/30 ${
                  isLoading ? 'animate-pulse cursor-not-allowed' : 'hover:animate-none'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={`bg-gray-800 border border-gray-700 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:border-green-400 hover:shadow-green-400/20 ${cardAnimations.map}`}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center hover:text-green-400 transition-colors duration-300">Find Us Here</h3>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-gray-600 hover:border-green-400 transition-all duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.555082!2d-73.98556598459394!3d40.74844797932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959392742!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location"
              className="w-full transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-confetti { animation: confetti linear infinite; }
        .shake { animation: shake 0.5s ease-in-out; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default ContactUsPage;