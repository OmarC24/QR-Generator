import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export const QrGen = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');

  const onChangeInputValue = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const generateQRCode = () => {
    setQrValue(inputValue);
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
        {qrValue && <QRCode value={qrValue} size={300}/>}
      </div>
    </div>
  );
};


