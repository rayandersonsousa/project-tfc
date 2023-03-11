import { RequestHandler } from 'express';
import TeamsServices from '../services/TeamsServices';

const teamsServices = new TeamsServices();

export const nameValidation: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export const teamValidation: RequestHandler = async (req, res, next) => {
  const { homeTeamId, awayTeamId } = req.body;

  const getHome = await teamsServices.getById(homeTeamId);
  const getAway = await teamsServices.getById(awayTeamId);

  if (!getHome || !getAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};
