import React from 'react'

const Regulations = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hukum Singh Thakur Cricket Tournament</h1>
          <nav className="space-x-6">
            <a href="/*" className="text-gray-600 text-lg hover:text-gray-900">Home</a>
            <a href="/register" className="text-gray-600 text-lg hover:text-gray-900">Apply for Tournament</a>
          </nav>
        </div>
      </header>

      {/* Content */} 
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-normal text-center mb-12">Tournament Rules & Regulations</h2>
        <div className="list-decimal text-center list-inside space-y-10">
            <p className='text-xl'>
            <p className='text-2xl'>
            General Rules:
            </p>
             All players must adhere to the spirit of the game and follow the code of conduct as per the guidelines of the cricket board.
          </p>
          <p className='text-xl'>
            <p className='text-2xl'>
          Player Eligibility:
          </p>
             All players must be registered and meet the eligibility criteria set forth by the tournament committee. Proof of age and identity may be required.
          </p>
          <p className='text-2xl'>
            <p className='text-2xl'>
          Match Format: 
        </p>
            All matches will be played as per the standard Twenty20 format, with each team playing a maximum of 20 overs.
          </p>
          <p className='text-xl'>
            <p className='text-2xl'>
          Equipment: 
         </p>
            All players must wear appropriate cricket attire and use equipment that meets the standards set by the tournament committee.
          </p>
          <p className='text-xl'>
            <p className='text-2xl'>
            Umpiring: 
            </p>
            The decisions made by the on-field umpires are final. Any disputes should be resolved in accordance with the tournament's dispute resolution procedures.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-400 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Hukum Singh Thakur Cricket Tournament</h3>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
          <p>© 2023 Hukum Singh Thakur Cricket Tournament. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Regulations