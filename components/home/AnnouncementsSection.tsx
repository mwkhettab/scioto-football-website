"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

interface Announcement {
  [key: number]: string;
}

const AnnouncementsSection: React.FC = () => {
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsError, setAnnouncementsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/announcements");
        setAnnouncements(response.data["values"]);
      } catch (error: any) {
        if (error.response?.status === 429) {
          setAnnouncementsError(
            "It seems like we've hit a rate limit. Please try again later."
          );
        } else if (error.message) {
          setAnnouncementsError(`An error occurred: ${error.message}`);
        } else {
          setAnnouncementsError(
            "An unknown error occurred while fetching announcements."
          );
        }
      } finally {
        setAnnouncementsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-col w-full py-8 bg-[#014321] items-center">
      <h2 className="text-3xl font-oswald text-white text-center mb-6">
        ANNOUNCEMENTS
      </h2>
      {announcementsLoading ? (
        <div className="h-48 flex justify-center items-center">
          <CgSpinner className="animate-spin h-8 w-8 text-white" />
        </div>
      ) : announcementsError ? (
        <p className="text-red-600 font-oswald text-lg">{announcementsError}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
          {announcements.filter(
            (announcement: any) =>
              announcement.length > 0 &&
              announcement[0] != "" &&
              announcement[3] &&
              new Date(announcement[3]) > new Date(Date.now())
          ).length > 0 ? (
            announcements.map(
              (announcement: any, index: number) =>
                announcement.length > 0 &&
                announcement[0] != "" &&
                announcement[3] &&
                new Date(announcement[3]) > new Date(Date.now()) && (
                  <div
                    key={index}
                    className="flex flex-col items-center p-6 border-2 border-white hover:shadow-lg transition duration-300 bg-white mx-4 w-96 h-64"
                  >
                    <p className="text-[#014321] font-oswald text-lg text-center my-auto overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {announcement[0]}
                    </p>

                    <p className="text-[#014321] font-oswald text-sm text-center mt-2 my-auto line-clamp-3">
                      {announcement[1]}
                    </p>

                    {announcement[4] && (
                      <a
                        href={announcement[4]}
                        target="_self"
                        rel="noopener noreferrer"
                        className="mt-4 px-6 py-2 bg-[#014321] text-white font-oswald text-sm hover:bg-green-950 transition duration-300"
                      >
                        SEE MORE
                      </a>
                    )}
                  </div>
                )
            )
          ) : (
            <p className="text-white font-oswald text-lg">
              No upcoming announcements at this time.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsSection;
