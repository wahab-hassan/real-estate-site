import supabase from "./supabase";

export async function signUp(
  email: string,
  password: string,
  role: string,
  name: string,
  phone: string
) {
  const result = await supabase.auth.signUp({ email, password });
  if (result.error) throw result.error;
  console.log(result);

  // Insert additional user data into the users table
  const { data, error: insertError } = await supabase.from("users").insert([
    {
      id: result.data.user?.id,
      email: email,
      role: role,
      name: name,
      phone: phone,
    },
  ]);

  if (insertError) throw insertError;
  return data;
}

export async function signIn(email: string, password: string) {
  const result: any = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (result.error) throw result.error;

  const userId = result.data.user.id;
  const data = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (data.error) throw data.error;

  localStorage.setItem("userData", JSON.stringify(data.data));

  return data.data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
  localStorage.removeItem("userData");
  localStorage.removeItem("sb-bttvroyktkjlseeiblwt-auth-token");

  return true;
}
