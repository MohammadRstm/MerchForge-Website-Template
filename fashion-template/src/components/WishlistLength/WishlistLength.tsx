import { useShopContext } from "../../context/Shop/useShopContext";

export default function WishlistLength() {
    const { wishList } = useShopContext();
    return <>{wishList.length}</>;
}
