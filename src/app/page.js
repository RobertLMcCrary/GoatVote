'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const API_BASE_URL = '/api/votes';

export default function Home() {
    const [mjVotes, setMjVotes] = useState(0);
    const [lebronVotes, setLebronVotes] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the current vote counts when the component mounts
    useEffect(() => {
        async function fetchVotes() {
            try {
                const mjResponse = await fetch(`${API_BASE_URL}/mj`);
                const lebronResponse = await fetch(`${API_BASE_URL}/lebron`);

                if (!mjResponse.ok || !lebronResponse.ok) {
                    throw new Error('Error fetching vote counts');
                }

                const mjData = await mjResponse.json();
                const lebronData = await lebronResponse.json();

                setMjVotes(mjData.MichaelJordan);
                setLebronVotes(lebronData.LeBronJames);
            } catch (error) {
                setMessage('Error fetching vote counts');
            } finally {
                setLoading(false);
            }
        }

        fetchVotes();
    }, []);

    // Function to cast a vote
    async function castVote(candidate) {
        if (Cookies.get('voted')) {
            setMessage('You have already voted!');
            return;
        }

        try {
            const endpoint = `${API_BASE_URL}/${candidate.toLowerCase()}`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                Cookies.set('voted', 'true', { expires: 1 }); // Set cookie for 1 day
                if (candidate === 'MJ') {
                    setMjVotes(result.count);
                } else if (candidate === 'LeBron') {
                    setLebronVotes(result.count);
                }
            } else {
                setMessage(result.message || 'Error casting vote');
            }
        } catch (error) {
            setMessage('Error casting vote');
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Vote for the GOAT
            </h1>

            <div className="flex justify-center gap-6 mb-8 flex-wrap">
                <button
                    id="vote-mj"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => castVote('MJ')}
                >
                    Vote for Michael Jordan
                </button>
                <button
                    id="vote-lebron"
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => castVote('LeBron')}
                >
                    Vote for LeBron James
                </button>
            </div>

            <div className="flex justify-center gap-12 mb-8 flex-wrap">
                <div className="bg-gray-100 p-6 rounded-lg text-center w-48">
                    <h2 className="text-xl text-gray-700 mb-4">
                        Michael Jordan
                    </h2>
                    <Image
                        alt="mj image"
                        className="mx-auto rounded-full"
                        src="/MichaelJordanImage.jpeg"
                        width={100}
                        height={100}
                    />
                    <p className="mt-4 text-lg text-teal-500 font-semibold">
                        Votes: {mjVotes}
                    </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg text-center w-48">
                    <h2 className="text-xl text-gray-700 mb-4">LeBron James</h2>
                    <Image
                        alt="lebron image"
                        className="mx-auto rounded-full"
                        src="/LeBronSunshineImage.jpeg"
                        width={100}
                        height={100}
                    />
                    <p className="mt-4 text-lg text-teal-500 font-semibold">
                        Votes: {lebronVotes}
                    </p>
                </div>
            </div>

            {message && (
                <div
                    className={`mt-6 text-lg ${
                        message.includes('already')
                            ? 'text-red-600'
                            : 'text-green-600'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
