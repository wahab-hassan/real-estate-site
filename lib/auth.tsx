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
  const { data, error: insertError } = await supabase
    .from("users")
    .insert([
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
  const { session, error }: any = await supabase.auth.signInWithPassword({
    email,
    password,
  });  
  if (error) throw error;
  return session;
}
