import { AppBar, Toolbar, Typography } from '@mui/material';
import { RouteConfig } from '../route/RouteConfig'

export const App = () => {
    return (
        <div>
            <AppBar position='relative' color='primary'>
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap alignSelf='center'>
                    &#x1f363;寿司カウンター&#x1f363; 食べた寿司をカウントしよう
                    </Typography>
                </Toolbar>
            </AppBar>
			<RouteConfig />
        </div>
    )
}
