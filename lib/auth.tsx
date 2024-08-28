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

  // Insert additional user data into the users table
  const { data, error: insertError } = await supabase
    .from("adminusers")
    .insert([
      {
        id: result.data.user?.id,
        email: email,
        role: role,
        name: name,
        phonenumber: phone,
      },
    ]);

  if (insertError) throw insertError;
  return data;
}

export async function signIn(userId: any, userName: any) {
  // Check if user with the given ID exists
  const data: any = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (data.data === (null || {})) {
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
console.log(data, insertError);

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

export async function adminSignIn(email: any, password: any) {
  try {
    // Step 1: Log in the user
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;

    const { user } = signInData;

    // Step 2: Check if the user exists in the database
    const { data: userData, error: userError } = await supabase
      .from("adminusers")
      .select("*")
      .eq("id", user.id)
      .single(); // Assuming user IDs are unique

    if (userError) throw userError;

    // Step 3: Verify the user's role
    if (userData.role === "admin") {
      // User is an admin, return success message
      localStorage.setItem("adminData", JSON.stringify(userData));
      return { success: true, message: "Login successful. Welcome, Admin!" };
    } else {
      // User is not an admin, sign them out
      await supabase.auth.signOut();
      return {
        success: false,
        message: "Access denied. You are not an admin.",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
  localStorage.removeItem("userData");
  localStorage.removeItem("adminData");

  return true;
}

export function handleKakaoLogout() {
  window.Kakao.Auth.logout((err: any) => {
    console.log(err);
    
    localStorage.removeItem("userData");
    localStorage.removeItem("adminData");
    localStorage.setItem("isLoggedIn", "false");
  });
}
