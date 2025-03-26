export const sidebarVariants = {
  expanded: {
    width: "16rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
  collapsed: {
    width: "5rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
    },
  },
};

export const mobileSidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export const overlayVariants = {
  open: {
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
    transition: {
      duration: 0.3,
    },
  },
};

export const textVariants = {
  expanded: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: { delay: 0.1, duration: 0.2 },
  },
  collapsed: {
    opacity: 0,
    x: -10,
    transitionEnd: { display: "none" },
    transition: { duration: 0.2 },
  },
};
