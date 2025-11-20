"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CgSpinner } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import axios from "axios";

interface Newsletter {
  name: string;
  path: string;
}

const NewslettersSection: React.FC = () => {
  const [newslettersLoading, setNewslettersLoading] = useState(true);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [newslettersError, setNewslettersError] = useState<string | null>(null);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get("/api/newsletters");
        setNewsletters(response.data);
      } catch (error: any) {
        if (error.response?.status === 429) {
          setNewslettersError(
            "It seems like we've hit a rate limit. Please try again later."
          );
        } else if (error.message) {
          setNewslettersError(`An error occurred: ${error.message}`);
        } else {
          setNewslettersError(
            "An unknown error occurred while fetching newsletters."
          );
        }
      } finally {
        setNewslettersLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handleNewsletterClick = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
  };

  const handleCloseModal = () => {
    setSelectedNewsletter(null);
  };

  return (
    <div className="flex flex-col w-full py-12 bg-white">
      <h2 className="text-3xl font-oswald text-[#014321] text-center">
        OUR NEWSLETTERS
      </h2>
      <p className="text-center text-lg font-oswald text-[#014321] mt-4">
        Check out our latest newsletters and stay updated with our community.
      </p>
      <div className="flex justify-center items-center mx-auto px-4 mt-8">
        {newslettersLoading ? (
          <div className="h-48 flex justify-center items-center">
            <CgSpinner className="animate-spin h-8 w-8 text-[#014321]" />
          </div>
        ) : newslettersError ? (
          <p className="text-red-600 font-oswald text-lg">{newslettersError}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl">
            {newsletters.map((newsletter, index) => (
              <button
                key={index}
                onClick={() => handleNewsletterClick(newsletter)}
                className="flex flex-col items-center justify-center p-4 border-2 bg-[#014321] hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-center h-48 w-full">
                  <Image
                    src={newsletter.path}
                    alt={newsletter.name}
                    width={300}
                    height={400}
                    className="object-contain max-h-full"
                  />
                </div>
                <p className="text-white font-oswald text-sm mt-2 text-center">
                  {newsletter.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal for enlarged newsletter view */}
      {selectedNewsletter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-5xl max-h-[90vh] bg-white p-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-[#014321] text-white rounded-full p-2 hover:bg-green-950 transition duration-300"
              aria-label="Close"
            >
              <IoClose size={24} />
            </button>
            <div className="overflow-auto max-h-[85vh]">
              <Image
                src={selectedNewsletter.path}
                alt={selectedNewsletter.name}
                width={1200}
                height={1600}
                className="object-contain w-full h-auto"
              />
            </div>
            <p className="text-white font-oswald text-lg mt-8 text-center">
              {selectedNewsletter.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewslettersSection;