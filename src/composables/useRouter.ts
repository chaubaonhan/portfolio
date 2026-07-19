export const useRouter = () => {
  const resolveUrl = (path: string) => `${import.meta.env.BASE_URL}#${path.startsWith("/") ? path : `/${path}`}`;

  const push = (path: string) => {
    if (typeof window !== "undefined") {
      // The intercepted pushState in useRoute.ts will automatically trigger path updates
      window.history.pushState(null, "", resolveUrl(path));
    }
  };

  const replace = (path: string) => {
    if (typeof window !== "undefined") {
      // The intercepted replaceState in useRoute.ts will automatically trigger path updates
      window.history.replaceState(null, "", resolveUrl(path));
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history?.back?.();
    }
  };

  return {
    push,
    replace,
    back,
  };
};
