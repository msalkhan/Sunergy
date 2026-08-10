import React, { useState } from 'react';
import { Phone, MapPin, Clock, ShieldCheck, CheckCircle2, Send, Calendar } from 'lucide-react';
import { SUNERGY_BUSINESS } from '../data/sunergyData';

interface ContactSectionProps {
  initialData?: { monthlyBill?: string; systemKw?: number; savings25Yr?: number };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Port St. Lucie, FL');
  const [monthlyBill, setMonthlyBill] = useState(initialData?.monthlyBill || '$200 - $350/mo');
  const [propertyType, setPropertyType] = useState('Single Family Home');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setErrorMessage('Please enter your Name and Phone Number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          monthlyBill,
          propertyType,
          notes: `${notes} ${initialData?.systemKw ? `(Estimated system: ${initialData.systemKw}kW)` : ''}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionResult(data.summary);
      } else {
        setErrorMessage(data.error || 'Failed to submit quote request. Please try calling +1 727-375-9375.');
      }
    } catch (err) {
      setErrorMessage('Connection issue. Please call our Port St. Lucie office at +1 727-375-9375!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#FCFAF7] text-[#3D3D37] relative border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Contact Info & Value Promises */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#3D3D37] mt-3">
                Schedule Your Free Solar Consultation
              </h2>
              <p className="text-[#7A7A6B] text-sm mt-2 leading-relaxed">
                Speak directly with a Port St. Lucie solar specialist. No high-pressure sales tactics — just clear, honest engineering and real FPL electric bill analysis.
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#5A5A40] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-[#7A7A6B] font-medium">Direct Office Phone</div>
                  <a href="tel:+17273759375" className="text-lg font-bold text-[#3D3D37] hover:text-[#5A5A40] transition-colors">
                    {SUNERGY_BUSINESS.phone}
                  </a>
                  <p className="text-[11px] text-[#008A3D] font-semibold mt-0.5">
                    Fast response time during business hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E8E2D9]">
                <MapPin className="w-5 h-5 text-[#5A5A40] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-[#7A7A6B] font-medium">Port St. Lucie Showroom</div>
                  <div className="text-sm font-semibold text-[#3D3D37]">{SUNERGY_BUSINESS.address}</div>
                  <div className="text-xs text-[#5A5A40] font-medium">{SUNERGY_BUSINESS.addressExtra}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E8E2D9]">
                <Clock className="w-5 h-5 text-[#5A5A40] shrink-0 mt-1" />
                <div>
                  <div className="text-xs text-[#7A7A6B] font-medium">Business Hours</div>
                  <div className="text-sm font-semibold text-[#3D3D37]">Monday – Saturday: 9:00 AM – 6:00 PM</div>
                  <div className="text-xs text-[#7A7A6B]">Sunday: Closed</div>
                </div>
              </div>
            </div>

            <div className="bg-[#5A5A40]/10 border border-[#5A5A40]/20 p-4 rounded-xl text-xs space-y-2 text-[#3D3D37]">
              <div className="font-bold flex items-center gap-1.5 text-[#5A5A40]">
                <ShieldCheck className="w-4 h-4" />
                <span>Our 100% Free Site Audit Promise</span>
              </div>
              <p>
                We inspect your roof, evaluate sun trajectory in Port St. Lucie, calculate exact FPL net metering credits, and present a custom engineering plan before you spend a single dollar.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Quote Form / Confirmation */}
          <div className="lg:col-span-7 bg-white border border-[#E8E2D9] rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {submissionResult ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#52B788]/20 text-[#008A3D] border border-[#52B788]/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#3D3D37]">Request Received!</h3>
                  <p className="text-[#7A7A6B] text-sm mt-1">
                    Reference Ticket: <span className="text-[#5A5A40] font-mono font-bold">{submissionResult.id}</span>
                  </p>
                </div>
                <div className="bg-[#F7F5F0] p-4 rounded-xl border border-[#E8E2D9] text-xs text-left max-w-md mx-auto space-y-1.5">
                  <div className="text-[#7A7A6B] font-semibold mb-2 uppercase text-[10px]">Summary of Details:</div>
                  <div className="flex justify-between"><span className="text-[#7A7A6B]">Name:</span> <span className="font-semibold text-[#3D3D37]">{submissionResult.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#7A7A6B]">Phone:</span> <span className="font-semibold text-[#3D3D37]">{submissionResult.phone}</span></div>
                  <div className="flex justify-between"><span className="text-[#7A7A6B]">Address:</span> <span className="font-semibold text-[#3D3D37]">{submissionResult.address}</span></div>
                  <div className="flex justify-between"><span className="text-[#7A7A6B]">Monthly Bill:</span> <span className="font-semibold text-[#5A5A40]">{submissionResult.monthlyBill}</span></div>
                </div>
                <p className="text-xs text-[#7A7A6B] max-w-sm mx-auto">
                  A Sunergy solar energy consultant from our Port St. Lucie office will call you shortly at <span className="text-[#3D3D37] font-bold">{submissionResult.phone}</span>.
                </p>
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="px-6 py-2.5 bg-[#F7F5F0] hover:bg-[#E8E2D9] text-[#3D3D37] text-xs font-semibold rounded-xl border border-[#E8E2D9]"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#3D3D37] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#F2B035]" />
                    <span>Free Solar Quote & Roof Survey</span>
                  </h3>
                  <p className="text-[#7A7A6B] text-xs mt-1">Fill out the details below for a fast, no-obligation quote.</p>
                </div>

                {errorMessage && (
                  <div className="bg-rose-100 border border-rose-300 text-rose-800 p-3 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Cole Graham"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (727) 375-9375"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Street Address or Neighborhood</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Tradition, PSL 34952"
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Average FPL Electric Bill</label>
                    <select
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    >
                      <option value="Under $150/mo">Under $150 / mo</option>
                      <option value="$150 - $250/mo">$150 – $250 / mo</option>
                      <option value="$250 - $400/mo">$250 – $400 / mo</option>
                      <option value="$400 - $600/mo">$400 – $600 / mo</option>
                      <option value="$600+/mo">$600+ / mo (Commercial / Pool)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#3D3D37] font-semibold mb-1">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl px-3 py-2.5 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                    >
                      <option value="Single Family Home">Single Family Home</option>
                      <option value="Townhome / Villa">Townhome / Villa</option>
                      <option value="Commercial Business">Commercial Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#3D3D37] font-semibold mb-1">Notes / Questions (Optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Interested in battery backup for hurricane season or $0 down financing..."
                    className="w-full bg-[#F7F5F0] border border-[#E8E2D9] rounded-xl p-3 text-[#3D3D37] focus:outline-none focus:border-[#5A5A40] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Quote Request...' : 'Get My Free Solar Quote'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

