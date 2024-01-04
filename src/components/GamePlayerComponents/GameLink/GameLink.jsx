//react, redux, saga -------------------------------------
import { useHistory } from 'react-router-dom';

//material--------------------------------------------
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';

function GameLink({ game, allScores }) {
    const history = useHistory();
    const placeholder = require('./image-placeholder.png');

    function goToGame() {
        history.push(`/game/${game.id}/${game.name}`)
    }

    return (
        <>
            <Card key={game.id} xs={4} elevation={5}>
                <CardHeader
                    disableTypography={true}
                    title={game.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={game.url ? game.url : placeholder}
                    alt={game.title}
                />
                <CardActions disableSpacing>
                    <Button onClick={goToGame}
                        variant='contained'
                        color='primary'>
                        go to game</Button>
                    {allScores.map((score) => {
                        if (game.id === score.gallery_id) {
                            return (
                                <Typography key={score.id} > Current Score: {score.score}</Typography>
                            )
                        }
                    })}
                </CardActions>
            </Card>
        </>


    )
}

export default GameLink