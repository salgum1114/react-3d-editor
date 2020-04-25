export const getNumber = (value: number) => {
    return parseFloat(value.toFixed(3));
};

export const getMajorVersion = (version: any) => {
    const major = version.split('.');
    let clean = false;
    for (let i = 0; i < major.length; i++) {
        if (clean) {
            major[i] = 0;
        } else if (major[i] !== '0') {
            clean = true;
        }
    }
    return major.join('.');
};

export const equal = (var1: any, var2: any) => {
    let keys1;
    let keys2;
    const type1 = typeof var1;
    const type2 = typeof var2;
    if (type1 !== type2) {
        return false;
    }
    if (type1 !== 'object' || var1 === null || var2 === null) {
        return var1 === var2;
    }
    keys1 = Object.keys(var1);
    keys2 = Object.keys(var2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let i = 0; i < keys1.length; i++) {
        if (!equal(var1[keys1[i]], var2[keys2[i]])) {
            return false;
        }
    }
    return true;
};

export const getOS = () => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'macos';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'ios';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'windows';
    } else if (/Android/.test(userAgent)) {
        os = 'android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'linux';
    }
    return os;
};

export const injectCSS = (url: string) => {
    const link = document.createElement('link') as HTMLLinkElement;
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';
    link.setAttribute('data-aframe-inspector', 'style');
    document.head.appendChild(link);
};

export const injectJS = (url: string, onLoad: () => void, onError: () => void) => {
    const link = document.createElement('script') as HTMLScriptElement;
    link.src = url;
    link.charset = 'utf-8';
    link.setAttribute('data-aframe-inspector', 'style');
    if (onLoad) {
      link.addEventListener('load', onLoad);
    }
    if (onError) {
      link.addEventListener('error', onError);
    }
    document.head.appendChild(link);
};

export const saveString = (text: string, filename: string, mimeType = 'text/plain') => {
    saveBlob(new Blob([text], { type: mimeType }), filename);
};

export const saveBlob = (blob: Blob, filename: string) => {
    const link = document.createElement('a') as HTMLAnchorElement;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'ascene.html';
    link.click();
    // URL.revokeObjectURL(url); breaks Firefox...
};

export const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : false;

export const formatTime = (seconds: number): string => {
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
};

export const formatBytes = (bytes: number, decimals: number = 1, binaryUnits: boolean = false) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const unitMultiple = (binaryUnits) ? 1024 : 1000;
    const unitNames = (unitMultiple === 1024) ? // 1000 bytes in 1 Kilobyte (KB) or 1024 bytes for the binary version (KiB)
        ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'] : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
    return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(decimals || 0)) + ' ' + unitNames[unitChanges];
};

export const b64toBlob = (b64Data: string, contentType: string = '', sliceSize: number= 512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

export const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const bb = new Blob([ab], { type: mimeString });
    return bb;
}

export const clibpoard = (text: string): void => {
    const textarea = document.createElement('textarea') as any;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};
