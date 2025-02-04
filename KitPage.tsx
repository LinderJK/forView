import { getAllDevKit } from '@/app/_actions/devKitActions';
import KitPreview from '@/components/DevKit/KitPreview';
import type { IDevKit } from '@/models/DevKit';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export default async function DevKitList() {
    const data: IDevKit[] = await getAllDevKit();
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
                Комплекты
            </Typography>
            <Grid2 container spacing={2}>
                {data.length > 0 ? (
                    data?.map((elem) => (
                        <Grid2 key={elem._id} xs={12} md={6} lg={4}>
                            <KitPreview data={elem} />
                        </Grid2>
                    ))
                ) : (
                    <Grid2 xs={12}>
                        <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                            Комплекты не найдены
                        </Typography>
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
}
