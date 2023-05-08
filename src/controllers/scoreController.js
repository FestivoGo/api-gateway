const { Score } = require("../models");
const response = require("./response");

async function getScoreByUsername(req, res, next) {
  const { username } = req.params;
  const score = await Score.findOne({
    where: {
      username: username,
    },
  });
  response(200, "get score by username", score, res);
}

async function getAllScore(req, res, next) {
  const { username } = req.query;
  let score = await Score.findOne({
    where: {
      username: username || "",
    },
  });

  if (!score) {
    score = await Score.findAll();
    return response(200, "get all scores", score, res);
  }
  response(200, "get score by username", score, res);
}

async function updatePoint(req, res) {
  const { point, remedial_point } = req.body;
  const { username } = req.params;

  const user = await Score.findOne({
    where: {
      username: username,
    },
  });
  console.log(user.number_of_try);
  let number_of_try = user.number_of_try + 1;

  const updatedUser = await Score.update(
    {
      point: point || user.point,
      remedial_point: remedial_point || user.remedial_point,
      number_of_try: number_of_try || user.number_of_try,
    },
    {
      where: {
        username: username,
      },
    }
  );

  response(203, "point updated", [], res);
}

module.exports = {
  getAllScore,
  getScoreByUsername,
  updatePoint,
};
