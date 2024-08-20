import supabase from "./supabase";

export async function createRecord(table: any, data: any) {
  const { data: createdRecord, error } = await supabase
    .from(table)
    .insert(data);

  if (error) throw error;
  return createdRecord;
}
export async function readRecords(
  table: any,
  condition: any = {},
  limit = 10,
  page = 1
) {
  const offset = (page - 1) * limit;

  let query = supabase.from(table).select("*");

  // Apply conditions
  Object.keys(condition).forEach((key) => {
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
    .select("*", { count: "exact", head: true })
    .eq("is_active", "true")
    .eq("status", "published");

  if (error) throw error;
  return count;
}

export async function getTotalUsers(table: string) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
    .eq("is_active", "true");

  if (error) throw error;
  return count;
}

export async function getTotalMessages(table: string) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })

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

export async function getPropertiesByUser(
  condition: any,
  page = 1,
  limit = 10
) {
  try {
    // Calculate the starting index based on the page and limit
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    console.log(condition);

    // Fetch properties created by the specified user with pagination
    const propertiesData: any = await supabase
      .from("property")
      .select("*")
      .eq(condition.key, String(condition.value))
      .range(from, to);

    console.log(propertiesData);

    if (propertiesData.error) throw propertiesData.error;

    // Fetch additional data for each property
    const propertiesWithDetails = await Promise.all(
      propertiesData.data.map(async (property: any) => {
        let additionalData = null;

        if (property.list_type === "sell") {
          // Fetch associated sellable data
          const { data: sellableData, error: sellableError } = await supabase
            .from("sellable")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (sellableError) throw sellableError;

          additionalData = sellableData;
        } else if (property.list_type === "rent") {
          // Fetch associated rental data
          const { data: rentalData, error: rentalError } = await supabase
            .from("rental")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (rentalError) throw rentalError;

          additionalData = rentalData;
        }

        return { ...property, additionalData };
      })
    );

    return propertiesWithDetails;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function getProperties(page = 1, limit = 10) {
  try {
    // Calculate the starting index based on the page and limit
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch properties created by the specified user with pagination
    const propertiesData: any = await supabase
      .from("property")
      .select("*")
      .range(from, to);

    if (propertiesData.error) throw propertiesData.error;

    // Fetch additional data for each property
    const propertiesWithDetails = await Promise.all(
      propertiesData.data.map(async (property: any) => {
        let additionalData = null;

        if (property.list_type === "sell") {
          // Fetch associated sellable data
          const { data: sellableData, error: sellableError } = await supabase
            .from("sellable")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (sellableError) throw sellableError;

          additionalData = sellableData;
        } else if (property.list_type === "rent") {
          // Fetch associated rental data
          const { data: rentalData, error: rentalError } = await supabase
            .from("rental")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (rentalError) throw rentalError;

          additionalData = rentalData;
        }

        return { ...property, additionalData };
      })
    );

    return propertiesWithDetails;
  } catch (error) {
    console.error("Error fetching properties:", error);
    alert("Failed to fetch properties. Please try again.");
    return [];
  }
}

export const updatePropertyData = async (
  propertyId: number,
  property: any,
  rent: any,
  sell: any
) => {
  try {
    console.log("Updating property:", property, rent, sell);

    let rentalId = property.rental_id || null;
    let sellableId = property.sellable_id || null;

    if (property.list_type === "sell" && sellableId) {
      // Update data in the sellable table
      const { error: sellableError } = await supabase
        .from("sellable")
        .update(sell)
        .eq("id", sellableId);

      if (sellableError) throw sellableError;
    }

    if (property.list_type === "rent" && rentalId) {
      // Update data in the rental table
      const { error: rentalError } = await supabase
        .from("rental")
        .update(rent)
        .eq("id", rentalId);

      if (rentalError) throw rentalError;
    }

    // Update data in the property table
    const { data: updatedPropertyData, error: propertyError } = await supabase
      .from("property")
      .update(property)
      .eq("id", propertyId)
      .select();

    if (propertyError) throw propertyError;

    return { data: updatedPropertyData };
  } catch (error) {
    console.error("Error updating property:", error);
    return { error };
  }
};

export const fetchFavoriteProperties = async (userId: string | number) => {
  try {
    const { data, error } = await supabase
      .from("favorite")
      .select(
        `
        id,
        created_at,
        property:property_id (
          id,
          name,
          phone_number,
          email,
          list_type,
          list_for,
          property_type,
          property_name,
          land_size,
          building_size,
          bedrooms,
          bathrooms,
          living_room_type,
          pool_type,
          levels,
          parking,
          furnished,
          features,
          location_pin,
          images_urls,
          property_description,
          land_zoning,
          construction_status,
          uploaded_urls,
          selected_feature,
          listType_id
        )
      `
      )
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching favorite properties:", error);
    return null;
  }
};

export async function getFilteredProperties(
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = "desc", // default sorting order: 'desc'
  filters: { key: string; value: any }[] = [], // array of filter objects
  searchQuery: any = null // optional search query
) {
  try {
    // Calculate the starting index based on the page and limit
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Start building the query
    let query = supabase
      .from("property")
      .select("*")
      .order(sortBy, { ascending: sortOrder === "asc" }) // Sorting
      .range(from, to);

    // Apply filters dynamically
    filters.forEach((filter) => {
      if (filter.key === "list_for" && filter.value.length > 0) {
        query = query.in(filter.key, filter.value);
      } else if (filter.key === "property_type" && filter.value.length > 0) {
        query = query.in(filter.key, filter.value);
      } else {
        query = query.eq(filter.key, filter.value);
      }
    });

    // Apply search queries if provided
    if (searchQuery) {
      console.log(searchQuery);

      // Handle land size filters
      if (searchQuery?.landSizeMin && searchQuery?.landSizeMax) {
        query = query
          .gte("land_size", Number(searchQuery.landSizeMin))
          .lte("land_size", Number(searchQuery.landSizeMax));
      } else if (searchQuery?.landSizeMin) {
        query = query.gte("land_size", Number(searchQuery.landSizeMin));
      } else if (searchQuery?.landSizeMax) {
        query = query.lte("land_size", Number(searchQuery.landSizeMax));
      }

      // Handle bedroom filters
      if (searchQuery?.bedrooms) {
        if (searchQuery.bedrooms === "6") {
          query = query.gte("bedrooms", 6);
          console.log(query);
        } else {
          query = query.eq("bedrooms", Number(searchQuery.bedrooms));
        }
      }

      // Handle bathroom filters
      if (searchQuery?.bathrooms) {
        if (searchQuery.bathrooms === "6") {
          query = query.gte("bathrooms", 6);
        } else {
          query = query.eq("bathrooms", Number(searchQuery.bathrooms));
        }
      }
      if (
        !searchQuery?.bathrooms &&
        !searchQuery?.bedrooms &&
        !searchQuery?.landSizeMax &&
        !searchQuery?.landSizeMin 
      ) {
        console.log('erer');
        
        query = query.or(
          `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,property_name.ilike.%${searchQuery}%`
        );
      }
    }

    // Fetch properties with the applied filters, sorting, and search query
    const propertiesData: any = await query;

    if (propertiesData.error) throw propertiesData.error;

    // Fetch additional data for each property
    const propertiesWithDetails = await Promise.all(
      propertiesData.data.map(async (property: any) => {
        let additionalData = null;

        if (property.list_type === "sell") {
          // Fetch associated sellable data
          const { data: sellableData, error: sellableError } = await supabase
            .from("sellable")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (sellableError) throw sellableError;

          additionalData = sellableData;
        } else if (property.list_type === "rent") {
          // Fetch associated rental data
          const { data: rentalData, error: rentalError } = await supabase
            .from("rental")
            .select("*")
            .eq("id", property.listType_id)
            .single();

          if (rentalError) throw rentalError;

          additionalData = rentalData;
        }

        return { ...property, additionalData };
      })
    );

    return propertiesWithDetails;
  } catch (error) {
    console.error("Error fetching properties:", error);
    alert("Failed to fetch properties. Please try again.");
    return [];
  }
}

export const getFilteredUsers = async (
  table: string,
  page: number,
  limit: number,
  sortBy: string,
  sortOrder = "asc",
  filters: Array<{ key: string; value: any }> = [],
  search = null
) => {
  try {
    const offset = (page - 1) * limit;

    let query = supabase
      .from(table)
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(offset, offset + limit - 1);

    // Apply filters
    filters.forEach((filter) => {
      query = query.eq(filter.key, filter.value);
    });

    // Apply search if any
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error("Error fetching filtered users:", error);
    throw error;
  }
};
