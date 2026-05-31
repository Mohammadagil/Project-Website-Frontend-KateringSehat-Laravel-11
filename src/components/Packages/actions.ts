export async function getPackages() {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/catering-packages`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getPackageDetails(packageSlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/catering-package/${packageSlug}`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getFilteredPackagesByCityAndCategory(citySlug: string, categorySlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/api/filters/catering-packages?category_slug=${categorySlug}&city_slug=${citySlug}`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitInformation(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const started_at = formData.get("started_at");
  const slug = formData.get("slug");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const catering_package_id = formData.get("catering_package_id");
  const tierId = formData.get("catering_tier_id");

  if (name == "") {
    return {
      message: "Name jangan kosong",
      field: "name",
    };
  }
  if (email == "") {
    return {
      message: "Email jangan kosong",
      field: "email",
    };
  }
  if (phone == "") {
    return {
      message: "Phone jangan kosong",
      field: "phone",
    };
  }

  if (started_at == "") {
    return {
      message: "Pilih tanggal",
      field: "started_at",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      slug,
      name,
      email,
      phone,
      started_at,
      tierId,
    },
  };
}
