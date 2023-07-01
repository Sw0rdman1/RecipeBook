export function addTokenToLocalStorage(token: string | null): void {
  if (!token) return;
  localStorage.setItem("token", token);
}

export function deleteTokenFromLocalStorage(): void {
  localStorage.removeItem("token");
}

export function getTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem("token");
  return token;
}
