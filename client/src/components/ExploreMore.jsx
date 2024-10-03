import React from 'react';

const ExploreMore = () => {
  const cards = [
    {
      image: 'tournament1.png', // Replace with actual image URL
    },
    {
      image: 'tournament8.png', // Replace with actual image URL
    },
    {
      image: 'tournament3.png', // Replace with actual image URL
    },
    {
      image: 'tournament4.png', // Replace with actual image URL
    },
    {
      image: 'tournament2.png', // Replace with actual image URL
    },
    {
      image: 'tournament6.png', // Replace with actual image URL
    },
    {
      image: 'tournament7.png', // Replace with ctual image URL
    },
    {
      image: 'tournament9.png', // Replace with actual image URL
    },
    
  ];

  return (
    <div>
    <div className="container mx-auto py-8">
      <h2 className="text-center text-2xl font-bold mb-6">Some insights to the Year 2023</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center bg-white p-5">
      <div className="bg-gray-300 w-1/3 mr-[-130px] opacity-75 p-16 rounded-xl text-center md:text-left shadow-md">
        <h1 className="text-2xl font-medium mb-6">HUKUM SINGH THAKUR CRICKET TOURNAMENT</h1>
        <ul>
          <li  className="text-lg text-gray-900 font-semibold"><a href="/*">Tournament Schedule</a></li>
          <li  className="text-lg mb-4 text-gray-90">15 October - 15 November</li>
      
          <li  className="text-lg mb-4 text-gray-900 hover:text-orange-600 font-semibold"><a href="/register">Apply Online</a></li>
          <li  className="text-lg mb-4 text-gray-900 hover:text-orange-600 font-semibold"><a href="/regulations">Tournamnet Rules</a></li>
        </ul>
      </div>
      <div className="mt-8 md:mt-0">
        <img
          src={`${process.env.PUBLIC_URL}/players.png`}
          alt="Cricket Celebration"
          className="w-full max-w-xs md:max-w-md"
        />
      </div>
    </div>
    </div>
  );
};

export default ExploreMore;
