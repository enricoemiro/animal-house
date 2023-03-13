import { StarIcon } from '@heroicons/react/24/solid';
import { Badge, Group, SimpleGrid, Table, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/app/auth/use-auth.hook';
import { PageHeader } from '@/components/layouts/page-header.component';

import { GET_ALL_GAMES_KEY, getAllGames } from '../api/get-all-games';

export const LeaderboardPage = () => {
  const { data: games } = useQuery({
    queryKey: [GET_ALL_GAMES_KEY],
    queryFn: getAllGames,
    initialData: [],
    retry: 0,
  });

  const {
    meQuery: { data: user },
  } = useAuth();

  const orderPlayersByPoints = (games) => {
    const orderedGames = games.sort((a, b) => {
      return b.score - a.score;
    });

    return orderedGames.map((game, index) => {
      if (game.user.name === user.name) {
        return (
          <tr key={game.id}>
            {index + 1 === 1 ? (
              <td>
                <Group>
                  <Text fz="md">{index + 1}</Text>
                  <StarIcon color="orange" width={20} height={20} />
                </Group>
              </td>
            ) : (
              <td>{index + 1}</td>
            )}
            <td>
              <Group>
                <Text>{game.user.name}</Text>
                <Badge color="orange" variant="filled">
                  You
                </Badge>
              </Group>
            </td>
            <td>{game.name}</td>
            <td>{game.score}</td>
          </tr>
        );
      } else {
        return (
          <tr key={game.id}>
            <td>
              <Group>
                <Text fz="md">{index + 1}</Text>
                {index + 1 === 1 ? <StarIcon color="orange" width={20} height={20} /> : <></>}
              </Group>
            </td>
            <td>{game.user.name}</td>
            <td>{game.name}</td>
            <td>{game.score}</td>
          </tr>
        );
      }
    });
  };

  return (
    <SimpleGrid>
      <PageHeader
        title="Leaderboard"
        subtitle="Hello and welcome to the global leaderboard of our animal quiz game! Test your knowledge and see how you rank against players from all around the world. Good luck and have fun!"
      />
      {games.length > 0 ? (
        <Table mt="lg" horizontalSpacing="lg" verticalSpacing="sm" fontSize="md" withBorder>
          <thead>
            <tr>
              <th>Position</th>
              <th>User name</th>
              <th>Game</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{orderPlayersByPoints(games)}</tbody>
        </Table>
      ) : (
        <Text fz="lg" color="dimmed">
          It seems like nobody has played our quiz yet, be the first.
        </Text>
      )}
    </SimpleGrid>
  );
};
