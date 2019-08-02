export const getBaseUrl = req => {
  return req ? `${req.protocol}://${req.get('Host')}` : '';
};
