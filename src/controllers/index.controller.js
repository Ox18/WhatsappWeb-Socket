export const renderIndex = (req, res) => {
  res.render("index", { title: "Express" });
};

export const renderMain = (req, res) => {
  res.render("layouts/main", { title: "Express" });
};
