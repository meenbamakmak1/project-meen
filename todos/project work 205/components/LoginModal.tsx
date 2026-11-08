"use client";

import { useState } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { Button } from "@/components/tailgrids/core/button";
import { EMAIL_DOMAIN, verifyUser } from "@/data/users";
import type { User } from "@/data/users";

type Props = {
  isOpen: boolean;
  onLogin: (user: User) => void;
};

export default function LoginModal({ isOpen, onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = verifyUser(username, password);
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    setError("");
    setUsername("");
    setPassword("");
    setShowPassword(false);
    onLogin(user);
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <Modal className="w-full max-w-md rounded-2xl bg-white shadow-2xl outline-none">
        <Dialog aria-label="Login" className="p-6 outline-none">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Heading slot="title" className="mb-4 text-center text-xl font-bold text-gray-800">
              Who are you?
            </Heading>

            <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="text-gray-600"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></svg>
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="user | admin | manager"
                className="min-w-0 flex-1 outline-none"
              />
              <span className="text-gray-800">{EMAIL_DOMAIN}</span>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-300">
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-lg text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" /></svg>
                )}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="pass"
                className="min-w-0 flex-1 outline-none"
              />
            </div>

            <p className="mt-2 h-5 text-sm text-red-600">{error}</p>

            <div className="mt-3 flex justify-end">
              <Button type="submit" variant="primary" appearance="outline">
                Login
              </Button>
            </div>
          </form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
