"use client";

import { useFormState } from "react-dom";
import { resubmitProofAction, TResubmitState } from "@/components/Orders/actions";
import ProofInput from "@/components/Booking/ProofInput";
import SubmitButton from "@/components/ui/SubmitButton";
import FormAlert from "@/components/ui/FormAlert";

const initialState: TResubmitState = {};

export default function ResubmitProofForm({ trxId }: { trxId: string }) {
  const [state, formAction] = useFormState(resubmitProofAction, initialState);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="booking_trx_id" value={trxId} />
      {/* Pesan umum (mis. pesanan sudah tidak berstatus ditolak). Kesalahan file tampil di bawah kotak upload. */}
      {state.message && !state.errors?.proof && <FormAlert>{state.message}</FormAlert>}
      <ProofInput error={state.errors?.proof} />
      <SubmitButton block pendingText="Mengirim bukti...">
        Kirim Ulang Bukti
      </SubmitButton>
    </form>
  );
}
