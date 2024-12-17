import React, { useState, useEffect } from 'react';
import SelectedMoviesList from '../../components/SelectedMoviesList/SelectedMoviesList';
import Pagination from '../../components/Pagination/Pagination';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const PlaylistsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const moviesPerPage = 20;
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      if (currentUser) {
        const docRef = doc(db, 'selectedMovies', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().movies) {
          const movies = docSnap.data().movies;
          setTotalMovies(Object.keys(movies).length);
        }
      }
    };

    fetchMovies();
  }, [currentUser]);

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <div className="playlists-page-container playlists-page">
      <h1>Избранные фильмы</h1>
      <SelectedMoviesList
        currentPage={currentPage}
        moviesPerPage={moviesPerPage}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PlaylistsPage;
