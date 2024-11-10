'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-3/4 md:w-1/2 px-6 py-12">
        <h1 className="text-5xl font-extrabold text-center text-white pb-8">About Me</h1>
        <div className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg p-8 mb-8">
          <TypeAnimation
            sequence={[
              `I'm Adam, \n 
              A software engineering student specialising in machine learning, cybersecurity, and full-stack development. With hands-on experience across diverse technical domains, I am passionate about leveraging technology to solve real-world challenges. As I progress through my studies, my primary focus is to create robust, intelligent systems that extend the frontiers of technology, particularly in defence, AI, and security applications.\n
              My academic and professional journey has been enriched by key projects and internships that allowed me to put my skills into practice. Currently, my thesis focuses on risk classification and justification using computer vision and natural language processing, which has deepened my expertise in algorithms and model optimisation. An internship with Rheinmetall Defence Australia further solidified my knowledge in software engineering, algorithm design, and C++ development, while adhering to the high standards required in defence applications.\n
              I am honoured to have received recognition for my academic and professional achievements, including the Australian Defence Force Future Innovator Award. My commitment to excellence has been further acknowledged through multiple academic excellence awards, reflecting my dedication to advancing in the fields of machine learning and cybersecurity. These accolades motivate me to continue striving for high standards in all my work.\n
              I am committed to lifelong learning and contributing to impactful projects that address critical technological challenges. My goal is to join a forward-thinking organisation where I can apply my skills in machine learning and cybersecurity to make meaningful contributions and continue growing as a professional in a collaborative, high-stakes environment.`
            ]}
            speed={90} // Fast typing speed
            cursor={true}
            repeat={0}
            className="text-lg leading-relaxed whitespace-pre-line" // Preserve line breaks
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white pb-4">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/blog" className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition duration-300">
              <Image src="/my-diary.png" width={20} height={20} alt="Blog Image" className="mr-2" />
              Blog
            </Link>
            <Link href="/history" className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition duration-300">
              <Image src="/roadmap.png" width={20} height={20} alt="History Image" className="mr-2" />
              Work History
            </Link>
            <Link href="/projects" className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition duration-300">
              <Image src="/briefcase.png" width={20} height={20} alt="Projects Image" className="mr-2" />
              Projects
            </Link>
            <Link href="/education" className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition duration-300">
              <Image src="/reading-list.png" width={20} height={20} alt="Education Image" className="mr-2" />
              Education
            </Link>
            <Link href="/contact" className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition duration-300">
              <Image src="/contact.png" width={20} height={20} alt="Contact Image" className="mr-2" />
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
