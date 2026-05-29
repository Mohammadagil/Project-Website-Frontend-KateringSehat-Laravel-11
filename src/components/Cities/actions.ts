export async function getAllCities() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/cities`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}