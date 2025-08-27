import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Admins() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({ name: "", email: "", is_admin: false, password: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  // Only logged-in users can access this page
  useEffect(() => {
    if (!user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Fetch users robustly (all admins can see the list)
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError("");
    api.get("/users", { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => {
        if (Array.isArray(res.data)) setUsers(res.data);
        else if (res.data && Array.isArray(res.data.data)) setUsers(res.data.data);
        else setError("API error: Unexpected response");
      })
      .catch(err => setError(err?.response?.data?.message || err.message || "Failed to load users"))
      .finally(() => setLoading(false));
  }, [user]);


  // Edit, delete, and bulk delete handlers only available for strong admin
  const handleEdit = !user?.is_admin ? undefined : async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      // Update name/email/is_admin
      const { name, email, is_admin, password } = editFields;
      const res = await api.put(`/users/${editId}`, { name, email, is_admin }, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(u => u.map(x => x.id === editId ? res.data : x));
      // If password is set, update it
      if (password && password.length >= 6) {
        await api.put(`/users/${editId}/password`, { password }, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      setEditId(null);
    } catch (err) {
      setEditError(err?.response?.data?.message || err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = !user?.is_admin ? undefined : async (id) => {
    if (!window.confirm(t("confirm_delete") || "Are you sure?")) return;
    setDeleteLoading(true);
    setDeleteId(id);
    try {
      await api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setUsers(u => u.filter(x => x.id !== id));
      setSelected(sel => sel.filter(sid => sid !== id));
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  const handleBulkDelete = !user?.is_admin ? undefined : async () => {
    if (!selected.length) return;
    if (!window.confirm(t("confirm_delete") || "Are you sure?")) return;
    setBulkLoading(true);
    try {
      await Promise.all(selected.map(id => api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })));
      setUsers(u => u.filter(x => !selected.includes(x.id)));
      setSelected([]);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setBulkLoading(false);
    }
  };

  // Selection helpers

  // Only strong admin can select for bulk actions
  const toggleSelect = !user?.is_admin ? undefined : (id) => setSelected(sel => sel.includes(id) ? sel.filter(sid => sid !== id) : [...sel, id]);
  const allIds = users.map(u => u.id);
  const allSelected = selected.length && allIds.every(id => selected.includes(id));
  const toggleSelectAll = !user?.is_admin ? undefined : () => setSelected(allSelected ? [] : allIds);

  const isStrongAdmin = !!user?.is_admin;
  return (
    <div className="admin-form-shell min-h-[calc(100vh-120px)] flex flex-col items-center px-2 py-8 bg-gradient-to-br from-green-50 via-white to-green-50" dir={dir}>
      <h1 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-green-700 via-emerald-600 to-green-500 bg-clip-text text-transparent tracking-tight">
        {t("admins", lang === "ar" ? "المدراء" : "Admins")}
      </h1>
      <div className="w-full max-w-6xl bg-white/80 rounded-2xl shadow-lg ring-1 ring-green-200/60 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="text-lg font-semibold text-green-700">
            {t("admin_list", lang === "ar" ? "قائمة المدراء" : "Liste des administrateurs")}
          </div>
          {isStrongAdmin && (
            <Link
              to="/create-user"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-green-700 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-400 hover:to-green-500 text-white font-bold shadow-lg transition-all border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/60"
              style={{ minWidth: 180, justifyContent: 'center' }}
            >
              <span className="text-2xl font-bold">+</span> {t("add_admin", "Ajouter un admin")}
            </Link>
          )}
        </div>
        {isStrongAdmin && selected.length > 0 && (
          <div className="mb-4 flex items-center gap-4 animate-fade-in">
            <span className="text-green-700 font-semibold text-base">
              {selected.length} {t("selected", "sélectionné(s)")}
            </span>
            <button
              className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-red-600 via-pink-500 to-red-400 hover:from-red-500 hover:via-pink-400 hover:to-red-300 text-white font-bold shadow-lg transition-all border-2 border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400/60 text-base disabled:opacity-60 disabled:cursor-wait"
              onClick={handleBulkDelete}
              disabled={bulkLoading}
              style={{ minWidth: 160, justifyContent: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {bulkLoading ? t("loading", "Chargement...") : t("delete_selected", "Supprimer la sélection")}
            </button>
          </div>
        )}
        {loading ? (
          <div className="text-center py-10 text-green-700 font-semibold text-lg">{t("loading", "Chargement...")}</div>
        ) : error ? (
          <div className="text-red-600 text-center py-6">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-center">
              <thead>
                <tr className="bg-green-100 text-green-900">
                  <th className="px-2 py-3 rounded-l-xl text-center">
                    {isStrongAdmin ? (
                      <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                    ) : null}
                  </th>
                  <th className="px-4 py-3 text-center">{t("name", lang === "ar" ? "الاسم" : "Nom")}</th>
                  <th className="px-4 py-3 text-center">{t("email", lang === "ar" ? "البريد الإلكتروني" : "Email")}</th>
                  <th className="px-4 py-3 text-center">{t("role", lang === "ar" ? "الدور" : "Rôle")}</th>
                  {isStrongAdmin && (
                    <th className="px-4 py-3 rounded-r-xl text-center">{t("actions", lang === "ar" ? "الإجراءات" : "Actions")}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className={`bg-white shadow rounded-xl hover:shadow-lg transition ${selected.includes(u.id) ? "ring-2 ring-green-400/60" : ""}`}>
                    <td className="px-2 py-3 rounded-l-xl text-center align-middle">
                      {isStrongAdmin ? (
                        <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-semibold text-center align-middle">{u.name}</td>
                    <td className="px-4 py-3 text-center align-middle">{u.email}</td>
                    <td className="px-4 py-3 font-semibold text-center align-middle">
                      {u.is_admin ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                          {t("strong_admin", lang === "ar" ? "مدير رئيسي" : "Admin principal")}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                          {t("admin", lang === "ar" ? "مدير" : "Admin")}
                        </span>
                      )}
                    </td>
                    {isStrongAdmin && (
                      <td className="px-4 py-3 flex gap-2 justify-center items-center rounded-r-xl">
                        <button
                          className="btn small ghost border border-green-200 hover:bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-lg transition"
                          onClick={() => {
                            setEditId(u.id);
                            setEditFields({ name: u.name, email: u.email, is_admin: u.is_admin, password: "" });
                          }}
                        >
                          {t("edit", lang === "ar" ? "تعديل" : "Modifier")}
                        </button>
                        {u.id !== user.id && (
                          <button
                            className={`btn small danger border border-red-200 hover:bg-red-50 text-red-700 font-semibold px-3 py-1 rounded-lg transition ${deleteLoading && deleteId === u.id ? "opacity-60 cursor-wait" : ""}`}
                            onClick={() => handleDelete(u.id)}
                            disabled={deleteLoading && deleteId === u.id}
                          >
                            {t("delete", lang === "ar" ? "حذف" : "Supprimer")}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit modal only for strong admin */}
      {isStrongAdmin && editId && (
        <div className="modal">
          <form onSubmit={handleEdit} className="modal-content max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">{t("edit_admin", "Modifier l'admin")}</h2>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">{t("name", "Nom")}</label>
              <input
                name="name"
                value={editFields.name}
                onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))}
                placeholder={t("name", "Nom")}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                className="control w-full mb-2 rounded-2xl border border-green-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition shadow-sm"
                name="email"
                onChange={e => setEditFields(f => ({ ...f, email: e.target.value }))}
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">{t("role", "Rôle")}</label>
              <select
                className="control w-full mb-2 rounded-2xl border border-green-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition shadow-sm"
                name="is_admin"
                value={editFields.is_admin ? "true" : "false"}
                onChange={e => setEditFields(f => ({ ...f, is_admin: e.target.value === "true" }))}
                required
              >
                <option value="false">{t("admin", lang === "ar" ? "مدير" : "Admin")}</option>
                <option value="true">{t("strong_admin", lang === "ar" ? "مدير رئيسي" : "Admin principal")}</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold mb-1">{t("new_password", "Nouveau mot de passe")}</label>
              <div className="relative">
                <input
                  className="control w-full mb-2 rounded-2xl border border-green-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:border-green-400 transition shadow-sm pr-16"
                  name="password"
                  type={editFields.showPwd ? "text" : "password"}
                  value={editFields.password}
                  onChange={e => setEditFields(f => ({ ...f, password: e.target.value }))}
                  placeholder={t("leave_blank_to_keep", "Laisser vide pour ne pas changer")}
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                  onClick={() => setEditFields(f => ({ ...f, showPwd: !f.showPwd }))}
                  tabIndex={-1}
                >
                  {editFields.showPwd ? t("hide", "Cacher") : t("show", "Afficher")}
                </button>
              </div>
              <div className="text-xs text-gray-500">{t("leave_blank_to_keep", "Laisser vide pour ne pas changer")}</div>
            </div>
            {editError && <div className="text-red-600 text-xs mb-2">{editError}</div>}
            <div className="flex gap-2 mt-2">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 hover:from-green-500 hover:via-emerald-400 hover:to-green-500 text-white font-semibold tracking-wide px-8 py-2 text-sm shadow-md hover:shadow-lg transition border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/60"
                type="submit"
                disabled={editLoading}
              >
                {editLoading ? t("loading", "Chargement...") : t("save", "Enregistrer")}
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-green-700 border-2 border-green-200 hover:bg-green-50 font-semibold tracking-wide px-8 py-2 text-sm shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-green-400/60"
                type="button"
                onClick={() => setEditId(null)}
              >
                {t("cancel", "Annuler")}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
