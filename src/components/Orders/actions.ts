"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/libs/api";
import { redirectSessionExpired } from "@/libs/auth-guard";
import { validateProof } from "@/libs/proof";

export type TResubmitState = {
  message?: string;
  errors?: Record<string, string>;
};

// Kirim ulang bukti bayar untuk pesanan yang ditolak admin. Backend lalu mengembalikan status ke "menunggu verifikasi".
export async function resubmitProofAction(_prev: TResubmitState, formData: FormData): Promise<TResubmitState> {
  const trxId = String(formData.get("booking_trx_id") ?? "").trim();
  const proof = formData.get("proof");

  const proofError = validateProof(proof);
  if (proofError) return { errors: { proof: proofError } };

  const body = new FormData();
  body.append("booking_trx_id", trxId);
  body.append("proof", proof as File);

  const res = await apiFetch("/resubmit-proof", { method: "POST", body, auth: true });

  if (!res.ok) {
    if (res.status === 401) redirectSessionExpired(`/orders/${trxId}`);
    return { message: res.message, errors: res.errors };
  }

  redirect(`/orders/${encodeURIComponent(trxId)}?resubmitted=1`);
}
