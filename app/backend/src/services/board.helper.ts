export default function performance(homeTeam: string, awayTeam: string) {
  return `SELECT teams.team_name as name,
ra.tDraws + (ra.tVictory * 3) as totalPoints, ra.tGames as totalGames,
ra.tVictory as totalVictories, ra.tDraws as totalDraws,
ra.tLosses as totalLosses, SUM(ra.goals) as goalsFavor, ra.awayGoals as goalsOwn,
ra.balance as goalsBalance,
ROUND((ra.tDraws + (ra.tVictory * 3)) / (ra.tGames * 3) * 100, 2) as efficiency
FROM teams LEFT JOIN (SELECT so.${homeTeam}_team_id,
  SUM(so.${homeTeam}_team_goals) as goals,
  COUNT(so.${homeTeam}_team_id) as tGames,
  SUM(so.${homeTeam}_team_goals > so.${awayTeam}_team_goals) as tVictory,
  SUM(so.${homeTeam}_team_goals = so.${awayTeam}_team_goals) as tDraws,
  SUM(so.${homeTeam}_team_goals < so.${awayTeam}_team_goals) as tLosses,
  SUM(so.${awayTeam}_team_goals) as awayGoals,
  SUM(so.${homeTeam}_team_goals - so.${awayTeam}_team_goals) as balance
  FROM matches as so WHERE so.in_progress = 0 GROUP BY so.${homeTeam}_team_id
) as ra ON teams.id = ra.${homeTeam}_team_id
GROUP BY teams.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;
}
