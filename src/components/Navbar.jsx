function Navbar({ totalUsers, favoriteCount, activeTab, setActiveTab }) {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'all' ? 'bg-white text-indigo-700' : 'bg-indigo-600'
            }`}
          >
            Total Users: {totalUsers}
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'favorites'
                ? 'bg-white text-indigo-700'
                : 'bg-indigo-600'
            }`}
          >
            Favorites: {favoriteCount}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
