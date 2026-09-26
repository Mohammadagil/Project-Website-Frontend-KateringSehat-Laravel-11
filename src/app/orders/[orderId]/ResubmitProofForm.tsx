"use client";
import Receipt from "@/assets/images/receipt.svg";
import SubmitButton from "@/components/SubmitButton";
import TopLoaderOnPending from "@/components/TopLoaderOnPending";
import { submitResubmitProof } from "@/components/Packages/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  bookingTrxId: string;
  phone: string;
};

const initialState: {
  message: string;
  field: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
} = {
  message: "",
  field: "",
};

function ResubmitProofForm({ bookingTrxId, phone }: Props) {
  const router = useRouter();

  const [state, formAction] = useFormState(submitResubmitProof, initialState);

  useEffect(() => {
    if (!!state.field && state.field !== "") {
      if (state.field === "toaster") {
        toast.error(state.message);
      }
    } else if (state.data) {
      toast.success("Bukti pembayaran baru berhasil dikirim, menunggu verifikasi ulang.");
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-y-4 bg-white border border-gray1 rounded-2xl p-4">
      <TopLoaderOnPending />
      <h6 className="text-xl font-bold">Kirim Ulang Bukti Pembayaran</h6>
      <input type="hidden" name="booking_trx_id" value={bookingTrxId} />
      <input type="hidden" name="phone" value={phone} />

      <div className="flex relative">
        <span className="absolute left-0 bottom-2 top-3 aspect-square flex items-center justify-center text-color2">
          <Receipt />
        </span>
        <input
          accept="image/*"
          type="file"
          className="pl-12 w-full pt-8 pr-4 border border-light3 h-[69px] focus:outline-none focus:border-color2 rounded-2xl peer placeholder:opacity-0 placeholder-shown:pt-0 font-semibold appearance-none file:hidden"
          name="proof"
          id="proof"
          placeholder="Add an attachment"
        />
        <label htmlFor="proof" className="absolute pointer-events-none text-gray2 inset-0 flex items-center ml-12 peer-placeholder-shown:mb-0 mb-6 peer-placeholder-shown:text-base text-sm transition-all duration-300">
          Add an attachment
        </label>
      </div>

      <SubmitButton pendingText="Mengirim..." overrideClassName={(isPending) => ["rounded-full flex items-center justify-center px-5 py-3 w-full", isPending ? "cursor-not-allowed bg-gray1 text-gray2" : "bg-color1 text-white"]}>
        Kirim Ulang
      </SubmitButton>
    </form>
  );
}

export default ResubmitProofForm;
