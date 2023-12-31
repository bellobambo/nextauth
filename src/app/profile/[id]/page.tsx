import React from 'react';

export default function UserProfile({params} : any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-white text-2xl mb-4">Profile</h1>
            <hr className="w-20 border-gray-400 mb-4" />
            <p className="text-white">Profile page
                <span className="bg-yellow-300 text-black ml-2 p-2 rounded-md">{params.id}</span>
            </p>
        </div>
    );
}
