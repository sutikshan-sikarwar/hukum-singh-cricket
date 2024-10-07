import React from 'react';

const ExploreMore = () => {
  const cards = [
    { image: 'tournament1.png' },
    { image: 'tournament8.png' },
    { image: 'tournament3.png' },
    { image: 'tournament4.png' },
    { image: 'tournament2.png' },
    { image: 'tournament6.png' },
    { image: 'tournament7.png' },
    { image: 'tournament5.png' },
    { image: 'tournament9.png' },
    { image: 'tournament10.png' },
    { image: 'tournament11.png' },
    { image: 'tournament12.png' },
  ];

  return (
    <div>
      <div className="container mx-auto py-8">
        <h2 className="text-center text-2xl font-bold mb-6">Some insights to the Year 2023</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={card.image}
                alt={`Tournament ${index + 1}`}
                className="w-full h-48 md:h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center bg-white p-5">
        <div className="bg-gray-300 w-full md:w-1/3 p-6 rounded-xl text-center md:text-left shadow-md">
          <h1 className="text-2xl font-medium mb-6">HUKUM SINGH THAKUR CRICKET TOURNAMENT</h1>
          <ul>
            <li className="text-lg text-gray-900 font-semibold"><a href="/*">Tournament Schedule</a></li>
            <li className="text-lg text-gray-900 mb-3">15 October - 15 November</li>
            <li className="text-lg text-gray-900 hover:text-orange-600 font-semibold mb-3"><a href="/register">Apply Now</a></li>
            <li className="text-lg text-gray-900 hover:text-orange-600 font-semibold mb-3"><a href="/regulations">Tournament Rules</a></li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0 md:ml-6"> 
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
