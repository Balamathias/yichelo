import { getUser, logout, resetPassword, sendResetPassword, sendVerificationOtp, verifyEmail } from "@/actions/auth.actions";
import { deleteUser } from "@/actions/user.actions";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUser = () => useQuery({
  queryKey: ['user'],
  queryFn: getUser,
})

export const useAuth = () => {
  const { data: user, isPending: loading } = useUser()
  return { user, loading }
}

export const useLogout = () => useMutation({
  mutationKey: ['logout'],
  mutationFn: () => logout(),
})

export const useVerifyEmail = () => useMutation({
  mutationKey: ['verify-email'],
  mutationFn: (otp: string) => verifyEmail(otp),
})

export const useSendVerificationOtp = () => useMutation({
  mutationKey: ['send-verification-otp'],
  mutationFn: (email: string) => sendVerificationOtp(email),
})

export const useSendResetPassword = () => useMutation({
  mutationKey: ['send-reset-password'],
  mutationFn: (email: string) => sendResetPassword(email),
})

export const useResetPassword = () => useMutation({
  mutationKey: ['reset-password'],
  mutationFn: ({ otp, password, email }:{otp: string, password: string, email: string}) => resetPassword(otp, password, email),
})

export const useDeleteUser = () => useMutation({
  mutationKey: ['delete-user'],
  mutationFn: (userId: string) => deleteUser(userId),
});