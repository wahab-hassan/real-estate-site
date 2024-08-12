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

export async function signIn(userId: any, userName: any) {
  console.log(userId, userName);

  // Check if user with the given ID exists
  const data: any = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (data.error) {
    // Error code for no rows found
    throw data.error;
  }

  console.log(data);

  if (!data.data) {
    // User does not exist, insert the new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          role: "buyer",
          name: userName,
        },
      ])
      .single();

    if (insertError) throw insertError;

    // Store the newly created user data in localStorage
    localStorage.setItem("userData", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");

    return newUser;
  } else {
    // User exists, store their data in localStorage
    localStorage.setItem("userData", JSON.stringify(data.data));
    localStorage.setItem("isLoggedIn", "true");

    return data.data;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
  localStorage.removeItem("userData");

  return true;
}


export function  handleKakaoLogout(){
  window.Kakao.Auth.logout((err: any) => {
    console.log(err);
    localStorage.removeItem("userData");
    localStorage.setItem("isLoggedIn", "false");
  });
};
