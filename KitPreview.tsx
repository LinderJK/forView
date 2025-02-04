'use client';

import type { IDevKit } from '@/models/DevKit';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IKitPreviewProps {
    data: IDevKit;
}

export default function KitPreview(props: IKitPreviewProps) {
    const { _id, name, designation, image } = props.data;
    const router = useRouter();
    const handleClick = () => {
        router.push(`/devkit/${_id}`);
    };
    return (
        <Card onClick={handleClick} elevation={6}>
            <CardActionArea>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CardMedia sx={{ height: 150 }} image={image} title={name} />
                    <CardContent>
                        <Box>
                            <Typography variant="h6" component="h2" sx={{ fontSize: '1.1rem' }}>
                                {name}
                            </Typography>
                            <Typography variant="body1" component="p">
                                {designation}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}
