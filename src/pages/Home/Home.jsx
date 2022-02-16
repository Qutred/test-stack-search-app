import React, { useRef } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = searchQuery => {
    navigate(`/results/?q=${searchQuery}`);
  };

  return <SearchForm handleSearch={handleSearch} />;
};

export default Home;
