import React from 'react';
import { Gift, Copy } from 'lucide-react';
import { useState } from 'react';

export function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'LUXE2024';

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-6 h-6" />
        <h2 className="font-semibold text-xl">Refer friends, earn rewards</h2>
      </div>

      <p className="opacity-90 mb-4">
        Invite your friends to LuxeStay and you'll both get $50 credits for your next booking!
      </p>

      <div className="flex items-center gap-2 bg-white/20 rounded-md p-3">
        <code className="flex-1 font-mono">{referralCode}</code>
        <button
          onClick={copyCode}
          className="p-2 hover:bg-white/10 rounded-md transition-colors"
        >
          {copied ? (
            <span className="text-sm">Copied!</span>
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}