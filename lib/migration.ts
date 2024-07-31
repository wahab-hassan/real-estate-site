import supabase from "./supabase";
import { fetchProperties } from "./airtable";

const migrateData = async () => {
  const airtableProperties = await fetchProperties();
  const propertiesToInsert = airtableProperties.map((value) =>
    convertToDbFormat(value)
  );
  console.log("====================================");
  console.log(airtableProperties);
  console.log("====================================");
  try {
    const { data, error } = await supabase
      .from("properties")
      .insert(propertiesToInsert);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error during migration:", error);
  }
};

const convertToDbFormat = (data: any) => {
  return {
    contact_point: data["Contact Point"],
    images: [data["Images"]], // Assuming it's a single URL, stored as an array
    move_in: data["Move In"],
    name: data["Name"],
    notes: data["Notes"],
    rent_usd_annual: data["Rent USD Annual"],
    rent_usd_monthly: data["Rent USD Monthly"],
    status: data["Status"],
    address: data["Address"],
    airdna_view: JSON.stringify(data["airdna view"]), // Convert JSON object to string
    google_maps_view: JSON.stringify(data["google maps view"]), // Convert JSON object to string
    last: new Date(data["last"]), // Convert to Date object
    modified_by_id: data["modified"].id,
    modified_by_email: data["modified"].email,
    modified_by_name: data["modified"].name,
  };
};
