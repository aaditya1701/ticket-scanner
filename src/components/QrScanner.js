import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import CorrectMark from './correctmark/CorrectMark';
import WrongMark from './wrongmark/WrongMark';

const QrScannerComponent = () => {
    const webcamRef = useRef(null);
    const [data, setData] = useState('No result');
    const [isLoading, setIsLoading] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [showWrong, setShowWrong] = useState(false);

    const checkQRCodeStatus = useCallback(async (ticketId) => {
        setIsLoading(true);
        try {
            const docRef = doc(db, "users", ticketId); // Use the ticketId as the document ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const docData = docSnap.data();
                if (docData.flag === false) {
                    await updateDoc(docRef, { flag: true });
                    setShowCorrect(true);
                    setTimeout(() => {
                        setShowCorrect(false);
                    }, 2000);
                } else {
                    setShowWrong(true);
                    setTimeout(() => {
                        setShowWrong(false);
                    }, 2000);
                }
            } else {
                setShowWrong(true);
                setTimeout(() => {
                    setShowWrong(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Error checking QR code:', error);
            setShowWrong(true);
            setTimeout(() => {
                setShowWrong(false);
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const scanQRCode = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = img.height;
                canvas.width = img.width;
                context.drawImage(img, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                    setData(code.data);
                    checkQRCodeStatus(code.data); // Use the QR code data as the ticket ID
                } else {
                    setData('No QR code detected');
                }
            };
        }
    }, [checkQRCodeStatus]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!showCorrect && !showWrong) {
                scanQRCode();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [scanQRCode, showCorrect, showWrong]);

    return (
        <div>
            <h1>QR Code Scanner</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: 'environment' }}
            />
            <p>{data}</p>
            {isLoading && <p>Loading...</p>}
            <CorrectMark visible={showCorrect} />
            <WrongMark visible={showWrong} />
        </div>
    );
};

export default QrScannerComponent;
