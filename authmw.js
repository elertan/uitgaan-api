import bearerToken from 'express-bearer-token';
import UserRepo from './routes/v1/repositories/UserRepository';
import HttpStatusCodes from 'http-status-codes';
import ApiResultGen from './ApiResultGen';

const authMw = (req, res, next) => {
  bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
  })(req, res, async () => {
    const token = req.token;
    if (!req.token) {
      res.status(HttpStatusCodes.UNAUTHORIZED).send(ApiResultGen.error('No access token given'));
      return;
    }
    const user = await UserRepo.getByAccessToken(token);
    if (user) {
      req.user = user;
      next();
      return;
    }
    res.status(HttpStatusCodes.UNAUTHORIZED).send(ApiResultGen.error('Invalid access token'));
  });
};

export default authMw;