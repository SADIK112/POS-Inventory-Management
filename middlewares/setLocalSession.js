import shopify from "../shopify.js";

const setShopSessionToResLocals = async (req, res, next) => {
  const shop = shopify.api.utils.sanitizeShop(req.query.shop);
  const sessionId = shopify.api.session.getOfflineId(shop);
  const session = await shopify.config.sessionStorage.loadSession(sessionId);

  if (!session) {
    return shopify.auth.begin()(req, res, next);
  }
  res.locals.session = session;
  return next();
};

export default setShopSessionToResLocals;
