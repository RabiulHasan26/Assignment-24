import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import UserCard from './components/UserCard';
import UserDetails from './components/UserDetails';

import useFavoriteStore from './store/favoriteStore';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Zustand Store
  const favorites = useFavoriteStore(state => state.favorites);

  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Check Favorite User
  const isFavorite = userId => {
    return favorites.some(user => user.id === userId);
  };

  // Filter Users
  const displayedUsers = activeTab === 'favorites' ? favorites : users;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        totalUsers={users.length}
        favoriteCount={favorites.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {activeTab === 'all' ? 'All Users' : 'Favorite Users'}
          </h1>

          <p className="text-gray-500 mt-3">
            Manage your users and favorite people
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-xl text-indigo-600 font-semibold">
              Loading users...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-red-600 mb-4">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        )}

        {/* User Cards */}
        {!loading &&
          !error &&
          (displayedUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  isFavorite={isFavorite(user.id)}
                  onFavorite={() => toggleFavorite(user)}
                  onDetails={() => setSelectedUser(user)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Users Found!
              </h2>

              <p className="text-gray-500 mt-2">
                {activeTab === 'favorites'
                  ? "You haven't added any favorite users yet."
                  : 'No users available.'}
              </p>
            </div>
          ))}
      </main>

      {/* User Details Modal */}
      <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />

      {/* Footer */}
      <footer className="bg-indigo-700 text-white text-center py-5 mt-10">
        <p>© 2026 User Management App | React Assignment</p>
      </footer>
    </div>
  );
}

export default App;
