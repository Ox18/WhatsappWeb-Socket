/**
 * Render the index page
 * @param {Request} req request object
 * @param {Response} res response object
 */
export const renderIndex = (req, res) => {
  res.render("index", { title: "Express" });
};

/**
 * Render the main page
 * @param {Request} req request object
 * @param {Resposne} res responde object
 */
export const renderMain = (req, res) => {
  res.render("layouts/main", { title: "Express" });
};
