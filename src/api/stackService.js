import axios from 'axios';
import baseUrl from './apiUrl';

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
