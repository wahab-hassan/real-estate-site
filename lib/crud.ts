import supabase from "./supabase";

export async function createRecord(table: any, data: any) {
  const { data: createdRecord, error } = await supabase
    .from(table)
    .insert(data);

  if (error) throw error;
  return createdRecord;
}

export async function readRecords(table: any) {
  const { data: records, error } = await supabase.from(table).select("*");

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

export async function readPaginatedRecords(table:any, limit:any, page:any) {
  const offset = (page - 1) * limit;

  const { data: records, count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { records, count };
}

export async function getTotalRecords(table:string) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count;
}