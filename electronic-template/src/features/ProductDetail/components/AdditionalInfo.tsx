export default function AdditionalInfo() {
    return (
        <table className="tb-info-product text-md">
            <tbody>
                <tr className="tb-attr-item">
                    <th className="tb-attr-label">Brand</th>
                    <td className="tb-attr-value">
                        <p>MerchForge</p>
                    </td>
                </tr>
                <tr className="tb-attr-item">
                    <th className="tb-attr-label">Connectivity</th>
                    <td className="tb-attr-value">
                        <p>Bluetooth 5.3, USB-C</p>
                    </td>
                </tr>
                <tr className="tb-attr-item">
                    <th className="tb-attr-label">Battery Life</th>
                    <td className="tb-attr-value">
                        <p>Up to 20 hours per charge</p>
                    </td>
                </tr>
                <tr className="tb-attr-item">
                    <th className="tb-attr-label">Warranty</th>
                    <td className="tb-attr-value">
                        <p>12-month manufacturer warranty</p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
