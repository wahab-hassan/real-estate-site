import supabase from "./supabase";

export async function createRecord(table: any, data: any) {
  const { data: createdRecord, error } = await supabase
    .from(table)
    .insert(data);

  if (error) throw error;
  return createdRecord;
}
export async function readRecords(
  table:any,
  condition:any = {},
  limit = 10,
  page = 1
) {
  const offset = (page - 1) * limit;

  let query = supabase.from(table).select('*');

  // Apply conditions
  Object.keys(condition).forEach(key => {
    query = query.eq(key, condition[key]);
  });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  // Execute the query
  const { data: records, error } = await query;

  if (error) throw error;
  return records;
}

export async function updateRecord(table: any, id: any, data: any) {
  const { data: updatedRecord, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id);

  if (error) throw error;
  return updatedRecord;
}

export async function deleteRecord(table: any, id: any) {
  const { data: deletedRecord, error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);

  if (error) throw error;
  return deletedRecord;
}

export async function readPaginatedRecords(table: any, limit: any, page: any) {
  const offset = (page - 1) * limit;

  const {
    data: records,
    count,
    error,
  } = await supabase
    .from(table)
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { records, count };
}

export async function getTotalRecords(table: string) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count;
}

export async function selectSpecificRecord(table: any, conditions: any) {
  let query = supabase.from(table).select("*");

  for (const [key, value] of Object.entries(conditions)) {
    query = query.eq(key, value);
  }

  const { data: record, error } = await query.single();

  if (error) throw error;
  return record;
}

export const storePropertyData = async (
  property: any,
  rent: any,
  sell: any
) => {
  try {
    console.log(property, rent, sell);

    let rentalId = null;
    let sellableId = null;

    if (property.list_type === "sell") {
      // Insert data into the sellable table
      const { data: sellableData, error: sellableError } = await supabase
        .from("sellable")
        .insert(sell)
        .select();

      if (sellableError) throw sellableError;

      sellableId = sellableData[0].id;
    }
    if (property.list_type === "rent") {
      // Insert data into the rental table
      const { data: rentalData, error: rentalError } = await supabase
        .from("rental")
        .insert(rent)
        .select();

      if (rentalError) throw rentalError;

      rentalId = rentalData[0].id;
    }

    // Insert data into the property table with foreign key references
    const { data: propertyData, error: propertyError } = await supabase
      .from("property")
      .insert({
        ...property,
        listType_id: property.list_type === "sell" ? sellableId : rentalId,
      })
      .select();

    if (propertyError) throw propertyError;
    return { data: propertyData };
  } catch (error) {
    console.error("Error listing property:", error);
  }
};

export async function uploadImages(files: any[]) {
  const uploadedImages: any = [];

  for (const file of files) {
    const { data, error }: any = await supabase.storage
      .from("abnb")
      .upload(`images/${Date.now()}_${file.name}`, file);

    if (error) throw error;

    const publicUrl: any = supabase.storage.from("abnb").getPublicUrl(data.path)
      .data.publicUrl;
    uploadedImages.push(publicUrl);
  }

  return uploadedImages;
}



export async function getPropertiesByUser(condition:any, page = 1, limit = 10){
  try {
    // Calculate the starting index based on the page and limit
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch properties created by the specified user with pagination
    const propertiesData:any = await supabase
      .from('property')
      .select('*')
      .eq(condition.key, condition.value)
      .range(from, to);

      console.log(propertiesData, JSON.parse(localStorage.getItem("userData")!).id);
      
    if (propertiesData.error) throw propertiesData.error;

    // Fetch additional data for each property
    const propertiesWithDetails = await Promise.all(propertiesData.data.map(async (property:any) => {
      let additionalData = null;

      if (property.list_type === 'sell') {
        // Fetch associated sellable data
        const { data: sellableData, error: sellableError } = await supabase
          .from('sellable')
          .select('*')
          .eq('id', property.listType_id)
          .single();

        if (sellableError) throw sellableError;

        additionalData = sellableData;
      } else if (property.list_type === 'rent') {
        // Fetch associated rental data
        const { data: rentalData, error: rentalError } = await supabase
          .from('rental')
          .select('*')
          .eq('id', property.listType_id)
          .single();

        if (rentalError) throw rentalError;

        additionalData = rentalData;
      }

      return { ...property, additionalData };
    }));

    return propertiesWithDetails;
  } catch (error) {
    console.error('Error fetching properties:', error);
    alert('Failed to fetch properties. Please try again.');
    return [];
  }
};

export async function getProperties(page = 1, limit = 10){
  try {
    // Calculate the starting index based on the page and limit
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch properties created by the specified user with pagination
    const propertiesData:any = await supabase
      .from('property')
      .select('*')
      .range(from, to);

      
    if (propertiesData.error) throw propertiesData.error;

    // Fetch additional data for each property
    const propertiesWithDetails = await Promise.all(propertiesData.data.map(async (property:any) => {
      let additionalData = null;

      if (property.list_type === 'sell') {
        // Fetch associated sellable data
        const { data: sellableData, error: sellableError } = await supabase
          .from('sellable')
          .select('*')
          .eq('id', property.listType_id)
          .single();

        if (sellableError) throw sellableError;

        additionalData = sellableData;
      } else if (property.list_type === 'rent') {
        // Fetch associated rental data
        const { data: rentalData, error: rentalError } = await supabase
          .from('rental')
          .select('*')
          .eq('id', property.listType_id)
          .single();

        if (rentalError) throw rentalError;

        additionalData = rentalData;
      }

      return { ...property, additionalData };
    }));

    return propertiesWithDetails;
  } catch (error) {
    console.error('Error fetching properties:', error);
    alert('Failed to fetch properties. Please try again.');
    return [];
  }
};
