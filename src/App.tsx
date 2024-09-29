"use client"

import React, {useEffect, useState} from 'react';

import './App.css'

interface Thought {
    id: number;
    text: string;
   createdAt: number;
}


function App() {
    const [thoughts, setThoughts] = useState<Thought[]>([]);
    const [newThought, setNewThought] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            setThoughts(prevThoughts =>
                prevThoughts.filter(thought => now - thought.createdAt < 15000)
            )
        }, 100) // Update more frequently for smoother removal

        return () => clearInterval(timer)
    }, []);

    const addThought = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newThought.trim() !== '') {
            const thought: Thought = {
                id: Date.now(),
                text: newThought,
                createdAt: Date.now()
            };
            setThoughts(prev => [thought, ...prev]);
            setNewThought(''); // Clear input field
        }
    };

    const removeThought = (id: number) => {
        setThoughts(prev => prev.filter(thought => thought.id !== id));
    };

    return (
        <div className='min-h-screen bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden'>
                <div className='p-6'>
                    <h1 className='text-2xl font-bold mb-4 text-center text-gray-800'>
                       Passing Thoughts 💭
                    </h1>
                    <form onSubmit={addThought} className='mb-6'>
                        <div className='flex space-x-2'>
                            <input
                                type={'text'}
                                value={newThought}
                                onChange={(e) => setNewThought(e.target.value)}
                                placeholder={"What's on your mind?"}
                                className='flex-grow px-4 py-2 border border-grey-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400'
                            />
                            <button
                                type='submit'
                                className='px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gradient-to-r from-blue-500 to-pink-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2'>
                            Add
                            </button>
                        </div>
                    </form>

                    <div className='space-y-4'>
                        {thoughts.map(thought => (
                            <div key={thought.id} className='relative bg-gray-50 rounded-lg p-4'>
                                <p className='text-gray-800'>{thought.text}</p>
                                <div className='absolute bottom-2 right-2 text-sm text-gray-500'>
                                    {Math.max(0, Math.ceil((15000 - (Date.now() - thought.createdAt)) / 1000))}s
                                </div>
                                <button
                                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
                                    onClick={() => removeThought(thought.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                                <div className='absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-linear'
                                    style={{ width: `${Math.max(0, (15000 - (Date.now() - thought.createdAt)) / 150)}%` }}>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default App
