'use client';

import { useCallback, useContext } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { AuthContext, authDefaultValue } from '@/app/components/auth-context';
import axiosWithAuth from '@/app/utils/axiosWithAuth';

import { DialogResultController } from '../../components/dialog-result';
import { axiosWithoutAuth } from '../../utils/axiosWithoutAuth';

type Response = {
  message: string;
  data: {
    isVerifySales: boolean;
    userId: string;
    name: string;
    phone: string;
    email: string;
    isUsed: boolean;
    access_token: string;
  };
};

export const useAuth = () => {
  const { replace } = useRouter();

  const { setAuth, auth } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const signIn = useCallback(
    async (value: { emailPhone: string; password: string }) => {
      const newValue = value.emailPhone.includes('@')
        ? value.emailPhone
        : value.emailPhone.replace(/^62|^0/, '');
      const { data: result } = await axiosWithoutAuth<Response>({
        method: 'POST',
        url: '/auth/login',
        data: {
          email_phone: newValue,
          password: value.password,
        },
      });

      const { data } = result;

      axiosWithAuth.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
      setAuth({
        userId: data.userId,
        email: data.email,
        name: data.name,
        phone: data.phone,
      });
      return result;
    },
    [setAuth],
  );

  const forgotPassword = useCallback(async (value: { email: string }) => {
    const { data: result } = await axios.post<Response>(`/auth/send-reset-password/${value.email}`);
    return result;
  }, []);

  const signOut = useCallback(async () => {
    try {
      const result = await axiosWithoutAuth.get(`/auth/logout`, {
        withCredentials: true,
      });
      axiosWithAuth.defaults.headers.common['Authorization'] = '';
      await replace('/auth/login');
      queryClient.clear();
      setAuth(authDefaultValue);
      return result.data.message;
    } catch (error) {
      if (error instanceof AxiosError) {
        DialogResultController.open({
          content: error.response?.data.message || error.message,
          variant: 'error',
          closeButtonTitle: 'Tutup',
        });
      }
    }
  }, [setAuth, queryClient, replace]);

  return { auth, setAuth, signIn, signOut, forgotPassword };
};
