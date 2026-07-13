import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { TID } from "../../lib/testIds";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://arundhati-reads.preview.emergentagent.com";
const API = `${BACKEND_URL}/api`;

const initial = {
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pin_code: "",
    copies: 1,
};

export const ReservationForm = React.forwardRef(({ onReserved }, ref) => {
    const [form, setForm] = useState(initial);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);

    const setField = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const changeCopies = (delta) =>
        setForm((f) => ({
            ...f,
            copies: Math.max(1, Math.min(3, f.copies + delta)),
        }));

    const submit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const res = await axios.post(`${API}/reservations`, form);
            setSuccess(res.data);
            onReserved && onReserved();
            toast.success("Copy reserved", {
                description: `Edition № ${String(res.data.edition_number).padStart(4, "0")} / 1500`,
            });
        } catch (err) {
            const msg =
                err?.response?.data?.detail ||
                "Something went wrong. Please try again.";
            toast.error(String(msg));
        } finally {
            setSubmitting(false);
        }
    };

    const total = 550 * form.copies;

    if (success) {
        return (
            <div
                ref={ref}
                data-testid={TID.form.success}
                className="border hairline bg-[color:var(--paper-2)]/60 p-8 md:p-12 rounded-2xl"
            >
                <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                    ✓ Reserved
                </div>
                <h3 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight">
                    Thank you, {success.full_name.split(" ")[0]}.
                </h3>
                <p className="mt-2 text-[color:var(--ink-soft)] italic">
                    Your numbered edition is set aside.
                </p>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t hairline pt-6">
                    <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            Edition number
                        </div>
                        <div
                            data-testid={TID.form.successEdition}
                            className="mt-1 text-[22px] font-medium"
                        >
                            №{" "}
                            {String(success.edition_number).padStart(4, "0")} /
                            1500
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            Copies
                        </div>
                        <div className="mt-1 text-[22px] font-medium">
                            {success.copies}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                            Paid (demo)
                        </div>
                        <div className="mt-1 text-[22px] font-medium">
                            ₹{success.total_amount_inr}
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-[13px] text-[color:var(--ink-mute)] max-w-lg">
                    This is a demo checkout. When the live payment gateway is
                    connected, you will receive a confirmation with tracking on
                    dispatch.
                </p>
            </div>
        );
    }

    return (
        <form
            ref={ref}
            onSubmit={submit}
            className="border hairline bg-white p-8 md:p-10 rounded-2xl"
        >
            <div className="flex items-baseline justify-between border-b hairline pb-4">
                <div>
                    <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--ink-mute)]">
                        Booking details
                    </div>
                    <div className="mt-2 text-[22px] font-medium">
                        Signed Limited Edition
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[color:var(--ink-mute)]">
                        Price
                    </div>
                    <div className="text-[22px] font-medium">₹550</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <Field
                    label="Full name"
                    testId={TID.form.fullName}
                    value={form.full_name}
                    onChange={setField("full_name")}
                    required
                    placeholder="Arundhati R."
                />
                <Field
                    label="Email"
                    testId={TID.form.email}
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    required
                    placeholder="you@example.com"
                />
                <Field
                    label="Phone"
                    testId={TID.form.phone}
                    value={form.phone}
                    onChange={setField("phone")}
                    required
                    placeholder="+91 98xxxxxxxx"
                />
                <Field
                    label="City"
                    testId={TID.form.city}
                    value={form.city}
                    onChange={setField("city")}
                    required
                    placeholder="Delhi"
                />
                <Field
                    label="Address"
                    testId={TID.form.address}
                    value={form.address}
                    onChange={setField("address")}
                    required
                    placeholder="Street · Locality"
                    full
                />
                <Field
                    label="PIN code"
                    testId={TID.form.pin}
                    value={form.pin_code}
                    onChange={setField("pin_code")}
                    required
                    placeholder="110001"
                />
                <div className="flex flex-col justify-end">
                    <div className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--ink-mute)] mb-2">
                        Limited Copies Available{" "}
                        <span className="normal-case tracking-normal opacity-70">
                            (max 3)
                        </span>
                    </div>
                    <div className="flex items-center border hairline rounded-none w-fit">
                        <button
                            type="button"
                            data-testid={TID.form.copiesDec}
                            onClick={() => changeCopies(-1)}
                            className="w-10 h-11 text-lg hover:bg-[color:var(--paper-2)] transition-colors"
                        >
                            –
                        </button>
                        <div
                            data-testid={TID.form.copiesValue}
                            className="w-12 text-center text-[15px]"
                        >
                            {form.copies}
                        </div>
                        <button
                            type="button"
                            data-testid={TID.form.copiesInc}
                            onClick={() => changeCopies(1)}
                            className="w-10 h-11 text-lg hover:bg-[color:var(--paper-2)] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t hairline pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-[13px] text-[color:var(--ink-soft)]">
                    <div>
                        {form.copies} × ₹550 ={" "}
                        <span className="text-[color:var(--ink)] font-medium">
                            ₹{total}
                        </span>
                    </div>
                    <div className="text-[color:var(--ink-mute)] text-[12px] mt-1">
                        Delivery — Free · Powered by demo checkout
                    </div>
                </div>
                <button
                    type="submit"
                    data-testid={TID.form.submit}
                    disabled={submitting}
                    className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--brand)] text-white pl-6 pr-2 py-2 text-[14.5px] hover:bg-[color:var(--brand-soft)] transition-colors disabled:opacity-60"
                >
                    <span>{submitting ? "Processing…" : `Pay ₹${total}`}</span>
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/15 group-hover:bg-white/25 group-hover:translate-x-1 transition-all">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </span>
                </button>
            </div>
        </form>
    );
});

ReservationForm.displayName = "ReservationForm";

const Field = ({ label, testId, full, ...rest }) => (
    <label className={`flex flex-col ${full ? "md:col-span-2" : ""}`}>
        <span className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--ink-mute)] mb-2">
            {label}
        </span>
        <input
            data-testid={testId}
            {...rest}
            className="border-b hairline bg-transparent py-2.5 text-[15px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-mute)]/60 focus:outline-none focus:border-[color:var(--accent)] transition-colors"
        />
    </label>
);
