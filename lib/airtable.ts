import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'patsPD43vC3KypV9l.960245b5e4c14845e4092640f8c45c234eb219e98d0fc57050e235c804d68958' }).base('apphXf3H9zzp5Bofv');

export const fetchProperties = async () => {
  const records = await base('Potential Listings').select({}).all();
  return records.map(record => record.fields);
};