import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

export const QrGen = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const qrRef = useRef(null);

  const onChangeInputValue = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const generateQRCode = () => {
    setQrValue(inputValue);
    setShowDownloadButton(true); // Mostrar el botón de descarga después de generar el código QR
  };

  const handleDownload = () => {
    if (qrValue) {
      // Obtener la representación binaria del código QR como Blob
      qrRef.current.toBlob((blob) => {
        // Crear un enlace <a> para la descarga
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codigo-qr.png'; // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <div className="qr-gen-container">
      <h1>Generador de código QR</h1>
      <input
        placeholder='Ingrese la URL...'
        value={inputValue}
        onChange={onChangeInputValue}
      />
      <button onClick={generateQRCode}>Generar QR</button>

      {/* Mostrar el código QR */}
      <div className="show-qr">
        {qrValue && <QRCode value={qrValue} ref={qrRef} size={300}/>}
      </div>

      {/* Mostrar el botón de descarga si se genera el código QR */}
      {showDownloadButton && (
        <button onClick={handleDownload}>Descargar QR</button>
      )}
    </div>
  );
};

