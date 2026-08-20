import { useShopContext } from "../../context/Shop/useShopContext";

export default function CartLength() {
    const { cartProducts } = useShopContext();
    return <>{cartProducts.length}</>;
}
