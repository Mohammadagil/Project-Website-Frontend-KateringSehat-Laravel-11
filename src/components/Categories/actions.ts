export async function getAllCategories() {
    try {
        const res = await fetch(`${process.env.HOST_API}/api/categories`, {
            method: "GET",
            cache: "no-cache"
        })
        return res.json();
    }catch(error) {
        return error
    }
}