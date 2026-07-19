// // // // /
























// ============================================================
// Auth.jsx  —  context + provider + modal + hook
// Usage in App.jsx:
//   import { AuthProvider, useAuth, AuthModal } from "./Auth";
//   Wrap root: <AuthProvider><App/></AuthProvider>
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  signup   as signupSvc,
  login    as loginSvc,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateProfile as updateProfileSvc,
} from "../services/service.js";

// ─── THEME ───────────────────────────────────────────────────
const BRAND        = "#0c2c41";
const BRAND_LIGHT  = "#1a4a6b";
const BRAND_XLIGHT = "#e8f1f7";

// ════════════════════════════════════════════════════════════
// 1.  AUTH CONTEXT
// ════════════════════════════════════════════════════════════
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [checked, setChecked] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = localStorage.getItem("os_token");
        const storedUser = localStorage.getItem("os_user");
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch { /* ignore */ }
      setChecked(true);
    };
    restoreSession();
  }, []);

  // SIGN UP — returns Promise<{ ok, error? }>
  const signup = useCallback(async ({ name, phone, email, address, password }) => {
    try {
      const res = await signupSvc({ fullName: name, email, phone, password });
      const session = {
        userId:   res.data.user.userId,
        id:       res.data.user.userId,
        name:     res.data.user.fullName,
        fullName: res.data.user.fullName,
        phone:    res.data.user.phone,
        email:    res.data.user.email,
        role:     res.data.user.role,
      };
      localStorage.setItem("os_user", JSON.stringify(session));
      setUser(session);
      return { ok: true };
    } catch (err) {
      console.error("Signup error:", err);
      return { ok: false, error: err.message || "Something went wrong. Try again." };
    }
  }, []);

  // LOG IN — returns Promise<{ ok, error? }>
  const login = useCallback(async ({ email, password }) => {
    try {
      const res = await loginSvc({ email, password });
      const session = {
        userId:   res.data.user.userId,
        id:       res.data.user.userId,
        name:     res.data.user.fullName,
        fullName: res.data.user.fullName,
        phone:    res.data.user.phone,
        email:    res.data.user.email,
        role:     res.data.user.role,
      };
      localStorage.setItem("os_user", JSON.stringify(session));
      setUser(session);
      return { ok: true };
    } catch (err) {
      console.error("Login error:", err);
      return { ok: false, error: err.message || "Incorrect email or password." };
    }
  }, []);

  // LOG OUT
  const logout = useCallback(() => {
    localStorage.removeItem("os_token");
    localStorage.removeItem("os_user");
    setUser(null);
  }, []);

  // UPDATE PROFILE
  const updateProfile = useCallback(async ({ fullName, phone }) => {
    if (!user) return { ok: false, error: "Not logged in" };
    try {
      await updateProfileSvc({ fullName, phone });
      const updated = { ...user, name: fullName, fullName, phone };
      localStorage.setItem("os_user", JSON.stringify(updated));
      setUser(updated);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || "Update failed." };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, checked, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook — use anywhere inside <AuthProvider>
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ════════════════════════════════════════════════════════════
// 2.  SHARED STYLES
// ════════════════════════════════════════════════════════════
const S = {
  card: {
    background: "#fff",
    borderRadius: "18px",
    width: "100%",
    maxWidth: "440px",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
    position: "relative",
  },
  tabs: { display: "flex", borderBottom: `1px solid ${BRAND_XLIGHT}` },
  tab: (active) => ({
    flex: 1, padding: "15px", border: "none", cursor: "pointer",
    background: active ? "#fff" : BRAND_XLIGHT,
    fontSize: "14px", fontWeight: active ? "600" : "500",
    color: active ? BRAND : "#6b8fa8",
    borderBottom: active ? `2px solid ${BRAND}` : "2px solid transparent",
    transition: "all 0.18s", letterSpacing: "0.01em", fontFamily: "inherit",
  }),
  body:       { padding: "30px 30px 24px" },
  heading:    { fontSize: "22px", fontWeight: "700", color: BRAND, marginBottom: "4px", letterSpacing: "-0.02em" },
  subheading: { fontSize: "13px", color: "#7a9ab5", marginBottom: "26px" },
  formRow:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "13px" },
  field:      { marginBottom: "14px" },
  label: {
    display: "block", fontSize: "11px", fontWeight: "600", color: BRAND,
    marginBottom: "5px", letterSpacing: "0.07em", textTransform: "uppercase",
  },
  inputWrap:  { position: "relative", display: "flex", alignItems: "center" },
  inputIcon:  { position: "absolute", left: "11px", color: "#9ab5c8", pointerEvents: "none", display: "flex" },
  input: (focused) => ({
    width: "100%", padding: "11px 12px 11px 37px",
    border: focused ? `1.5px solid ${BRAND}` : "1.5px solid #dce8f0",
    borderRadius: "9px", background: focused ? "#fff" : "#f5f9fc",
    fontSize: "14px", color: BRAND, outline: "none",
    transition: "all 0.15s", fontFamily: "inherit",
    boxShadow: focused ? "0 0 0 3px rgba(12,44,65,0.08)" : "none",
  }),
  eyeBtn: {
    position: "absolute", right: "11px", background: "none", border: "none",
    cursor: "pointer", color: "#9ab5c8", display: "flex", padding: "0",
  },
  forgotRow:  { textAlign: "right", marginTop: "4px" },
  forgotLink: {
    fontSize: "12px", color: "#7a9ab5", background: "none", border: "none",
    cursor: "pointer", padding: "0", fontFamily: "inherit",
  },
  submitBtn: (loading) => ({
    width: "100%", padding: "13px", border: "none", borderRadius: "10px",
    background: loading ? BRAND_LIGHT : BRAND, color: "#fff",
    fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
    marginTop: "20px", letterSpacing: "0.01em", transition: "background 0.15s",
    fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
  }),
  footerText: { textAlign: "center", fontSize: "13px", color: "#7a9ab5", marginTop: "14px" },
  footerLink: {
    color: BRAND, fontWeight: "600", background: "none", border: "none",
    cursor: "pointer", fontSize: "13px", padding: "0", fontFamily: "inherit",
  },
  success: {
    background: "#eaf5ef", border: "1px solid #b2d8c0", color: "#1a5c35",
    borderRadius: "8px", padding: "10px 14px", fontSize: "13px",
    display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px",
  },
  apiError: {
    background: "#fef0f0", border: "1px solid #f5c0c0", color: "#a33",
    borderRadius: "8px", padding: "10px 14px", fontSize: "13px",
    display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px",
  },
  fieldErr: { fontSize: "11px", color: "#c0392b", marginTop: "3px", paddingLeft: "2px" },
  cardFooter: {
    background: BRAND_XLIGHT, padding: "13px 30px",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "6px", fontSize: "12px", color: "#5a849e",
    borderTop: "1px solid #dce8f0",
  },
};

// ════════════════════════════════════════════════════════════
// 3.  SVG ICONS
// ════════════════════════════════════════════════════════════
const IcoMail  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IcoUser  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoPhone = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.17 1.1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>;
const IcoPin   = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoLock  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IcoCheck = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2a8a50" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoAlert = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a33" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IcoSpin  = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "_spin 0.9s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;

// ════════════════════════════════════════════════════════════
// 4.  SHARED INPUT FIELD COMPONENT
// ════════════════════════════════════════════════════════════
function Field({ label, type = "text", placeholder, value, onChange, icon, error, togglePass, showPass, onToggle }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={S.field}>
      <label style={S.label}>{label}</label>
      <div style={S.inputWrap}>
        <span style={S.inputIcon}>{icon}</span>
        <input
          type={togglePass ? (showPass ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={S.input(focused)}
          autoComplete="off"
        />
        {togglePass && (
          <button type="button" style={S.eyeBtn} onClick={onToggle} tabIndex={-1}>
            {showPass
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        )}
      </div>
      {error && <div style={S.fieldErr}>{error}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 5.  LOGIN FORM
// ════════════════════════════════════════════════════════════
function LoginForm({ onSwitch, onSuccess }) {
  const { login } = useAuth();
  const [mode,     setMode]     = useState("login"); // "login" | "forgot" | "otp" | "reset"
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [otp,      setOtp]      = useState("");
  const [newPass,  setNewPass]  = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors,   setErrors]   = useState({});
  const [apiErr,   setApiErr]   = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [resendIn, setResendIn] = useState(0); // OTP resend cooldown (seconds)

  // Count down the resend cooldown once per second.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn(s => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const validate = () => {
    const e = {};
    if (!email)                           e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Enter a valid email";
    if (!password)                        e.password = "Password is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setApiErr(""); setLoading(true);
    try {
      const res = await login({ email, password });
      setLoading(false);
      if (res.ok) {
        setSuccessMsg("Signed in successfully!");
        if (onSuccess) onSuccess();
      } else {
        setApiErr(res.error);
      }
    } catch (err) {
      setLoading(false);
      setApiErr(err.message || "Something went wrong.");
    }
  };

  const handleForgot = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Enter your email first" });
      return;
    }
    setErrors({}); setApiErr(""); setLoading(true);
    try {
      await forgotPassword({ email });
      setLoading(false);
      setSuccessMsg("OTP sent to " + email);
      setResendIn(60);
      setMode("otp");
    } catch (err) {
      setLoading(false);
      setApiErr(err.message || "Failed to send OTP.");
    }
  };

  // Resend the OTP without leaving the OTP screen. Backend also rate-limits.
  const handleResend = async () => {
    if (resendIn > 0 || loading) return;
    setApiErr(""); setLoading(true);
    try {
      await forgotPassword({ email });
      setSuccessMsg("A new OTP has been sent to " + email);
      setResendIn(60);
    } catch (err) {
      setApiErr(err.message || "Failed to resend OTP.");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp) { setApiErr("Enter the OTP"); return; }
    setApiErr(""); setLoading(true);
    try {
      await verifyOTP({ email, otp });
      setLoading(false);
      setMode("reset");
    } catch (err) {
      setLoading(false);
      setApiErr(err.message || "Invalid OTP.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPass || newPass.length < 6) {
      setApiErr("Password must be at least 6 characters");
      return;
    }
    setApiErr(""); setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword: newPass });
      setLoading(false);
      setSuccessMsg("Password updated! Please sign in.");
      setMode("login");
      setOtp(""); setNewPass("");
    } catch (err) {
      setLoading(false);
      setApiErr(err.message || "Reset failed.");
    }
  };

  // Forgot password screen
  if (mode === "forgot") return (
    <div style={S.body}>
      <div style={S.heading}>Forgot password?</div>
      <div style={S.subheading}>Enter your email — we'll send a reset code</div>
      {apiErr && <div style={S.apiError}>{IcoAlert} {apiErr}</div>}
      <Field
        label="Email address" type="email" placeholder="you@example.com"
        value={email} onChange={(v) => { setEmail(v); setErrors({}); setApiErr(""); }}
        icon={IcoMail} error={errors.email}
      />
      <button style={S.submitBtn(loading)} onClick={handleForgot} disabled={loading}>
        {loading ? <>{IcoSpin} Sending OTP…</> : "Send OTP"}
      </button>
      <div style={S.footerText}>
        <button style={S.footerLink} onClick={() => { setMode("login"); setApiErr(""); }}>← Back to sign in</button>
      </div>
    </div>
  );

  // OTP verification screen
  if (mode === "otp") return (
    <div style={S.body}>
      <div style={S.heading}>Enter OTP</div>
      <div style={S.subheading}>{successMsg || "Check your email for the 6-digit code"} — it expires in 5 minutes.</div>
      {apiErr && <div style={S.apiError}>{IcoAlert} {apiErr}</div>}
      <Field
        label="6-digit OTP" placeholder="123456"
        value={otp} onChange={(v) => { setOtp(v); setApiErr(""); }}
        icon={IcoLock}
      />
      <button style={S.submitBtn(loading)} onClick={handleVerifyOTP} disabled={loading}>
        {loading ? <>{IcoSpin} Verifying…</> : "Verify OTP"}
      </button>
      <div style={S.footerText}>
        <button
          style={{ ...S.footerLink, opacity: resendIn > 0 ? 0.5 : 1, cursor: resendIn > 0 || loading ? "not-allowed" : "pointer" }}
          onClick={handleResend}
          disabled={resendIn > 0 || loading}
        >
          {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
        </button>
        <span style={{ margin: "0 8px", color: "#cbd8e2" }}>·</span>
        <button style={S.footerLink} onClick={() => { setMode("login"); setApiErr(""); setOtp(""); }}>← Back to sign in</button>
      </div>
    </div>
  );

  // Reset password screen
  if (mode === "reset") return (
    <div style={S.body}>
      <div style={S.heading}>New password</div>
      <div style={S.subheading}>Choose a strong new password</div>
      {apiErr && <div style={S.apiError}>{IcoAlert} {apiErr}</div>}
      <Field
        label="New password" placeholder="Min. 6 characters"
        value={newPass} onChange={(v) => { setNewPass(v); setApiErr(""); }}
        icon={IcoLock} togglePass showPass={showPass} onToggle={() => setShowPass(p => !p)}
      />
      <button style={S.submitBtn(loading)} onClick={handleResetPassword} disabled={loading}>
        {loading ? <>{IcoSpin} Updating…</> : "Update Password"}
      </button>
    </div>
  );

  // Default login screen
  return (
    <div style={S.body}>
      <div style={S.heading}>Welcome back</div>
      <div style={S.subheading}>Sign in to your Urban Eye account</div>

      {successMsg && <div style={S.success}>{IcoCheck} {successMsg}</div>}
      {apiErr     && <div style={S.apiError}>{IcoAlert} {apiErr}</div>}

      <Field
        label="Email address" type="email" placeholder="you@example.com"
        value={email}
        onChange={(v) => { setEmail(v); setErrors(e => ({ ...e, email: "" })); setApiErr(""); }}
        icon={IcoMail} error={errors.email}
      />
      <Field
        label="Password" placeholder="Enter your password"
        value={password}
        onChange={(v) => { setPassword(v); setErrors(e => ({ ...e, password: "" })); setApiErr(""); }}
        icon={IcoLock} error={errors.password}
        togglePass showPass={showPass} onToggle={() => setShowPass(p => !p)}
      />

      <div style={S.forgotRow}>
        <button style={S.forgotLink} onClick={() => { setMode("forgot"); setApiErr(""); setErrors({}); }}>
          Forgot password?
        </button>
      </div>

      <button style={S.submitBtn(loading)} onClick={handleSubmit} disabled={loading}>
        {loading ? <>{IcoSpin} Signing in…</> : "Sign in"}
      </button>

      <div style={S.footerText}>
        New to Urban Eye?{" "}
        <button style={S.footerLink} onClick={onSwitch}>Create account</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 6.  SIGNUP FORM
// ════════════════════════════════════════════════════════════
function SignupForm({ onSwitch, onSuccess }) {
  const { signup } = useAuth();
  const [form,     setForm]     = useState({ name: "", phone: "", email: "", address: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors,   setErrors]   = useState({});
  const [apiErr,   setApiErr]   = useState("");
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const set = (k) => (v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
    setApiErr("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name     = "Name is required";
    if (!form.phone.trim())   e.phone    = "Phone is required";
    if (!form.email.trim())   e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address  = "Address is required";
    if (!form.password)       e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Min. 8 characters";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setApiErr(""); setLoading(true);
    try {
      const res = await signup(form);
      setLoading(false);
      if (res.ok) {
        setSuccess(true);
        if (onSuccess) onSuccess();
        setForm({ name: "", phone: "", email: "", address: "", password: "" });
        setTimeout(() => {
          setSuccess(false);
          if (onSwitch) onSwitch();
        }, 2200);
      } else {
        setApiErr(res.error);
      }
    } catch (err) {
      setLoading(false);
      setApiErr(err.message || "Something went wrong.");
    }
  };

  return (
    <div style={S.body}>
      <div style={S.heading}>Create your account</div>
      <div style={S.subheading}>Join Urban Eye — your vision, our priority</div>

      {success && <div style={S.success}>{IcoCheck} Account created! Redirecting to sign in…</div>}
      {apiErr  && <div style={S.apiError}>{IcoAlert} {apiErr}</div>}

      <div style={S.formRow}>
        <Field label="Full name"    placeholder="Jane Smith"      value={form.name}  onChange={set("name")}  icon={IcoUser}  error={errors.name} />
        <Field label="Phone number" placeholder="+92 300 0000000" value={form.phone} onChange={set("phone")} icon={IcoPhone} error={errors.phone} />
      </div>

      <Field label="Email address" type="email" placeholder="you@example.com"
             value={form.email}   onChange={set("email")}   icon={IcoMail} error={errors.email} />
      <Field label="Address"       placeholder="123 Main St, City"
             value={form.address} onChange={set("address")} icon={IcoPin}  error={errors.address} />
      <Field label="Password"      placeholder="Minimum 8 characters"
             value={form.password} onChange={set("password")} icon={IcoLock} error={errors.password}
             togglePass showPass={showPass} onToggle={() => setShowPass(p => !p)} />

      <button style={S.submitBtn(loading)} onClick={handleSubmit} disabled={loading}>
        {loading ? <>{IcoSpin} Creating account…</> : "Create account"}
      </button>

      <div style={S.footerText}>
        Already have an account?{" "}
        <button style={S.footerLink} onClick={onSwitch}>Sign in</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 7.  AUTH MODAL
// ════════════════════════════════════════════════════════════
export function AuthModal({ isOpen, onClose, defaultTab = "login" }) {
  const [tab, setTab] = useState(defaultTab);
  const { user } = useAuth();

  // Sync tab when defaultTab prop changes
  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  // Close modal when user logs in
  useEffect(() => {
    if (user && isOpen) onClose();
  }, [user, isOpen, onClose]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes _spin { to { transform: rotate(360deg); } }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        .auth-modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          font-family: 'Inter','Segoe UI',system-ui,sans-serif;
        }
        .auth-modal-content {
          width: 100%; max-width: 440px;
          animation: modalFadeIn 0.2s ease;
          position: relative;
        }
        * { box-sizing: border-box; }
      `}</style>

      <div className="auth-modal-overlay" onClick={onClose}>
        <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
          <div style={S.card}>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "12px", right: "12px",
                background: "none", border: "none", fontSize: "22px",
                cursor: "pointer", color: "#7a9ab5", zIndex: 10,
                padding: "4px 8px", lineHeight: 1, borderRadius: "50%",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = BRAND_XLIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              aria-label="Close"
            >
              ×
            </button>

            {/* Tabs */}
            <div style={S.tabs}>
              <button style={S.tab(tab === "login")}  onClick={() => setTab("login")}>Sign in</button>
              <button style={S.tab(tab === "signup")} onClick={() => setTab("signup")}>Sign up</button>
            </div>

            {tab === "login"
              ? <LoginForm  onSwitch={() => setTab("signup")} onSuccess={() => {}} />
              : <SignupForm onSwitch={() => setTab("login")}  onSuccess={() => {}} />
            }

            <div style={S.cardFooter}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secured with 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════
// 8.  AUTH PAGES (full-screen — optional)
// ════════════════════════════════════════════════════════════
export function AuthPages({ defaultTab = "login" }) {
  const [tab, setTab] = useState(defaultTab);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes _spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(140deg, ${BRAND} 0%, #1a4a6b 55%, #2a6a9a 100%)`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      }}>
        <div style={S.card}>
          <div style={S.tabs}>
            <button style={S.tab(tab === "login")}  onClick={() => setTab("login")}>Sign in</button>
            <button style={S.tab(tab === "signup")} onClick={() => setTab("signup")}>Sign up</button>
          </div>
          {tab === "login"
            ? <LoginForm  onSwitch={() => setTab("signup")} />
            : <SignupForm onSwitch={() => setTab("login")}  />
          }
          <div style={S.cardFooter}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </>
  );
}