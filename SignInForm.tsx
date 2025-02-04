'use client';

import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import validationLoginSchema from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';

function SignInForm() {
    const [authError, setAuthError] = useState('');
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(validationLoginSchema),
    });

    const errorMessages =
        {
            CredentialsSignin: 'Ошибка входа: проверьте логин и пароль',
            Configuration: 'Проблема с конфигурацией сервера',
            AccessDenied: 'Доступ запрещен',
            Verification: 'Токен истек',
            Default: 'Ошибка',
        }[authError] || ' ';

    const onSubmit = async (data: { email: string; password: string }) => {
        const { email, password } = data;
        try {
            const response = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (response?.error) {
                setAuthError(response.error);
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="input-with-icon-textfield"
                                label="Email"
                                variant="standard"
                                fullWidth
                                type="email"
                                helperText={errors.email?.message ?? ' '}
                                error={Boolean(errors.email)}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={Boolean(errors.password)}
                                id="input-with-icon-textfield"
                                label="Пароль"
                                variant="standard"
                                type="password"
                                fullWidth
                                helperText={errors.password?.message ?? ' '}
                            />
                        )}
                    />
                </Box>
                <Button type="submit" variant="contained" size="small">
                    Войти
                </Button>

                {errorMessages && (
                    <Typography variant="subtitle1" color="error.main">
                        {errorMessages}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default SignInForm;
