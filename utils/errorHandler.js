const queryString = require('query-string');
const { RECO_BASE_URL } = require('../config');

errorHandler = async (err, userId, requestUrl) => {
  switch (err.status) {
    case '401':
      const params = {
        id: userId,
      };

      const refreshUrl = `${RECO_BASE_URL}?${queryString.stringify(params)}`;
      
  }
};
