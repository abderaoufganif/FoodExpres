import { motion } from "motion/react";
import { X, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: string;
  isDefault: boolean;
}

interface EditCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: Card | null;
  onSave: (card: Card) => void;
}

export default function EditCardDialog({ open, onOpenChange, card, onSave }: EditCardDialogProps) {
  const [formData, setFormData] = useState({
    id: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cardType: "VISA",
    isDefault: false
  });

  useEffect(() => {
    if (card) {
      setFormData(card);
    }
  }, [card]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  if (!card) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Edit Payment Card
            </Dialog.Title>
            <Dialog.Close asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="edit-cardType" className="block text-sm font-medium text-gray-700 mb-2">
                Card Type *
              </label>
              <select
                id="edit-cardType"
                value={formData.cardType}
                onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
              >
                <option value="VISA">Visa</option>
                <option value="MC">Mastercard</option>
                <option value="AMEX">American Express</option>
                <option value="DISC">Discover</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  id="edit-cardNumber"
                  type="text"
                  value={formData.cardNumber}
                  disabled
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Card number cannot be changed for security reasons</p>
            </div>

            <div>
              <label htmlFor="edit-cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                id="edit-cardHolder"
                type="text"
                required
                value={formData.cardHolder}
                onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
                placeholder="JOHN DOE"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors uppercase"
              />
            </div>

            <div>
              <label htmlFor="edit-expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                id="edit-expiryDate"
                type="text"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                id="edit-isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="edit-isDefault" className="text-sm font-medium text-gray-700">
                Set as default payment method
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <Dialog.Close asChild>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
              </Dialog.Close>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
