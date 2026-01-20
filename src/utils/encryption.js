/**
 * Các hàm mã hóa và giải mã sử dụng AES-256-CBC
 */

/**
 * Tạo khóa AES từ chuỗi secret bằng SHA-256
 */
async function getAESKey(secret) {
  const encoder = new TextEncoder();
  const rawKey = encoder.encode(secret);
  
  // Hash thành khóa 256-bit
  const hash = await crypto.subtle.digest('SHA-256', rawKey);
  
  return crypto.subtle.importKey(
    'raw',
    hash,
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Mã hóa mật khẩu bằng AES-256-CBC
 * @param {string} text - Văn bản cần mã hóa
 * @param {string} key - Khóa mã hóa từ biến môi trường
 * @returns {Promise<string>} - Chuỗi đã mã hóa dạng Base64
 */
export const encryptPassword = async (text, key) => {
  if (!text || !key) {
    throw new Error('Thiếu text hoặc key để mã hóa');
  }

  try {
    const aesKey = await getAESKey(key);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      aesKey,
      encoder.encode(text)
    );

    // Ghép IV + dữ liệu đã mã hóa
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    // Chuyển sang Base64
    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    throw new Error('Mã hóa thất bại: ' + error.message);
  }
};

/**
 * Giải mã mật khẩu đã được mã hóa AES-256-CBC
 * @param {string} encryptedText - Chuỗi đã mã hóa dạng Base64
 * @param {string} key - Khóa giải mã (giống khóa mã hóa)
 * @returns {Promise<string>} - Văn bản đã giải mã
 */
export const decryptPassword = async (encryptedText, key) => {
  if (!encryptedText || !key) {
    throw new Error('Thiếu text hoặc key để giải mã');
  }

  try {
    // Giải mã từ Base64
    const data = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    
    // Tách IV (16 bytes đầu) và phần mã hóa
    const iv = data.slice(0, 16);
    const cipher = data.slice(16);

    const aesKey = await getAESKey(key);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      aesKey,
      cipher
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error('Giải mã thất bại: Sai mật khẩu hoặc key không đúng');
  }
};

/**
 * Mã hóa token thành Base64 bằng AES-256
 * @param {object} tokenData - Object chứa userId và timestamp
 * @param {string} key - Khóa mã hóa token
 * @returns {Promise<string>} - Token đã mã hóa
 */
export const encryptToken = async (tokenData, key) => {
  if (!tokenData || !key) {
    throw new Error('Thiếu token data hoặc key');
  }

  try {
    const jsonString = JSON.stringify(tokenData);
    const aesKey = await getAESKey(key);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      aesKey,
      encoder.encode(jsonString)
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  } catch (error) {
    throw new Error('Mã hóa token thất bại: ' + error.message);
  }
};

/**
 * Giải mã token và trả về dữ liệu token
 * @param {string} encryptedToken - Token đã mã hóa
 * @param {string} key - Khóa giải mã token
 * @returns {Promise<object>} - Object chứa userId và timestamp
 */
export const decryptToken = async (encryptedToken, key) => {
  if (!encryptedToken || !key) {
    throw new Error('Thiếu token hoặc key để giải mã');
  }

  try {
    const data = Uint8Array.from(atob(encryptedToken), c => c.charCodeAt(0));
    const iv = data.slice(0, 16);
    const cipher = data.slice(16);

    const aesKey = await getAESKey(key);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      aesKey,
      cipher
    );

    const jsonString = new TextDecoder().decode(decrypted);
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Giải mã token thất bại: Token hoặc key không đúng');
  }
};

/**
 * Kiểm tra token còn hiệu lực hay đã hết hạn
 * @param {object} tokenData - Dữ liệu token đã giải mã
 * @param {number} expirationHours - Số giờ token còn hiệu lực (mặc định: 24)
 * @returns {boolean} - True nếu token còn hiệu lực
 */
export const isTokenValid = (tokenData, expirationHours = 24) => {
  if (!tokenData || !tokenData.timestamp) {
    return false;
  }

  const currentTime = new Date().getTime();
  const tokenTime = tokenData.timestamp;
  const expirationTime = expirationHours * 60 * 60 * 1000; // Đổi sang milliseconds

  return (currentTime - tokenTime) < expirationTime;
};
