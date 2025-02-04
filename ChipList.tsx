import { Box, Card, Divider, Typography } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import type { IChip } from '@/models/Chip';
import ChipMainInfo from './ChipMainInfo';
import Welcome from './Welcome';

function ChipList() {
    const color = useAppSelector((state) => state.chip.selectedColor);
    const item: IChip | IChip[] | null = useAppSelector((state) => state.chip.selectedChipAllData);

    if (!item) return <Welcome />;

    if (Array.isArray(item))
        return (
            <Box sx={{ p: 1 }}>
                {item.map((chip) => (
                    <Card key={String(chip._id)} sx={{ mb: 10, p: 1 }}>
                        <Divider>
                            <Typography
                                variant="h5"
                                sx={{ backgroundColor: color, borderRadius: '10px', p: 1 }}
                            >{`${chip.vp?.designation ?? '-'} | ${chip.otc?.designation ?? '-'} `}</Typography>
                        </Divider>
                        <ChipMainInfo chip={chip} />
                    </Card>
                ))}
            </Box>
        );
    return <ChipMainInfo chip={item} />;
}
export default ChipList;
