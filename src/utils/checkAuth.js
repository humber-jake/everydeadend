import supabase from "./supabase";
export default async function checkAuth(setIsLoggedIn) {
  const result = await supabase.auth.getUser();
  if (result.data.user) {
    setIsLoggedIn(true);
  }
  return result;
}
