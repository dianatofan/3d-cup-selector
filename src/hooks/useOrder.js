import { useMemo, useState } from 'react';
import { PRODUCTS, VARIANTS, recommend, unitPrice, discountFor, deliveryDate, gbp, gbpRound, fmtQty } from '../lib/pricing.js';

// Single source of truth for the whole order flow.
export default function useOrder() {
  const [qty, setQty] = useState(3000);
  const [deadline, setDeadline] = useState('std');
  const [reuse, setReuse] = useState(false);
  const [size, setSize] = useState('240');
  const [variant, setVariant] = useState('single');
  const [override, setOverride] = useState(null);
  const [logo, setLogo] = useState(null); // { dataUrl, name }
  const [step, setStep] = useState('order'); // order | design | contact | done
  const [contact, setContact] = useState({ email: '', phone: '', note: '' });

  const derived = useMemo(() => {
    const rec = recommend({ qty, deadline, reuse });
    const active = override || rec;
    const base = unitPrice(active, qty, size, variant);
    const discount = discountFor(qty);
    const unit = base * (1 - discount);
    const date = deliveryDate(active, deadline);
    return {
      rec, active,
      product: PRODUCTS[active],
      recProduct: PRODUCTS[rec],
      overridden: !!override && override !== rec,
      unit, unitLabel: gbp(unit), unitWasLabel: gbp(base),
      onSale: discount > 0,
      discountLabel: `-${Math.round(discount * 100)}%`,
      totalLabel: gbpRound(unit * qty),
      totalIncVatLabel: gbpRound(unit * qty * 1.25),
      deliveryLabel: date, deliveryUpper: date.toUpperCase(),
      qtyLabel: fmtQty(qty),
      variantReceipt: VARIANTS.find((v) => v.value === variant).receipt,
    };
  }, [qty, deadline, reuse, size, variant, override]);

  return {
    qty, setQty, deadline, setDeadline, reuse, setReuse, size, setSize,
    variant, setVariant, override, setOverride, logo, setLogo,
    step, setStep, contact, setContact,
    ...derived,
  };
}
