package jiedu.ceshi.util;

import java.security.MessageDigest;

public class CryptUtil {


	/**
	 * md5加密
	 * 
	 * @param str
	 * @return
	 */
	public static String MD5(String str) {
		char hexDigits[] = { '0', 'a', '1', 'b', '2', 'c', '3', 'd', '4', 'e',
				'5', 'f', '6', 'g', '7', 'h' };
		try {
			byte[] strTemp = str.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char schar[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				schar[k++] = hexDigits[byte0 >>> 4 & 0xf];
				schar[k++] = hexDigits[byte0 & 0xf];
			}
			return new String(schar);
		} catch (Exception e) {
			return null;
		}
	}
}
