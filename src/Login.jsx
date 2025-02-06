import supabase from "./utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => (
  <div className="Login">
    <h2>Admin Login</h2>
    <p>(If you're not me or Erik then please go away)</p>
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
      onlyThirdPartyProviders
    />
  </div>
);
export default Login;
