/**
 * 공통 검증 유틸 (단일 책임: 입력값 검증)
 */

export function isValidIPv4(ip) {
  const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  return ipv4Regex.test(ip);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호: 8자 이상, 대문자/소문자/숫자/특수문자 중 2종류 이상
 */
export function isValidPassword(password) {
  if (!password || password.length < 8) return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const count = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
  return count >= 2;
}
