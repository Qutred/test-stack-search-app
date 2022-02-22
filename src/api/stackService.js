import axios from 'axios';
import baseUrl from './apiUrl';

/* ------------------------ Get search query results ------------------------ */

export const seachByQuery = async props => {
  const {
    order = 'desc',
    sort = 'relevance',
    site = 'stackoverflow',
    intitle = '',
    page = 1,
    pagesize = 5,
    filter = '!6VvPDzQ)xanLb', //show page size and total amount
  } = props;

  return axios.get(`${baseUrl}/search/`, {
    params: {
      order,
      sort,
      site,
      intitle,
      page: page === 0 && 1,
      pagesize,
      filter,
    },
  });
};

/* --------------------------- Get users questions -------------------------- */

export const getUserQuestions = async props => {
  const {
    order = 'desc',
    sort = 'votes',
    site = 'stackoverflow',
    page = 1,
    pagesize = 5,
    userId,
    filter = '!6VvPDzQ)xanLb', //show page size and total amount
  } = props;

  return axios.get(`${baseUrl}/users/${userId}/questions`, {
    params: {
      order,
      sort,
      site,
      page: page === 0 && 1,
      pagesize,
      filter,
    },
  });
};

/* --------------------------- Get data by tag -------------------------- */

export const getDataByTag = async props => {
  const {
    order = 'desc',
    sort = 'votes',
    site = 'stackoverflow',
    tag,
    page = 1,
    pagesize = 5,
    filter = '!6VvPDzQ)xanLb', //show page size and total amount
  } = props;

  return axios.get(`${baseUrl}/search`, {
    params: {
      order,
      sort,
      site,
      tagged: tag,
      page: page === 0 && 1,
      pagesize,
      filter,
    },
  });
};
