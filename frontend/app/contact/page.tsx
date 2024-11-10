import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full sm:w-1/2  lg:w-1/3 p-8">
        <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">Contact</h1>
        
        <div className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg p-8">
          <p className="text-lg text-center mb-8">
            Feel free to reach out! Connect with me on GitHub, LinkedIn, or send me an email.
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            {/* GitHub */}
            <a href="https://github.com/adamFittlerGit/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition duration-300">
              <FaGithub size={40} />
              <span className="sr-only">GitHub</span>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition duration-300">
              <FaLinkedin size={40} />
              <span className="sr-only">LinkedIn</span>
            </a>
            {/* Email */}
            <a href="mailto:your-email@example.com" className="text-red-600 hover:text-red-800 transition duration-300">
              <FaEnvelope size={40} />
              <span className="sr-only">Email</span>
            </a>
          </div>

          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
            <textarea placeholder="Your Message" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"></textarea>
            <button type="submit" className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
