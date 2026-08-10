import React, { useState } from 'react';
import { Calculator, Sun, Zap, ShieldCheck, DollarSign, ArrowRight, BatteryCharging, Leaf, Info } from 'lucide-react';

interface SolarCalculatorProps {
  onOpenQuoteWithData: (data: { monthlyBill: string; systemKw: number; savings25Yr: number }) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenQuoteWithData }) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(240);
  const [roofExposure, setRoofExposure] = useState<'south' | 'eastwest' | 'partial'>('south');
  const [includeBattery, setIncludeBattery] = useState<boolean>(true);

  // Solar calculation logic customized for Florida (approx 5.2 peak sun hours/day)
  let efficiencyMultiplier = 1.0;
  if (roofExposure === 'eastwest') efficiencyMultiplier = 0.88;
  if (roofExposure === 'partial') efficiencyMultiplier = 0.78;

  const yearlyElectricityCost = monthlyBill * 12;
  const systemKwNeeded = Math.round(((monthlyBill * 0.85) / 18) / efficiencyMultiplier * 10) / 10;
  const panelCount = Math.ceil((systemKwNeeded * 1000) / 410); // 410W panels

  // Financial estimates
  const grossSystemCost = Math.round(systemKwNeeded * 2800 + (includeBattery ? 11500 : 0));
  const taxCredit30 = Math.round(grossSystemCost * 0.30);
  const netSystemCost = grossSystemCost - taxCredit30;

  // 25 year FPL rate inflation projection (approx 4.2% historical avg in FL)
  let total25YrFplCost = 0;
  let currentYearly = yearlyElectricityCost;
  for (let i = 0; i < 25; i++) {
    total25YrFplCost += currentYearly;
    currentYearly *= 1.042;
  }

  const estimated25YrNetSavings = Math.round(total25YrFplCost - netSystemCost);
  const estimatedSolarLoanPayment = Math.round((netSystemCost * 0.0062)); // 25-yr solar loan at ~5.5% interest

  const co2AvoidedTons = Math.round(systemKwNeeded * 1.3 * 25);
  const treesPlantedEquivalent = Math.round(co2AvoidedTons * 16.5);

  const handleApplyEstimate = () => {
    onOpenQuoteWithData({
      monthlyBill: `$${monthlyBill}/mo`,
      systemKw: systemKwNeeded,
      savings25Yr: estimated25YrNetSavings
    });
  };

  return (
    <section id="calculator" className="py-16 bg-[#FCFAF7] text-[#3D3D37] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#5A5A40]/10 border border-[#5A5A40]/20 text-[#5A5A40] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Florida Solar Savings Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D3D37] mt-3">
            Calculate Your 25-Year FPL Power Bill Savings
          </h2>
          <p className="text-[#7A7A6B] text-sm sm:text-base mt-2">
            Tailored specifically for Port St. Lucie & Treasure Coast sun exposure, current FPL electricity tariffs, and the 30% Federal Clean Energy Tax Credit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white border border-[#E8E2D9] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            
            <h3 className="text-lg font-serif font-bold text-[#3D3D37] flex items-center gap-2 pb-3 border-b border-[#E8E2D9]">
              <Sun className="w-5 h-5 text-[#F2B035]" />
              <span>Step 1: Your Home & Energy Usage</span>
            </h3>

            {/* Slider 1: Monthly Bill */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#3D3D37]">
                  Average Monthly FPL Electric Bill:
                </label>
                <span className="text-2xl font-black text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-xl border border-[#5A5A40]/20">
                  ${monthlyBill}/mo
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="750"
                step="10"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E8E2D9] rounded-lg appearance-none cursor-pointer accent-[#F2B035]"
              />

              <div className="flex justify-between text-[11px] text-[#7A7A6B] font-medium">
                <span>$100/mo (Small Home)</span>
                <span>$350/mo (Avg PSL Home)</span>
                <span>$750/mo+ (Large Pool)</span>
              </div>
            </div>

            {/* Roof Exposure Radio Buttons */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#3D3D37] flex items-center justify-between">
                <span>Roof Sun Exposure:</span>
                <span className="text-xs text-[#5A5A40] font-normal">Florida Sunlight Factor</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRoofExposure('south')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    roofExposure === 'south'
                      ? 'bg-[#5A5A40] border-[#5A5A40] text-[#FCFAF7] shadow-sm'
                      : 'bg-[#F7F5F0] border-[#E8E2D9] text-[#7A7A6B] hover:text-[#3D3D37]'
                  }`}
                >
                  <div className="font-bold">South / SW</div>
                  <div className={`text-[10px] mt-0.5 ${roofExposure === 'south' ? 'text-[#F2B035]' : 'text-[#7A7A6B]'}`}>Optimal (100%)</div>
                </button>

                <button
                  onClick={() => setRoofExposure('eastwest')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    roofExposure === 'eastwest'
                      ? 'bg-[#5A5A40] border-[#5A5A40] text-[#FCFAF7] shadow-sm'
                      : 'bg-[#F7F5F0] border-[#E8E2D9] text-[#7A7A6B] hover:text-[#3D3D37]'
                  }`}
                >
                  <div className="font-bold">East / West</div>
                  <div className={`text-[10px] mt-0.5 ${roofExposure === 'eastwest' ? 'text-[#F2B035]' : 'text-[#7A7A6B]'}`}>Great (88%)</div>
                </button>

                <button
                  onClick={() => setRoofExposure('partial')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                    roofExposure === 'partial'
                      ? 'bg-[#5A5A40] border-[#5A5A40] text-[#FCFAF7] shadow-sm'
                      : 'bg-[#F7F5F0] border-[#E8E2D9] text-[#7A7A6B] hover:text-[#3D3D37]'
                  }`}
                >
                  <div className="font-bold">Partial Shade</div>
                  <div className={`text-[10px] mt-0.5 ${roofExposure === 'partial' ? 'text-[#F2B035]' : 'text-[#7A7A6B]'}`}>Moderate (78%)</div>
                </button>
              </div>
            </div>

            {/* Battery Backup Toggle */}
            <div className="bg-[#F7F5F0] p-4 rounded-xl border border-[#E8E2D9] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-5 h-5 text-[#F2B035]" />
                  <div>
                    <div className="text-xs font-bold text-[#3D3D37]">Include Whole-Home Battery Storage</div>
                    <div className="text-[11px] text-[#7A7A6B]">Keep lights & AC running during storm power outages</div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeBattery}
                    onChange={(e) => setIncludeBattery(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#C8C2B8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F2B035]" />
                </label>
              </div>
            </div>

            <div className="text-xs text-[#7A7A6B] flex items-center gap-1.5 pt-1">
              <Info className="w-4 h-4 text-[#5A5A40] shrink-0" />
              <span>Calculations incorporate FPL Net Metering rules & 30% Federal ITC Tax Credit.</span>
            </div>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#3A3A2F] border border-[#5A5A4A] text-[#FCFAF7] rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">

              <h3 className="text-sm font-bold text-[#F2B035] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Your Recommended Sunergy Solar System
              </h3>

              {/* Primary Output Cards Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#2A2A20] p-4 rounded-xl border border-[#5A5A4A]">
                  <div className="text-xs text-[#C8C2B8] font-medium">Estimated 25-Year Net Savings</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#52B788] mt-1">
                    ${estimated25YrNetSavings.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#A8A298] mt-1">Free from FPL price hikes</div>
                </div>

                <div className="bg-[#2A2A20] p-4 rounded-xl border border-[#5A5A4A]">
                  <div className="text-xs text-[#C8C2B8] font-medium">30% Federal Tax Credit</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F2B035] mt-1">
                    ${taxCredit30.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#A8A298] mt-1">Direct dollar tax deduction</div>
                </div>
              </div>

              {/* Monthly Comparison */}
              <div className="bg-[#2A2A20] p-4 rounded-xl border border-[#5A5A4A] mb-6 space-y-3">
                <div className="text-xs font-bold text-[#E8E2D9] uppercase tracking-wider">
                  Monthly Payment Comparison
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#3A3A2F] p-2.5 rounded-lg border border-[#5A5A4A]">
                    <span className="text-[#C8C2B8]">Current FPL Bill (Variable & Rising):</span>
                    <span className="font-bold text-rose-300 text-sm">${monthlyBill}/mo</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#52B788]/20 p-2.5 rounded-lg border border-[#52B788]/30">
                    <span className="text-[#52B788] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                      Estimated Fixed Solar Payment ($0 Down):
                    </span>
                    <span className="font-extrabold text-[#52B788] text-sm">${estimatedSolarLoanPayment}/mo</span>
                  </div>
                </div>
              </div>

              {/* System Spec Details */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-6">
                <div className="bg-[#2A2A20] p-3 rounded-xl border border-[#5A5A4A]">
                  <div className="text-[#F2B035] font-bold text-lg">{systemKwNeeded} kW</div>
                  <div className="text-[10px] text-[#C8C2B8]">System Size</div>
                </div>
                <div className="bg-[#2A2A20] p-3 rounded-xl border border-[#5A5A4A]">
                  <div className="text-[#F2B035] font-bold text-lg">{panelCount}</div>
                  <div className="text-[10px] text-[#C8C2B8]">Solar Panels</div>
                </div>
                <div className="bg-[#2A2A20] p-3 rounded-xl border border-[#5A5A4A]">
                  <div className="text-[#52B788] font-bold text-lg">160+ MPH</div>
                  <div className="text-[10px] text-[#C8C2B8]">Wind Rating</div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="flex items-center gap-3 bg-[#52B788]/20 border border-[#52B788]/30 p-3 rounded-xl text-xs text-[#52B788] mb-6">
                <Leaf className="w-5 h-5 text-[#52B788] shrink-0" />
                <div>
                  <span className="font-bold">Environmental Impact:</span> Reduces {co2AvoidedTons} tons of CO2 emissions — equivalent to planting {treesPlantedEquivalent} trees in Port St. Lucie!
                </div>
              </div>

              {/* Apply Estimate CTA */}
              <button
                onClick={handleApplyEstimate}
                className="w-full py-4 rounded-xl font-extrabold text-sm bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5 text-[#3D3D37]" />
                <span>Lock In This Custom Estimate & Request Site Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

