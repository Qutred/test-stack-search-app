import axios from 'axios';
import baseUrl from './apiUrl';

/* ------------------------ Get search query results ------------------------ */

export const seachByQuery = async props => {
  const {
    order = 'desc',
    sort = 'relevance',
    site = 'stackoverflow',
    intitle = '',
  } = props;

  return axios.get(`${baseUrl}/search/`, {
    params: {
      order,
      sort,
      site,
      intitle,
    },
  });
};

/* --------------------------- Get users questions -------------------------- */

export const getUserQuestions = async props => {
  const {
    order = 'desc',
    sort = 'votes',
    site = 'stackoverflow',
    userId,
  } = props;

  return axios.get(`${baseUrl}/users/${userId}/questions`, {
    params: {
      order,
      sort,
      site,
    },
  });
};

/* --------------------------- Get data by tag -------------------------- */

export const getDataByTag = async props => {
  const { order = 'desc', sort = 'votes', site = 'stackoverflow', tag } = props;

  return axios.get(`${baseUrl}/search`, {
    params: {
      order,
      sort,
      site,
      tagged: tag,
    },
  });
};
