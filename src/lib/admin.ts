export const ADMIN_EMAILS = ["habanekdavid@gmail.com", "andrejjantak@gmail.com"];

export function isAdminEmail(email: string | null | undefined) {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}
