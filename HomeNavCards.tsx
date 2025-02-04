'use client';

import { Card, CardContent, Grow, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useAuthSession from '@/hooks/useAuthSession';
import type { EDashboardUserRole } from '@/models/DashboardUsers';
import { navigationItems } from './SideNavigation';

const ANIMATE_TIMEOUT = 400;

export default function HomeNavCards() {
    const router = useRouter();
    const { session } = useAuthSession();

    const cardsToShow = navigationItems.getItems(session?.user?.role as EDashboardUserRole).slice(1) || [];

    const isLargeSize = cardsToShow.length <= 3;

    return (
        <Grid2 container spacing={3}>
            {cardsToShow.map((item, index) => (
                <Grow in key={item.name} timeout={ANIMATE_TIMEOUT * index}>
                    <Grid2 xs={12} sm={6} md={isLargeSize ? 12 : 6} lg={isLargeSize ? 12 : 4} key={item.name}>
                        <Card
                            elevation={3}
                            onClick={() => router.push(item.path)}
                            sx={{ ':hover': { cursor: 'pointer', boxShadow: 10 } }}
                        >
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Image src={item.image} alt={item.name} width={50} height={50} />
                                <Typography variant="body1">{item.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grow>
            ))}
        </Grid2>
    );
}
