"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

interface Sponsor {
  [key: number]: string;
}

const SponsorsSection: React.FC = () => {
  const [sponsorsLoading, setSponsorsLoading] = useState(true);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [sponsorsError, setSponsorsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get("/api/sponsors");
        setSponsors(response.data["values"]);
      } catch (error: any) {
        if (error.response?.status === 429) {
          setSponsorsError(
            "It seems like we've hit a rate limit. Please try again later."
          );
        } else if (error.message) {
          setSponsorsError(`An error occurred: ${error.message}`);
        } else {
          setSponsorsError(
            "An unknown error occurred while fetching sponsors."
          );
        }
      } finally {
        setSponsorsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <div className="flex flex-col w-full py-12 bg-[#014321]">
      <h2 className="text-3xl font-oswald text-white text-center">
        OUR SPONSORS
      </h2>
      <p className="text-center text-lg font-oswald text-white mt-4">
        We are grateful for the support of our sponsors. Please consider
        supporting them.
      </p>
      <div className="flex justify-center items-center mx-auto">
        {sponsorsLoading ? (
          <div className="h-48 flex justify-center items-center">
            <CgSpinner className="animate-spin h-8 w-8 text-white" />
          </div>
        ) : sponsorsError ? (
          <p className="text-red-600 font-oswald text-lg">{sponsorsError}</p>
        ) : (
          <Marquee gradient={false} speed={50} className="max-w-screen">
            {sponsors.map((sponsor: any) => (
              <Link
                target="_self"
                href={sponsor[3] == "https://#" ? "" : sponsor[3]}
                key={sponsor[0]}
              >
                <div className="flex flex-col items-center justify-center mx-4 my-10 h-48 border-2 bg-white hover:shadow-lg transform hover:scale-105 transition duration-300">
                  <div className="flex items-center justify-center h-32">
                    <Image
                      src={`/images/sponsors/${sponsor[4]}`}
                      alt={sponsor[0]}
                      width={200}
                      height={100}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <p className="text-[#014321] font-oswald text-lg mt-2 text-center">
                    {sponsor[1]}
                  </p>
                </div>
              </Link>
            ))}
          </Marquee>
        )}
      </div>
    </div>
  );
};

export default SponsorsSection;