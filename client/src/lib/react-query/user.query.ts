import { getUser } from "@/actions/auth.actions";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => useQuery({
  queryKey: ['user'],
  queryFn: getUser,
})

export const useAuth = () => {
  const { data: user, isPending: loading } = useUser()
  return { user, loading }
}
