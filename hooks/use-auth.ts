import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  return {
    user: session?.user,
    loading: status === "loading",
    signOut: handleSignOut,
    isAuthenticated: !!session?.user,
    isAdmin: session?.user?.role === "admin",
    isAgronomist: session?.user?.role === "agronomist",
    isFarmer: session?.user?.role === "farmer",
    isFarmManager: session?.user?.role === "farm_manager",
    hasRole: (role: string) => session?.user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(session?.user?.role || ""),
  };
}