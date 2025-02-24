import supabase from "./supabase";
export default async function checkAuth(setIsLoggedIn, setIsAdmin) {
  const result = await supabase.auth.getUser();
  let role;

  if (result.data.user) {
    // check if role exists (ie is new user or not)
    let { data, error } = await supabase
      .from("user_roles")
      .select()
      .eq("user_id", result.data.user.id);

    if (data.length !== 0 && data[0].user_role) {
      role = data[0].user_role;
      if (role == "admin") {
        setIsAdmin(true);
      }
    }

    if (data.length == 0) {
      const { data, error } = await supabase.from("user_roles").insert({
        user_id: result.data.user.id,
        user_name: result.data.user.user_metadata.full_name,
      });
      role = data[0].user_role;
    }

    setIsLoggedIn(true);
  }
  return [result, role];
}
