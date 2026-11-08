function UserCard({ user, isFavorite, onFavorite, onDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
      <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold mb-4">
        {user.name.charAt(0)}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h2>

      <p className="text-gray-600 text-sm mb-2 break-all">
        <strong>Email:</strong> {user.email}
      </p>

      <p className="text-gray-600 text-sm mb-5">
        <strong>Phone:</strong> {user.phone}
      </p>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onDetails}
          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
        >
          Details
        </button>

        <button
          onClick={onFavorite}
          className={`flex-1 px-3 py-2 rounded-lg text-white ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isFavorite ? '♥ Remove' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
