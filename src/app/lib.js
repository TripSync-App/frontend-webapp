const asyncRouterPush = (router, route) => {
  return new Promise((resolve) =>
    router.push(route, undefined, { shallow: true }, resolve),
  );
};
