const loadData = async (url) => {
  let response = await fetch(url);

  response = await response.json();

  return response;
}

export const data = await loadData('./example-1.5mb.json');