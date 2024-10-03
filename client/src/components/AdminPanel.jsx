// Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">AdminPanelX</div>
          <nav className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Form Preview</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Form Details</a>
          </nav>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 mb-16 rounded-xl shadow-lg">
            <h3 className="text-lg font-medium">Total Forms Submitted</h3>
            <p className="text-6xl font-semibold text-gray-900">1,452</p>
            <p className="text-lg text-gray-600">All forms submitted by users.</p>
          </div>

          <div className="flex translate-x-full flex-row p-2 mb-16">
            <h3 className="text-lg px-2 mx-auto font-medium my-auto">Download all the forms in PDF format</h3>
            <button className='bg-black text-xl my-auto mx-auto text-white items-center py-2 px-4 rounded-full'>Download</button>

          </div>
        </div>
        
        <div className="bg-white p-6 w-full mb-6 rounded-xl shadow-lg flex justify-between">
            <div className='flex-col space-y-2 flex'>
            <h3 className="text-3xl font-semibold">Chennai Super Kings</h3>
            <p className="text-lg text-gray-600">Captain: <span className='text-2xl font-medium'>Mahendra Singh Dhoni</span></p>
            </div>
            <div className='flex space-x-3 my-auto'>
                <button className='bg-black text-white text-lg py-2 px-4 rounded-full'>View</button>
                <button className='text-black hover:bg-gray-200 border-2 border-black text-lg py-2 px-4 rounded-full'>Download</button>
            </div>
          </div>

          <div className="bg-white p-6 mb-6 w-full rounded-xl shadow-lg flex justify-between">
            <div className='flex-col space-y-2 flex'>
            <h3 className="text-3xl font-semibold">Mumbai Indians</h3>
            <p className="text-lg text-gray-600">Captain: <span className='text-2xl font-medium'>Faf Du Plesis</span></p>
            </div>
            <div className='flex space-x-3 my-auto'>
                <button className='bg-black text-white text-lg py-2 px-4 rounded-full'>View</button>
                <button className='text-black hover:bg-gray-200 border-2 border-black text-lg py-2 px-4 rounded-full'>Download</button>
            </div>
          </div>

      </main>

      {/* Footer */}
      <footer className="bg-white bottom-0 mt-10 p-4 text-center">
        <div className="text-sm text-gray-500">
          <a href="#" className="hover:underline">Privacy Policy</a> | 
          <a href="#" className="hover:underline ml-2">Terms of Service</a> | 
          <a href="#" className="hover:underline ml-2">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
