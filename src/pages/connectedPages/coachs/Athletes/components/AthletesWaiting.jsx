import React from 'react'
import {
  FiCheck,
  FiX,
  FiUserPlus,
} from "react-icons/fi";
export default function AthletesWaiting({ pendingAthletes, handleAccept, handleRemove }) {
  return (
    <div className="animate-in slide-in-from-top-4 duration-500">
      <h3 className="text-orange-600 font-bold text-sm mb-3 flex items-center gap-2 px-1">
        <FiUserPlus className="animate-bounce" /> Demandes en attente (
        {pendingAthletes.length})
      </h3>
      <div className="space-y-3">
        {pendingAthletes.map((athlete) => (
          <div
            key={athlete.id}
            className="bg-orange-50/50 border border-orange-200 p-4 rounded-2xl flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center font-bold text-orange-700">
                {athlete.username?.charAt(0).toUpperCase()}
              </div>
              <span className="font-bold text-sm">{athlete.username}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(athlete.id)}
                className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-sm transition-all active:scale-95"
              >
                <FiCheck size={18} />
              </button>
              <button
                onClick={() => handleRemove(athlete.id)} // Remove ici fait office de "Refuser"
                className="p-3 bg-white border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-100 transition-all active:scale-95"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
