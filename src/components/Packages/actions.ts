"use server";

import { redirect } from "next/navigation";

interface File {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}

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
  // const catering_package_id = formData.get("catering_package_id");
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitShipping(prevState: any, formData: FormData) {
  const address = formData.get("address");
  const post_code = formData.get("post_code");
  const notes = formData.get("notes");
  const slug = formData.get("slug");
  // const catering_package_id = formData.get("catering_package_id");
  const tierId = formData.get("catering_tier_id");

  if (address == "") {
    return {
      message: "Address jangan kosong",
      field: "address",
    };
  }
  if (post_code == "") {
    return {
      message: "Post Code jangan kosong",
      field: "post_code",
    };
  }
  if (notes == "") {
    return {
      message: "Notes jangan kosong",
      field: "notes",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      slug,
      address,
      post_code,
      notes,
      tierId,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitPayment(prevState: any, formData: FormData) {
  const proof = formData.get("proof") as File;
  const slug = formData.get("slug") as string;
  const phone = formData.get("phone");

  if (proof.size === 0) {
    return {
      message: "Proof of payment is required",
      field: "proof",
    };
  }

  try {
    const res = await fetch(`${process.env.HOST_API}/api/booking-transaction`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    return {
      message: "Next Step",
      field: "",
      data: {
        slug,
        phone,
        booking_trx_id: data.data.booking_trx_id,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      message: error.message,
      field: "toaster",
    };
  }
}

export async function checkBookingByTrxId(booking_trx_id: string, phone: string) {
  try {
    const formData = new FormData();
    formData.append("booking_trx_id", booking_trx_id);
    formData.append("phone", phone);

    const res = await fetch(`${process.env.HOST_API}/api/check-booking`, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function navigateOrdersByTrxId(prevState: any, formData: FormData) {
  const phone = formData.get("phone");
  const booking_trx_id = formData.get("booking_trx_id");

  if (phone === "") {
    return {
      message: "Enter your phone number",
      field: "phone",
    };
  }

  if (booking_trx_id === "") {
    return {
      message: "Enter your booking transaction ID",
      field: "booking_trx_id",
    };
  }

  const res = await fetch(`${process.env.HOST_API}/api/check-booking`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    return {
      message: "Booking not found. Please check your phone number and booking transaction ID.",
      field: "toaster",
    };
  }
  return redirect(`/orders/${booking_trx_id}?phone=${phone}`);
}
