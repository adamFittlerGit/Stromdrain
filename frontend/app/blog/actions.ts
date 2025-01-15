'use server';
import { checkAuth } from "@/utils/services/auth";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export async function serverAuthCheck() {
  const isLoggedIn = await checkAuth();

  return isLoggedIn;
}