export function base64ToHex(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let output = '';
    let i = 0;
  
    while (i < input.length) {
      const a = input.charCodeAt(i++);
      const b = input.charCodeAt(i++);
      const c = input.charCodeAt(i++);
      const index1 = a >> 2;
      const index2 = ((a & 3) << 4) | (b >> 4);
      const index3 = isNaN(b) ? 64 : ((b & 15) << 2) | (c >> 6);
      const index4 = isNaN(c) ? 64 : c & 63;
  
      output += chars.charAt(index1) + chars.charAt(index2) + chars.charAt(index3) + chars.charAt(index4);
    }
  
    return output;
}


export function hexStringToBlob(hexString) {
    const bytes = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    return new Blob([bytes], {type: 'image/jpeg'});
}

// Function to create and download the image from the Blob
export function downloadImage(blob, filename) {
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger a download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename || 'download.jpg';
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

export function blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        // The result contains the Base64 string
        callback(reader.result);
    };
    reader.readAsDataURL(blob);
}