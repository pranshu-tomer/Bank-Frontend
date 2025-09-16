import React, { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * Simple Modal component
 */
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

/**
 * OpenAccountModal
 * - accountTypes: array of { id, label, desc, openingFee, monthlyCharges, interest, extraInfo }
 * - onOpenAccount: function(accountId) called when user confirms
 */
export default function AccountOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState("list"); // "list" | "details"
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const { accountOptions,backendUrl,token,loadAccountsData } = useContext(AppContext)

  useEffect(() => {
    // reset when modal closed
    if (!isOpen) {
      setStage("list");
      setSelectedId(null);
    }
  }, [isOpen]);

  const selectedAccount = accountOptions.find((a) => a.type === selectedId) || null;

  function openDetails(id) {
    setSelectedId(id);
    setStage("details");
  }

  async function handleConfirm() {
    if (!selectedId) return;
    setIsLoading(true)
    try{
        const { data } = await axios.post(backendUrl + '/api/accounts/create',
        {
            type: selectedId
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        })

        if(data?.success){
            toast.success("Account Created Successfully")
            loadAccountsData()
        }else{
            toast.error("Something Went Wrong ! Try Again Later")
        }
    }catch(e){
        console.log(e)
        toast.error("Somthing Went Wrong")   
    }
    setIsOpen(false);
    setIsLoading(false)
  }

  return (
    <>
      <button
        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Open New Account
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Open New Account">
        {stage === "list" && (
          <>
            <p className="text-sm text-gray-600 mb-4">Select the account type you want to open:</p>
            <div className="grid grid-cols-1 gap-3">
              {accountOptions.filter((account) => account.type !== 'CREDIT_CARD').map((acct) => (
                <button
                  key={acct.type}
                  onClick={() => openDetails(acct.type)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:shadow-sm flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{acct.type}</div>
                    {/* <div className="text-sm text-gray-500">{acct.desc}</div> */}
                  </div>
                  <div className="text-sm text-gray-500">View details →</div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              {/* No confirm button on the list screen */}
            </div>
          </>
        )}

        {stage === "details" && selectedAccount && (
          <>
            <div className="mb-3">
              <div className="text-lg font-semibold">{selectedAccount.label}</div>
              {selectedAccount.desc && <div className="text-sm text-gray-500">{selectedAccount.desc}</div>}
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                {selectedAccount.type === 'CREDIT_CARD' ?
                    <>
                    <div><span className="font-medium">Opening fee:</span> ₹500</div>
                    <div><span className="font-medium">Credit Limit</span> ₹{selectedAccount.creditLimit}</div>
                    </>
                :
                    <>
                    <div><span className="font-medium">Opening fee:</span> ₹{selectedAccount.openingCharge}</div>
                    <div><span className="font-medium">Monthly charges:</span> ₹{selectedAccount.monthlyFee}</div>
                    <div><span className="font-medium">Interest:</span> {selectedAccount.interestRate} %</div>
                    <div><span className="font-medium">Minimum Balance:</span> ₹{selectedAccount.minimumBalance}</div>
                    <div><span className="font-medium">Maximum Daily Withdrawal:</span> ₹{selectedAccount.maxDailyWithdrawal}</div>
                    <div><span className="font-medium">Maximum Daily Deposit:</span> ₹{selectedAccount.maxDailyDeposit}</div>
                    </>
                }
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-3 py-2 rounded-md border border-gray-300"
                onClick={() => {
                  // go back to list
                  setStage("list");
                  setSelectedId(null);
                }}
              >
                ← Back
              </button>

              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-md border border-gray-300" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleConfirm}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Confirm'}
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
