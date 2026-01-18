import Image from "next/image"
import ProductActions from "../../components/product-detail/product-actions"
import priceFormatter from "@/app/utils/price-formatter"
import { getProductDetail } from "@/app/services/product.service";
import { getImageUrl } from "@/app/lib/api";

type TPageProps = {
    params: Promise<{id: string}>;
}

const ProductDetail = async ({params}: TPageProps) => {
    const{id} = await params;

    const product = await getProductDetail(id);
    console.log("product stock : ", product.stock);

    return (
        <main className="container mx-auto pr-25 pl-25 py-40 flex gap-12">
            <div className="bg-primary-light aspect-square min-w-140 flex justify-center items-center">
                <Image src={getImageUrl(product.imageUrl)} alt={product.name} width={550} height={550} className="aspect-square object-container w-full"/>
            </div>
                <div className="w-full py-7">
                    <h1 className="font-bold text-5xl mb-6">
                        {product.name}
                    </h1>
                    <div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
                        {product.category.name}
                    </div>
                    <p className="landing-loose mb-8">
                        {product.description}
                    </p>
                    <div className="text-primary text-[32px] font-semibold mb-12">
                        {
                            priceFormatter(product.price)
                        }
                    </div>
                    <ProductActions product = {product} stock={product.stock}/>
                </div>
        </main>
    )
}

export default ProductDetail;