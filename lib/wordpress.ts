const API_URL = 'http://porsche.local/graphql';

export async function fetchGraphQL(query: string, variables?: Record<string, any>) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 10 }, 
    });

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Failed to fetch WordPress API:', error);
    return null;
  }
}


export async function getPorscheCars() {
  const query = `
    query GetPorscheCars {
      posts(first: 100) {
        nodes {
          id
          title
          slug
          content
        }
      }
    }
  `;

  const res = await fetch('http://porsche.local/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 10 }, // 
  });

  const json = await res.json();
  return json.data.posts.nodes;
}