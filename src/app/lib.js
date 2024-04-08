const asyncRouterPush = (router, route) => {
  return new Promise((resolve) =>
    router.push(route, undefined, { shallow: true }, resolve),
  );
};

export const formatDate = (date) => {
  const d = new Date(date);
  return `${d.toLocaleString()}`;
};
