import api from "./api";

export async function fetchPage(slug){
  const { data } = await api.get(`/pages/${slug}`);
  return data;
}

export async function savePage(slug, payload){
  // payload: { title_fr, title_ar, blocks:[...] }
  const { data } = await api.post(`/pages/${slug}`, payload, {
    headers:{ 'Content-Type':'application/json' }
  });
  return data;
}

export async function uploadBlockImage(file){
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post('/pages-asset', form);
  return data.path; // on ne stocke que le path en DB
}