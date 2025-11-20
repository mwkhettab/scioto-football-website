import React from "react";

type ScheduleRow = Array<string | number>;

interface ScheduleCardProps {
  row: ScheduleRow;
  isNextGame: boolean;
  isPastGame?: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  row,
  isNextGame,
  isPastGame = false,
}) => (
  <div
    className={`border shadow-md p-4 ${
      isNextGame
        ? "bg-[#014321] border-2 border-[#014321] text-white"
        : isPastGame
        ? "bg-gray-50 border-gray-300 text-gray-700"
        : "bg-white border-[#014321] text-[#014321]"
    }`}
  >
    <h2 className="text-xl uppercase mb-2">
      Scioto vs. {row[3]}{" "}
      {isNextGame && (
        <span className="ml-2 bg-white text-[#014321] px-2 py-0.5 text-xs">
          Next Game
        </span>
      )}
      {isPastGame && (
        <span className="ml-2 bg-gray-400 text-white px-2 py-0.5 text-xs">
          Completed
        </span>
      )}
    </h2>
    <p className="text-sm">When: {row[7]}</p>
    <p className="text-sm">
      Where: {row[6] === "H" ? "Home" : `Away (${row[3]})`}
    </p>

    {row[8] && <p className="text-sm">Event: {row[8]}</p>}
    {row[1] && row[2] && row[4] && (
      <p
        className={`text-sm font-extrabold mt-2 ${isPastGame ? "text-lg" : ""}`}
      >
        Final Score: {row[1]} - {row[2]} ({row[4]})
      </p>
    )}
    {row[10] && (
      <a
        href={row[10].toString()}
        className={`text-sm underline mt-2 inline-block ${
          isNextGame
            ? "text-white"
            : isPastGame
            ? "text-blue-600"
            : "text-blue-500"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        MaxPreps Link
      </a>
    )}
  </div>
);

export default ScheduleCard;
