function calculateTax() {
  const incomeInput = document.getElementById("income");
  const resultDiv = document.getElementById("result");
  const grossIncome = parseFloat(incomeInput.value);

  if (isNaN(grossIncome) || grossIncome < 0) {
    resultDiv.innerHTML = "Please enter a valid income.";
    return;
  }

  // Standard Deduction under New Regime
  const standardDeduction = 50000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  let tax = 0;

  // New Tax Regime Slabs (FY 2024–25)
  const slabs = [
    { limit: 300000, rate: 0 },
    { limit: 600000, rate: 0.05 },
    { limit: 900000, rate: 0.10 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ];

  let previousLimit = 0;

  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    if (taxableIncome > previousLimit) {
      const taxableAtThisSlab = Math.min(taxableIncome, slab.limit) - previousLimit;
      tax += taxableAtThisSlab * slab.rate;
      previousLimit = slab.limit;
    } else {
      break;
    }
  }

  resultDiv.innerHTML = `Estimated Income Tax: ₹${tax.toLocaleString('en-IN', {
    maximumFractionDigits: 2
  })}`;
}
