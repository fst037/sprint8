import Image from 'next/image';
import qrCode from '../assets/qrCode.png';

export default function page() {
    return (
<Image alt="qr-code" src={qrCode} />
    )
}